/**用来扫描全局组件并自动注册 */

import Vue from "vue";

//1、自动导入当前文件夹下.vue文件
const components = require.context("./",true,/\.vue$/);
//require.context("遍历的文件夹路径",是否遍历子目录,文件匹配规则)
// require.context函数执行后返回的是一个函数,并且这个函数有3个属性
// resolve {Function} -接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
// keys {Function} -返回匹配成功模块的名字组成的数组
// id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept

components.keys().forEach(ele => {
  const componentConfig = components(ele);
  /**
    兼容import export 和require module.export两种规范
  */
  const ctrl = componentConfig.default || componentConfig;
  Vue.component(ctrl.name,ctrl);
});
