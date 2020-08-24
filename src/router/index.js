//导入插件
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { Message } from 'element-ui'

//导入页面
const Login = () =>import("@/views/Login.vue");
const Home = () =>import("@/views/Home.vue");
//第一个页面
const FirstPage = () => import("@/views/child/FirstPage.vue");
//用户引导
const Driver = () => import("@/views/child/driver/Driver.vue");
//系统配置
const SysSetting = () => import("@/views/child/system/SysSetting.vue");
const FloorSetting = () => import("@/views/child/system/FloorSetting.vue");
const Recommend = () => import("@/views/child/system/Recommend.vue");
const Advertising = () => import("@/views/child/system/Advertising.vue");
const AppFloorMan = () => import("@/views/child/system/AppFloorMan.vue");
const MallConfig = () => import("@/views/child/system/MallConfig.vue");
const AppMan = () => import("@/views/child/system/AppMan.vue");
//权限管理
const Admin = () => import("@/views/child/limit/Admin.vue");
const Role = () => import("@/views/child/limit/Role.vue");
const PathMan = () => import("@/views/child/limit/PathMan.vue");
const AddRole = () => import("@/views/child/limit/AddRole.vue");
//会员管理
const Audit = () => import("@/views/child/member/Audit.vue");
const MemList = () => import("@/views/child/member/MemList.vue");
const OrganMan = () => import("@/views/child/member/OrganMan.vue");
const CertExpired = () => import("@/views/child/member/CertExpired.vue");
const RegistAudit = () => import("@/views/child/member/RegistAudit.vue");
const RegistCertificate = () => import("@/views/child/member/RegistCertificate.vue");
const Certificate = () => import("@/views/child/member/Certificate.vue");
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
const AddTemplate = () => import("@/views/child/theme/AddTemplate.vue");
const AddTemPro = () => import("@/views/child/theme/AddTemPro.vue");
//商品管理
const AddProduct = () => import("@/views/child/product/AddProduct.vue");
const ProductList = () => import("@/views/child/product/ProductList.vue");
const ProductClassify = () => import("@/views/child/product/ProductClassify.vue");
const GiftList = () => import("@/views/child/product/GiftList.vue");
const IntegralGoods = () => import("@/views/child/product/IntegralGoods.vue");
const ControlGoods = () => import("@/views/child/product/ControlGoods.vue");
const GetGoods = () => import("@/views/child/product/GetGoods.vue");
const RecommendGoods = () => import("@/views/child/product/RecommendGoods.vue");
const AddConGoods = () => import("@/views/child/product/AddConGoods.vue");
const AddGift = () => import("@/views/child/product/AddGift.vue");
const AddIntGoods = () => import("@/views/child/product/AddIntGoods.vue");
const AddProClassify = () => import("@/views/child/product/AddProClassify.vue");
const AddComm = () => import("@/views/child/product/AddComm.vue");
//促销管理
const Schemes = () => import("@/views/child/scheme/Schemes.vue");
const Single = () => import("@/views/child/scheme/Single.vue");
const Group = () => import("@/views/child/scheme/Group.vue");
//优惠券管理
const Coupons = () => import("@/views/child/coupon/Coupons.vue");
const GiveOut = () => import("@/views/child/coupon/GiveOut.vue");
//订单管理
const OrderList = () => import("@/views/child/order/OrderList.vue");
const ExpenseWater = () => import("@/views/child/order/ExpenseWater.vue");
const IntegralList = () => import("@/views/child/order/IntegralList.vue");
const IntegralWater = () => import("@/views/child/order/IntegralWater.vue");
const RetreatAudit = () => import("@/views/child/order/RetreatAudit.vue");
const RefundRequest = () => import("@/views/child/order/RefundRequest.vue");
const PayQuery = () => import("@/views/child/order/PayQuery.vue");
//评论管理
const CommentAduit = () => import("@/views/child/comment/CommentAduit.vue");
//专区及品牌维护
const PrefectureList = () => import("@/views/child/prefecture/PrefectureList.vue");
const PrefectureGoods = () => import("@/views/child/prefecture/PrefectureGoods.vue");
const PharmacyZone = () => import("@/views/child/prefecture/PharmacyZone.vue");
const OutpatientZone = () => import("@/views/child/prefecture/OutpatientZone.vue");
//抽奖管理
const PrizeList = () => import("@/views/child/lottery/PrizeList.vue");
const PrizeRule = () => import("@/views/child/lottery/PrizeRule.vue");
const Recorded = () => import("@/views/child/lottery/Recorded.vue");
//日志管理
const LogIp = () => import("@/views/child/log/LogIp.vue");
const HandleLog = () => import("@/views/child/log/HandleLog.vue");
//用户行为分析
const Collect = () => import("@/views/child/analyze/Collect.vue");
const OrderFrequency = () => import("@/views/child/analyze/OrderFrequency.vue");
const OrderSource = () => import("@/views/child/analyze/OrderSource.vue");
const OrderTime = () => import("@/views/child/analyze/OrderTime.vue");
const SearchFrequency = () => import("@/views/child/analyze/SearchFrequency.vue");
const ShopCart = () => import("@/views/child/analyze/ShopCart.vue");
const TypePay = () => import("@/views/child/analyze/TypePay.vue");
const UnitPrice = () => import("@/views/child/analyze/UnitPrice.vue");
//图片管理
const ImgMan = () => import("@/views/child/image/ImgMan.vue");
//消息推送
const InformMan = () => import("@/views/child/inform/InformMan.vue");
//咨询管理
const AddAdvisory = () => import("@/views/child/advisory/AddAdvisory.vue");
const AdvisoryMan = () => import("@/views/child/advisory/AdvisoryMan.vue");
const Helps = () => import("@/views/child/advisory/Helps.vue");
const ViewDoc = () => import("@/views/child/advisory/ViewDoc.vue");
const EditDoc = () => import("@/views/child/advisory/EditDoc.vue");
//业务员管理
const BindGroup = () => import("@/views/child/salesman/BindGroup.vue");
const GroupMembers = () => import("@/views/child/salesman/GroupMembers.vue");
const SalesmanList = () => import("@/views/child/salesman/SalesmanList.vue");
const SalesmanOrderList = () => import("@/views/child/salesman/SalesmanOrderList.vue");
const SalesmanAduit = () => import("@/views/child/salesman/SalesmanAduit.vue");


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
        redirect:"firstPage"
      },
      {
        path:"firstPage",
        name:"firstPage",
        component:FirstPage,
        meta:{
          title:"首页"
        }
      },
      {
        path:"driver",
        name:"driver",
        component:Driver,
        meta:{
          title:"引导指南"
        }
      },
      {
        path:"sysSetting",
        name:"sysSetting",
        component:SysSetting,
        meta:{
          title:"系统设置"
        }
      },{
        path:"floorSetting",
        name:"floorSetting",
        component:FloorSetting,
        meta:{
          title:"楼层设置"
        }
      },{
        path:"recommend",
        name:"recommend",
        component:Recommend,
        meta:{
          title:"推荐专区"
        }
      },{
        path:"advertising",
        name:"advertising",
        component:Advertising,
        meta:{
          title:"广告位设置"
        }
      },{
        path:"appFloorMan",
        name:"appFloorMan",
        component:AppFloorMan,
        meta:{
          title:"App楼层管理"
        }
      },{
        path:"mallConfig",
        name:"mallConfig",
        component:MallConfig,
        meta:{
          title:"商城配置"
        }
      },{
        path:"appMan",
        name:"appMan",
        component:AppMan,
        meta:{
          title:"App版本管理",
          show:true
        }
      },{
        path:"admin",
        name:"admin",
        component:Admin,
        meta:{
          title:"管理员管理"
        }
      },{
        path:"role",
        name:"role",
        component:Role,
        meta:{
          title:"角色管理"
        }
      },{
        path:"pathMan",
        name:"pathMan",
        component:PathMan,
        meta:{
          title:"路径管理"
        }
      },{
        path:"addRole",
        name:"addRole",
        component:AddRole,
        meta:{
          title:"信息管理",
          show:true
        }
      },{
        path:"aduit",
        name:"aduit",
        component:Audit,
        meta:{
          title:"注册审核"
        }
      },{
        path:"memList",
        name:"memList",
        component:MemList,
        meta:{
          title:"会员列表"
        }
      },{
        path:"organMan",
        name:"organMan",
        component:OrganMan,
        meta:{
          title:"机构管理"
        }
      },{
        path:"certExpired",
        name:"certExpired",
        component:CertExpired,
        meta:{
          title:"证书过期管理"
        }
      },{
        path:"RegistAudit",
        name:"RegistAudit",
        component:RegistAudit,
        meta:{
          title:"注册审核管理"
        }
      },{
        path:"RegistCertificate",
        name:"RegistCertificate",
        component:RegistCertificate,
        meta:{
          title:"注册资质管理"
        }
      },{
        path:"certificate",
        name:"certificate",
        component:Certificate,
        meta:{
          title:"注册资质"
        }
      },{
        path:"memClassify",
        name:"memClassify",
        component:MemClassify,
        meta:{
          title:"会员分类管理"
        }
      },{
        path:"topupList",
        name:"topupList",
        component:TopupList,
        meta:{
          title:"充值活动列表"
        }
      },{
        path:"topupWater",
        name:"topupWater",
        component:TopupWater,
        meta:{
          title:"充值流水"
        }
      },{
        path:"signRule",
        name:"signRule",
        component:SignRule,
        meta:{
          title:"签到规则"
        }
      },{
        path:"signFun",
        name:"signFun",
        component:SignFun,
        meta:{
          title:"签到功能"
        }
      },{
        path:"themeTem",
        name:"themeTem",
        component:ThemeTem,
        meta:{
          title:"主题活动模板"
        }
      },{
        path:"themePro",
        name:"themePro",
        component:ThemePro,
        meta:{
          title:"主题商品组合"
        }
      },{
        path:"template",
        name:"template",
        component:Template,
        meta:{
          title:"模板绑定"
        }
      },{
        path:"addTemplate",
        name:"addTemplate",
        component:AddTemplate,
        meta:{
          title:"模板管理",
          show:true
        }
      },{
        path:"addTemPro",
        name:"addTemPro",
        component:AddTemPro,
        meta:{
          title:"绑定商品",
          show:true
        }
      },{
        path:"productList",
        name:"productList",
        component:ProductList,
        meta:{
          title:"商品列表"
        }
      },{
        path:"addProduct",
        name:"addProduct",
        component:AddProduct,
        meta:{
          title:"商品管理",
          show:true
        }
      },{
        path:"productClassify",
        name:"productClassify",
        component:ProductClassify,
        meta:{
          title:"商品分类"
        }
      },{
        path:"giftList",
        name:"giftList",
        component:GiftList,
        meta:{
          title:"礼品列表"
        }
      },{
        path:"integralGoods",
        name:"integralGoods",
        component:IntegralGoods,
        meta:{
          title:"积分商品"
        }
      },{
        path:"controlGoods",
        name:"controlGoods",
        component:ControlGoods,
        meta:{
          title:"控销商品"
        }
      },{
        path:"recommendGoods",
        name:"recommendGoods",
        component:RecommendGoods,
        meta:{
          title:"推荐商品管理"
        }
      },{
        path:"addConGoods",
        name:"addConGoods",
        component:AddConGoods,
        meta:{
          title:"添加控销商品",
          show:true
        }
      },{
        path:"addGift",
        name:"addGift",
        component:AddGift,
        meta:{
          title:"添加礼品",
          show:true
        }
      },{
        path:"addIntGoods",
        name:"addIntGoods",
        component:AddIntGoods,
        meta:{
          title:"添加积分商品",
          show:true
        }
      },{
        path:"addProClassify",
        name:"addProClassify",
        component:AddProClassify,
        meta:{
          title:"新增商品分类",
          show:true
        }
      },{
        
        path:"addComm",
        name:"addComm",
        component:AddComm,
        meta:{
          title:"新增推荐商品",
          show:true
        }
      },{
        path:"getGoods",
        name:"getGoods",
        component:GetGoods,
        meta:{
          title:"商品到货管理"
        }
      },{
        path:"schemes",
        name:"schemes",
        component:Schemes,
        meta:{
          title:"方案列表"
        }
      },{
        path:"single",
        name:"single",
        component:Single,
        meta:{
          title:"单品方案设计"
        }
      },{
        path:"group",
        name:"group",
        component:Group,
        meta:{
          title:"组合方案设计"
        }
      },{
        path:"coupons",
        name:"coupons",
        component:Coupons,
        meta:{
          title:"优惠券列表"
        }
      },{
        path:"giveOut",
        name:"giveOut",
        component:GiveOut,
        meta:{
          title:"优惠券下发"
        }
      },{
        path:"orderList",
        name:"orderList",
        component:OrderList,
        meta:{
          title:"订单列表"
        }
      },{
        path:"expenseWater",
        name:"expenseWater",
        component:ExpenseWater,
        meta:{
          title:"消费流水列表"
        }
      },{
        path:"integralList",
        name:"integralList",
        component:IntegralList,
        meta:{
          title:"积分订单列表"
        }
      },{
        path:"integralWater",
        name:"integralWater",
        component:IntegralWater,
        meta:{
          title:"积分流水列表"
        }
      },{
        path:"retreatAudit",
        name:"retreatAudit",
        component:RetreatAudit,
        meta:{
          title:"退单审核"
        }
      },{
        path:"refundRequest",
        name:"refundRequest",
        component:RefundRequest,
        meta:{
          title:"退款单申请"
        }
      },{
        path:"payQuery",
        name:"payQuery",
        component:PayQuery,
        meta:{
          title:"在线支付查询"
        }
      },{
        path:"commentAduit",
        name:"commentAduit",
        component:CommentAduit,
        meta:{
          title:"商品评论审核"
        }
      },{
        path:"prefectureList",
        name:"prefectureList",
        component:PrefectureList,
        meta:{
          title:"品牌列表管理"
        }
      },{
        path:"pharmacyZone",
        name:"pharmacyZone",
        component:PharmacyZone,
        meta:{
          title:"药店专区管理"
        }
      },{
        path:"prefectureGoods",
        name:"prefectureGoods",
        component:PrefectureGoods,
        meta:{
          title:"品牌商品"
        }
      },{
        path:"outpatientZone",
        name:"outpatientZone",
        component:OutpatientZone,
        meta:{
          title:"门诊专区管理"
        }
      },{
        path:"prizeList",
        name:"prizeList",
        component:PrizeList,
        meta:{
          title:"奖品列表"
        }
      },{
        path:"prizeRule",
        name:"prizeRule",
        component:PrizeRule,
        meta:{
          title:"抽奖规则"
        }
      },{
        path:"recorded",
        name:"recorded",
        component:Recorded,
        meta:{
          title:"中奖记录"
        }
      },{
        path:"logIp",
        name:"logIp",
        component:LogIp,
        meta:{
          title:"用户IP捕捉记录"
        }
      },{
        path:"handleLog",
        name:"handleLog",
        component:HandleLog,
        meta:{
          title:"用户IP捕捉记录"
        }
      },{
        path:"collect",
        name:"collect",
        component:Collect,
        meta:{
          title:"收藏统计"
        }
      },{
        path:"orderFrequency",
        name:"orderFrequency",
        component:OrderFrequency,
        meta:{
          title:"下单频率分析"
        }
      },{
        path:"orderSource",
        name:"orderSource",
        component:OrderSource,
        meta:{
          title:"订单来源统计"
        }
      },{
        path:"orderTime",
        name:"orderTime",
        component:OrderTime,
        meta:{
          title:"下单时间统计"
        }
      },{
        path:"searchFrequency",
        name:"searchFrequency",
        component:SearchFrequency,
        meta:{
          title:"搜索频率分析"
        }
      },{
        path:"shopCart",
        name:"shopCart",
        component:ShopCart,
        meta:{
          title:"购物车商品分析"
        }
      },{
        path:"typePay",
        name:"typePay",
        component:TypePay,
        meta:{
          title:"支付类型统计"
        }
      },{
        path:"unitPrice",
        name:"unitPrice",
        component:UnitPrice,
        meta:{
          title:"客单价统计"
        }
      },{
        path:"imgMan",
        name:"imgMan",
        component:ImgMan,
        meta:{
          title:"图片管理"
        }
      },{
        path:"informMan",
        name:"informMan",
        component:InformMan,
        meta:{
          title:"推送管理"
        }
      },{
        path:"addAdvisory",
        name:"addAdvisory",
        component:AddAdvisory,
        meta:{
          title:"咨询管理"
        }
      },{
        path:"advisoryMan",
        name:"advisoryMan",
        component:AdvisoryMan,
        meta:{
          title:"咨询管理"
        }
      },{
        path:"helps",
        name:"helps",
        component:Helps,
        meta:{
          title:"帮助中心"
        }
      },{
        path:"viewDoc",
        name:"viewDoc",
        component:ViewDoc,
        meta:{
          title:"帮助文档列表"
        }
      },{
        path:"editDoc",
        name:"editDoc",
        component:EditDoc,
        meta:{
          title:"帮助文档编辑"
        }
      },{
        path:"groupMembers",
        name:"groupMembers",
        component:GroupMembers,
        meta:{
          title:"会员分组管理"
        }
      },{
        path:"bindGroup",
        name:"bindGroup",
        component:BindGroup,
        meta:{
          title:"绑定分组"
        }
      },{
        path:"salesmanList",
        name:"salesmanList",
        component:SalesmanList,
        meta:{
          title:"业务员列表"
        }
      },{
        path:"salesmanOrderList",
        name:"salesmanOrderList",
        component:SalesmanOrderList,
        meta:{
          title:"业务员订单列表"
        }
      },{
        path:"salesmanAduit",
        name:"salesmanAduit",
        component:SalesmanAduit,
        meta:{
          title:"业务员审核"
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:"hash"
});


//获取该权限数据


router.beforeEach((to,from,next)=>{
  //修改标题
  //从from跳转到to里面去
  //to：表示当前路由，meta实在路由映射中配置的静态资源
  //如果以上述方式修改title的话，有嵌套其他组件的组件将会显示不正常
  // document.title = to.matched[0].meta.title;


  // 路由拦截
  if (to.path == '/login') {//如果是登录直接跳转
    next();
  } else {//判断是否有token
    let token = window.localStorage.getItem('b2bToken');
    if (token) {//判断是否有权限
      if (store.state.limitPath.indexOf(to.name) != -1 || to.name == 'firstPage' || to.meta.show) {
        //修改页面的title
        next();
        document.title = to.meta.title;
      } else {
        next('/home/firstPage');
      }
    } else {//没有token跳转到首页
      Message({
        title: '提示',
        type:"warning",
        message: '请先登录'
      });
      next({
        path: '/login',
        query:{
          redirect:"redirect"
        }
      })
    }
  }
})

export default router