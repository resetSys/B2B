//封装网络请求模块
//导入vue实例，使用$store
import vm from "../main.js";
import axios from "axios";
import Qs from "qs";


/**
 * 可以新建多个axios实例
 * 在项目使用多个请求地址时方便使用
 */
//导出第一个axios实例
export function request (config){
  let instence = axios.create({
    timeout:10000,
    baseURL:"http://47.105.206.10:8094/",
    headers: {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest:[function (data) {
      data = Qs.stringify(data);
      return data;
    }],
  });

  instence.interceptors.request.use(function (res) {
    //请求开始
    //添加loading
    vm.$store.commit('handleLoding',{status:true});
    return res;
  },function (err) {
    //
    vm.$store.commit('handleLoding',{status:false});
    return err;
  });
  instence.interceptors.response.use(function (res) {
    //响应成功
    //关闭loading
    vm.$store.commit('handleLoding',{status:false});
    return res;
  },function (err) {
    //
    vm.$store.commit('handleLoding',{status:false});
    return err;
  });

  return instence(config)
}

//上传文件时使用的请求实例
export function uploadRequest(config) {
  let instence = axios.create({
    timeout:10000,
    baseURL:"http://47.105.206.10:8094/",
    headers: {
      'Content-Type':'multipart/form-data'
    },
  });
  instence.interceptors.request.use(function (res) {
    //请求开始
    //添加loading
    vm.$store.commit('handleLoding',{status:true});
    return res;
  },function (err) {
    //
    vm.$store.commit('handleLoding',{status:false});
    return err;
  });
  instence.interceptors.response.use(function (res) {
    //响应成功
    //关闭loading
    vm.$store.commit('handleLoding',{status:false});
    return res;
  },function (err) {
    //
    vm.$store.commit('handleLoding',{status:false});
    return err;
  });

  return instence(config)
}