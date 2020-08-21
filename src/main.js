import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
//elementUI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//添加被动事件监听器
import 'default-passive-events';

//注册全局组件
import "./components/global/index"

Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });

Vue.config.productionTip = false

const vm = new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

//导出vm实例
export default vm
