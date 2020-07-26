//封装网络请求模块
//导入vue实例，使用$store
import vm from "../main.js";
import axios from "axios";


/**
 * 可以新建多个axios实例
 * 在项目使用多个请求地址时方便使用
 */
//导出第一个axios实例
export function request (config){
  let instence = axios.create({
    timeout:5000,
    baseURL:"http://localhost/supermall/"
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