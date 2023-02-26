import axios from "axios";
import router from "./router";
import Element from 'element-ui'


// axios.defaults.baseURL = "http://localhost:8848";
axios.defaults.baseURL = "http://172.20.10.2:8848";
// axios.defaults.baseURL = "http://39.106.16.171:8848";

const request = axios.create({
    timeout: 5000,
})

request.interceptors.request.use(config=>{
    config.headers['authorization'] = localStorage.getItem("authorization")
    return config
})

let time = null;

let get = (url, fun) => {
    request.get(url)
        .then(resp => {
            if (resp.data === "") {
                return
            }
            fun(resp)
        })
        .catch(err => {
            console.log(err)
            clearTimeout(time)
            time = setTimeout(()=>{
                router.push({path: '/'})
                Element.Message.error("没有登录或无权限")
            },200)
        })
}

let post = (url, data, fun) => {
    console.log(localStorage.getItem("token"))
    request.post(url, data)
        .then(resp => {
            if (resp.data === "") {
                this.$message.warning("没有权限或没有登录")
                return
            }
            fun(resp)
        })
        .catch(err => {
            console.log(err)
            clearTimeout(time)
            time = setTimeout(()=>{
                router.push({path: '/'})
                Element.Message.error("没有登录或无权限")
            },200)
        })
}
export default {
    get,
    post,
}