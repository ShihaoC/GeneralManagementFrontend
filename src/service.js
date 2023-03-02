import axios from "axios";
import router from "./router";
import Element from 'element-ui'


// const baseURL = "http://192.168.1.203:8848";
const baseURL = "http://localhost:8848";

axios.defaults.baseURL = baseURL;
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

let download = (path,fileName) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', baseURL+path, true); //
    xhr.responseType = "blob"; //js 中的二进制对象
    xhr.setRequestHeader("authorization",localStorage.getItem("authorization"))
    xhr.onreadystatechange = function () {


        if (xhr.readyState == 3) {

        }
        if (xhr.readyState == 4) {

        }
    };

    xhr.onload = function () {

        //
        if (this.status === 200) {
            //兼容所有的浏览器的代码
            let blob = this.response;
            let a = document.createElement('a');
            a.download = fileName+'.xls';
            a.href = window.URL.createObjectURL(blob);
            $("body").append(a);
            a.click();
            $(a).remove();

        }
    };
//     ajax
    xhr.send()
}

export default {
    get,
    post,
    download
}