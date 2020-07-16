//导入插件
import Vue from "vue";
import VueRouter from "vue-router";
//导入页面
const Login = () =>import("@/views/Login.vue");
const Home = () =>import("@/views/Home.vue");
//系统配置
const SysSetting = () => import("@/views/child/system/SysSetting.vue");
const FloorSetting = () => import("@/views/child/system/FloorSetting.vue");
const Recommend = () => import("@/views/child/system/Recommend.vue");
//权限管理
const Admin = () => import("@/views/child/limit/Admin.vue");
const Role = () => import("@/views/child/limit/Role.vue");
//会员管理
const MemList = () => import("@/views/child/member/MemList.vue");
const CertExpired = () => import("@/views/child/member/CertExpired.vue");
const RegistAudit = () => import("@/views/child/member/RegistAudit.vue");
const RegistCertificate = () => import("@/views/child/member/RegistCertificate.vue");
const MemClassify = () => import("@/views/child/member/MemClassify.vue");
//充值管理
const TopupList = () => import("@/views/child/topup/TopupList.vue");
const TopupWater = () => import("@/views/child/topup/TopupWater.vue");
//签到管理
const SignRule = () => import("@/views/child/sign/SignRule.vue");
const SignFun = () => import("@/views/child/sign/SignFun.vue");



// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}


//注册到vue
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },{
    path:"/login",
    name:"login",
    component:Login,
    meta:{
      title:"登录"
    }
  },{
    path:"/home",
    component:Home,
    children:[
      {
        path:"",
        redirect:"sysSetting"
      },{
        path:"sysSetting",
        component:SysSetting,
        meta:{
          title:"系统设置"
        }
      },{
        path:"floorSetting",
        component:FloorSetting,
        meta:{
          title:"楼层设置"
        }
      },{
        path:"recommend",
        component:Recommend,
        meta:{
          title:"推荐专区"
        }
      },{
        path:"admin",
        component:Admin,
        meta:{
          title:"管理员管理"
        }
      },{
        path:"role",
        component:Role,
        meta:{
          title:"角色管理"
        }
      },{
        path:"memList",
        component:MemList,
        meta:{
          title:"会员列表"
        }
      },{
        path:"certExpired",
        component:CertExpired,
        meta:{
          title:"证书过期管理"
        }
      },{
        path:"RegistAudit",
        component:RegistAudit,
        meta:{
          title:"注册审核管理"
        }
      },{
        path:"RegistCertificate",
        component:RegistCertificate,
        meta:{
          title:"注册资质管理"
        }
      },{
        path:"memClassify",
        component:MemClassify,
        meta:{
          title:"会员分类管理"
        }
      },{
        path:"topupList",
        component:TopupList,
        meta:{
          title:"充值活动列表"
        }
      },{
        path:"topupWater",
        component:TopupWater,
        meta:{
          title:"充值流水"
        }
      },{
        path:"signRule",
        component:SignRule,
        meta:{
          title:"签到规则"
        }
      },{
        path:"signFun",
        component:SignFun,
        meta:{
          title:"签到功能"
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:"hash"
})

export default router