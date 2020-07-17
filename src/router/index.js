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
//主题活动
const ThemeTem = () => import("@/views/child/theme/ThemeTem.vue");
const ThemePro = () => import("@/views/child/theme/ThemePro.vue");
const Template = () => import("@/views/child/theme/Template.vue");
//商品管理
const ProductList = () => import("@/views/child/product/ProductList.vue");
const ProductClassify = () => import("@/views/child/product/ProductClassify.vue");
const GiftList = () => import("@/views/child/product/GiftList.vue");
const IntegralGoods = () => import("@/views/child/product/IntegralGoods.vue");
const ControlGoods = () => import("@/views/child/product/ControlGoods.vue");
const GetGoods = () => import("@/views/child/product/GetGoods.vue");
const RecommendGoods = () => import("@/views/child/product/RecommendGoods.vue");
//促销管理
const Schemes = () => import("@/views/child/scheme/Schemes.vue");
const Single = () => import("@/views/child/scheme/Single.vue");
const Group = () => import("@/views/child/scheme/Group.vue");
//优惠券管理
const Coupons = () => import("@/views/child/coupon/Coupons.vue");
const GiveOut = () => import("@/views/child/coupon/GiveOut.vue");


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
      },{
        path:"themeTem",
        component:ThemeTem,
        meta:{
          title:"主题活动模板"
        }
      },{
        path:"themePro",
        component:ThemePro,
        meta:{
          title:"主题商品组合"
        }
      },{
        path:"template",
        component:Template,
        meta:{
          title:"模板绑定"
        }
      },{
        path:"productList",
        component:ProductList,
        meta:{
          title:"商品列表"
        }
      },{
        path:"productClassify",
        component:ProductClassify,
        meta:{
          title:"商品分类"
        }
      },{
        path:"giftList",
        component:GiftList,
        meta:{
          title:"礼品列表"
        }
      },{
        path:"integralGoods",
        component:IntegralGoods,
        meta:{
          title:"积分商品"
        }
      },{
        path:"controlGoods",
        component:ControlGoods,
        meta:{
          title:"控销商品"
        }
      },{
        path:"recommendGoods",
        component:RecommendGoods,
        meta:{
          title:"推荐商品管理"
        }
      },{
        path:"getGoods",
        component:GetGoods,
        meta:{
          title:"商品到货管理"
        }
      },{
        path:"schemes",
        component:Schemes,
        meta:{
          title:"方案列表"
        }
      },{
        path:"single",
        component:Single,
        meta:{
          title:"单品方案设计"
        }
      },{
        path:"group",
        component:Group,
        meta:{
          title:"组合方案设计"
        }
      },{
        path:"coupons",
        component:Coupons,
        meta:{
          title:"优惠券列表"
        }
      },{
        path:"giveOut",
        component:GiveOut,
        meta:{
          title:"优惠券下发"
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