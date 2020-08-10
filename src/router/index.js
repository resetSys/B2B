//导入插件
import Vue from "vue";
import VueRouter from "vue-router";

//导入页面
const Login = () =>import("@/views/Login.vue");
const Home = () =>import("@/views/Home.vue");
//第一个页面
const FirstPage = () => import("@/views/child/FirstPage.vue");
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
const AdvisoryMan = () => import("@/views/child/advisory/AdvisoryMan.vue");
const Helps = () => import("@/views/child/advisory/Helps.vue");
//业务员管理
const GroupMembers = () => import("@/views/child/salesman/GroupMembers.vue");
const SalesmanList = () => import("@/views/child/salesman/SalesmanList.vue");
const SalesmanOrderList = () => import("@/views/child/salesman/SalesmanOrderList.vue");


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
        component:FirstPage,
        meta:{
          title:"首页"
        }
      },
      {
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
        path:"advertising",
        component:Advertising,
        meta:{
          title:"广告位设置"
        }
      },{
        path:"appFloorMan",
        component:AppFloorMan,
        meta:{
          title:"App楼层管理"
        }
      },{
        path:"mallConfig",
        component:MallConfig,
        meta:{
          title:"商城配置"
        }
      },{
        path:"appMan",
        component:AppMan,
        meta:{
          title:"App版本管理"
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
        path:"pathMan",
        component:PathMan,
        meta:{
          title:"路径管理"
        }
      },{
        path:"addRole",
        component:AddRole,
        meta:{
          title:"信息管理"
        }
      },{
        path:"aduit",
        component:Audit,
        meta:{
          title:"注册审核"
        }
      },{
        path:"memList",
        component:MemList,
        meta:{
          title:"会员列表"
        }
      },{
        path:"organMan",
        component:OrganMan,
        meta:{
          title:"机构管理"
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
        path:"certificate",
        component:Certificate,
        meta:{
          title:"注册资质"
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
        path:"addTemplate",
        component:AddTemplate,
        meta:{
          title:"模板管理"
        }
      },{
        path:"addTemPro",
        component:AddTemPro,
        meta:{
          title:"绑定商品"
        }
      },{
        path:"productList",
        component:ProductList,
        meta:{
          title:"商品列表"
        }
      },{
        path:"addProduct",
        component:AddProduct,
        meta:{
          title:"商品管理"
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
        path:"addConGoods",
        component:AddConGoods,
        meta:{
          title:"添加控销商品"
        }
      },{
        path:"addGift",
        component:AddGift,
        meta:{
          title:"添加礼品"
        }
      },{
        path:"addIntGoods",
        component:AddIntGoods,
        meta:{
          title:"添加积分商品"
        }
      },{
        path:"addProClassify",
        component:AddProClassify,
        meta:{
          title:"新增商品分类"
        }
      },{
        
        path:"addComm",
        component:AddComm,
        meta:{
          title:"新增推荐商品"
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
      },{
        path:"orderList",
        component:OrderList,
        meta:{
          title:"订单列表"
        }
      },{
        path:"expenseWater",
        component:ExpenseWater,
        meta:{
          title:"消费流水列表"
        }
      },{
        path:"integralList",
        component:IntegralList,
        meta:{
          title:"积分订单列表"
        }
      },{
        path:"integralWater",
        component:IntegralWater,
        meta:{
          title:"积分流水列表"
        }
      },{
        path:"retreatAudit",
        component:RetreatAudit,
        meta:{
          title:"退单审核"
        }
      },{
        path:"refundRequest",
        component:RefundRequest,
        meta:{
          title:"退款单申请"
        }
      },{
        path:"payQuery",
        component:PayQuery,
        meta:{
          title:"在线支付查询"
        }
      },{
        path:"commentAduit",
        component:CommentAduit,
        meta:{
          title:"商品评论审核"
        }
      },{
        path:"prefectureList",
        component:PrefectureList,
        meta:{
          title:"品牌列表管理"
        }
      },{
        path:"pharmacyZone",
        component:PharmacyZone,
        meta:{
          title:"药店专区管理"
        }
      },{
        path:"prefectureGoods",
        component:PrefectureGoods,
        meta:{
          title:"品牌商品"
        }
      },{
        path:"outpatientZone",
        component:OutpatientZone,
        meta:{
          title:"门诊专区管理"
        }
      },{
        path:"prizeList",
        component:PrizeList,
        meta:{
          title:"奖品列表"
        }
      },{
        path:"prizeRule",
        component:PrizeRule,
        meta:{
          title:"抽奖规则"
        }
      },{
        path:"recorded",
        component:Recorded,
        meta:{
          title:"中奖记录"
        }
      },{
        path:"logIp",
        component:LogIp,
        meta:{
          title:"用户IP捕捉记录"
        }
      },{
        path:"handleLog",
        component:HandleLog,
        meta:{
          title:"用户IP捕捉记录"
        }
      },{
        path:"collect",
        component:Collect,
        meta:{
          title:"收藏统计"
        }
      },{
        path:"orderFrequency",
        component:OrderFrequency,
        meta:{
          title:"下单频率分析"
        }
      },{
        path:"orderSource",
        component:OrderSource,
        meta:{
          title:"订单来源统计"
        }
      },{
        path:"orderTime",
        component:OrderTime,
        meta:{
          title:"下单时间统计"
        }
      },{
        path:"searchFrequency",
        component:SearchFrequency,
        meta:{
          title:"搜索频率分析"
        }
      },{
        path:"shopCart",
        component:ShopCart,
        meta:{
          title:"购物车商品分析"
        }
      },{
        path:"typePay",
        component:TypePay,
        meta:{
          title:"支付类型统计"
        }
      },{
        path:"unitPrice",
        component:UnitPrice,
        meta:{
          title:"客单价统计"
        }
      },{
        path:"imgMan",
        component:ImgMan,
        meta:{
          title:"图片管理"
        }
      },{
        path:"informMan",
        component:InformMan,
        meta:{
          title:"推送管理"
        }
      },{
        path:"advisoryMan",
        component:AdvisoryMan,
        meta:{
          title:"咨询管理"
        }
      },{
        path:"helps",
        component:Helps,
        meta:{
          title:"帮助中心"
        }
      },{
        path:"groupMembers",
        component:GroupMembers,
        meta:{
          title:"会员分组管理"
        }
      },{
        path:"salesmanList",
        component:SalesmanList,
        meta:{
          title:"业务员列表"
        }
      },{
        path:"salesmanOrderList",
        component:SalesmanOrderList,
        meta:{
          title:"业务员订单列表"
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:"hash"
})

router.beforeEach((to,from,next)=>{
  //修改标题
  //从from跳转到to里面去
  next();//跳转，系统默认是加上的，如果不加会造成无法跳转
  //修改页面的title
  document.title = to.meta.title;
  //to：表示当前路由，meta实在路由映射中配置的静态资源
  //如果以上述方式修改title的话，有嵌套其他组件的组件将会显示不正常
  // document.title = to.matched[0].meta.title;
})

export default router