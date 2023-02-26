import axios from "axios";
import router from "./router";
import Element from 'element-ui'


axios.defaults.baseURL = "http://localhost:8848";
// axios.defaults.baseURL = "http://172.20.10.2:8848";
// axios.defaults.baseURL = "http://39.106.16.171:8848";

const request = axios.create({
    timeout: 5000,
})

request.interceptors.request.use(config => {
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
            Element.Message.error(err.response.data.msg)
        })
}

let post = (url, data, fun) => {
    console.log(localStorage.getItem("token"))
    request.post(url, data)
        .then(resp => {
            fun(resp)
        })
        .catch(err => {
            Element.Message.error("没有登录或无权限")
        })
}
export default {
    get,
    post,
}