//导入插件
import Vue from "vue";
import VueRouter from "vue-router";
//导入页面
const Login = () =>import("@/views/Login.vue");
const Home = () =>import("@/views/Home.vue");
//导入子页面
const Item1 = () =>import("@/views/child/Item1.vue");
const Item2 = () =>import("@/views/child/Item2.vue");



//注册到vue
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },{
    path:"/login",
    name:"login",
    component:Login
  },{
    path:"/home",
    name:"home",
    component:Home,
    children:[
      {
        path:"",
        redirect:"item1"
      },{
        path:"item1",
        component:Item1
      },{
        path:"item2",
        component:Item2
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:"hash"
})

export default router