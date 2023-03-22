import axios from "axios";
import router from "./router";
import {message} from '@/assets/util/resetMessage'

const baseURL = "https://oa.api.mrcsh.cn";
// const baseURL = "http://localhost:8848";

axios.defaults.baseURL = baseURL;
const request = axios.create({

})

request.interceptors.request.use(config => {
    config.headers['authorization'] = localStorage.getItem("authorization")
    return config
})

let time = null;

let GET = (url, fun) => {
    request.get(url)
        .then(resp => {
            if (resp.data === "") {
                return
            }
            fun(resp)
        })
        .catch(err => {
            message.error('权限不足/服务器出现问题:'+err)
        })
}

let POST = (url, data, fun) => {
    request.post(url, data)
        .then(resp => {
            fun(resp)
        })
        .catch(err => {
            message.error('权限不足/服务器出现问题:'+err)

        })
}

let DELETE = (url,data,fun)=>{
    request.delete(url,data).then(resp=>{
        fun(resp)
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
    GET,
    POST,
    DELETE,
    download
}