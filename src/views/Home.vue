<template>
  <div class="home" v-loading="$store.state.loading">
    <div style="width:100%;height:100%;">
      <!-- aside菜单容器 -->
      <div ref="aside" class="aside" :style="asideStyle">
        <!-- 展开关闭菜单 -->
        <i v-if="isCollapse" class="open iconfont icon-open" @click="changeCollapse(false)"></i>
        <i id="collapseOpen" v-else class="close iconfont icon-close" @click="changeCollapse(true)"></i>
        <!-- 系统logo -->
        <div class="aside-logo">
          <img src="~assets/logo.png"
            class="aside-logo-img" alt="logo">
          <span class="aside-logo-title" v-show="!isCollapse">后台管理系统</span>
        </div>
        <el-scrollbar id="menuWarpper" style="height:calc(100% - 50px);">
          <!-- 导航菜单 -->
          <el-menu
            class
            background-color="#3a3f51"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            default-active
            :collapse="isCollapse"
            router>
            <el-submenu v-for="(menu, index) in navList" :key="index" :index="index + 1 + ''">
              <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(item, index2) in menu.childs"
                  :key="index + '-' + index2"
                  :index="item.path"
                  @click="handleMenu(item)"
                >{{ item.title }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </div>
      <!-- main主题内容容器 -->
      <div ref="main" class="main" :style="mainStyle">
        <el-header class="home-header" height="50px">
          <div class="header-con">
            <!-- 标签页 -->
            <div class="header-con-tabs">
              <el-tabs
                class="tabs"
                style="margin-top:10px"
                type="card"
                closable
                v-model="activeTab"
                @tab-remove="removeTab">
                <el-tab-pane
                  v-for="(item, index) in tabList"
                  :key="index"
                  :label="item.title"
                  :name="item.name">
                  <span slot="label">
                    <router-link :to="item.path" tag="span">{{ item.title }}</router-link>
                  </span>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- 用户头像 -->
            <el-dropdown id="profile" style="margin-top:5px" @command="handleCommand">
              <img
                style="height:40px;width:40px;border-radius:50%;"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                alt/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="chnagePass">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- 菜单页面容器 -->
        <div class="main-con">
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepAliveStr">
                <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
        
      </div>
    </div>
    <!-- 密码修改 -->
    <!-- <el-dialog
      title="密码修改"
      :visible.sync="changePassDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="500px">
      <el-form :model="formData" label-position="left" label-width="80px"
        :rules="formRule" ref="addForm">
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="formData.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="配置状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择" style="width:100%;">
            <el-option label="开启" value="开启"></el-option>
            <el-option label="关闭" value="关闭"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input-number v-model="formData.money" :controls="false" style="width:100%;"
            :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="配置" prop="config">
          <el-input v-model="formData.config" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
//网络
import { request } from "@/request";

export default {
  name: "Home",
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**导航菜单数据 */
      navList: [
        {
          title: "引导指南",
          icon: "iconfont icon-drive",
          childs: [
            {
              title: "引导指南",
              path: "driver",
            }
          ]
        },
        {
          title: "系统配置",
          icon: "el-icon-setting",
          childs: [
            {
              title: "数据统计",
              path: "firstPage",
            },
            {
              title: "系统设置",
              path: "sysSetting",
            },
            {
              title: "楼层设置",
              path: "floorSetting",
            },
            {
              title: "推荐专区",
              path: "recommend",
            },
            {
              title: "广告位设置",
              path: "advertising",
            },
            {
              title: "App楼层管理",
              path: "appFloorMan",
            },
            {
              title: "App版本管理",
              path: "appMan",
            },
            {
              title: "商城配置",
              path: "mallConfig",
            },
          ],
        },
        {
          title: "权限管理",
          icon: "iconfont icon-limit",
          childs: [
            {
              title: "管理员管理",
              path: "admin",
            },
            {
              title: "路径管理",
              path: "pathMan",
            },
            {
              title: "角色管理",
              path: "role",
            },
          ],
        },
        {
          title: "会员管理",
          icon: "iconfont icon-member",
          childs: [
            {
              title: "会员列表",
              path: "memList",
            },
            {
              title: "机构管理",
              path: "organMan",
            },
            {
              title: "证书过期管理",
              path: "certExpired",
            },
            {
              title: "注册审核管理",
              path: "registAudit",
            },
            {
              title: "注册资质管理",
              path: "registCertificate",
            },
            {
              title: "会员分类管理",
              path: "memClassify",
            },
          ],
        },
        {
          title: "充值管理",
          icon: "iconfont icon-topup",
          childs: [
            {
              title: "充值活动列表",
              path: "topupList",
            },
            {
              title: "充值流水",
              path: "topupWater",
            },
          ],
        },
        {
          title: "签到管理",
          icon: "iconfont icon-sign",
          childs: [
            {
              title: "签到规则",
              path: "signRule",
            },
            {
              title: "签到功能",
              path: "signFun",
            },
          ],
        },
        {
          title: "主题活动",
          icon: "iconfont icon-themeActive",
          childs: [
            {
              title: "主题活动模板",
              path: "themeTem",
            },
            {
              title: "主题商品组合",
              path: "themePro",
            },
            {
              title: "模板绑定",
              path: "template",
            },
          ],
        },
        {
          title: "商品管理",
          icon: "iconfont icon-product",
          childs: [
            {
              title: "商品列表",
              path: "productList",
            },
            {
              title: "商品分类",
              path: "productClassify",
            },
            {
              title: "礼品列表",
              path: "giftList",
            },
            {
              title: "积分商品",
              path: "integralGoods",
            },
            {
              title: "控销商品",
              path: "controlGoods",
            },
            {
              title: "商品到货提醒",
              path: "getGoods",
            },
            {
              title: "商品推荐管理",
              path: "recommendGoods",
            },
          ],
        },
        {
          title: "促销管理",
          icon: "iconfont icon-promotion",
          childs: [
            {
              title: "方案列表",
              path: "schemes",
            },
            {
              title: "单品方案设计",
              path: "single",
            },
            {
              title: "组合方案设计",
              path: "group",
            },
          ],
        },
        {
          title: "优惠券管理",
          icon: "iconfont icon-coupon",
          childs: [
            {
              title: "优惠券列表",
              path: "coupons",
            },
            {
              title: "优惠券下发",
              path: "giveOut",
            },
          ],
        },
        {
          title: "订单管理",
          icon: "iconfont icon-orderForm",
          childs: [
            {
              title: "订单列表",
              path: "orderList",
            },
            {
              title: "消费流水列表",
              path: "expenseWater",
            },
            {
              title: "积分订单列表",
              path: "integralList",
            },
            {
              title: "积分流水列表",
              path: "integralWater",
            },
            {
              title: "退单审核",
              path: "retreatAudit",
            },
            {
              title: "退款单申请",
              path: "refundRequest",
            },
            {
              title:"在线支付查询",
              path:"payQuery"
            }
          ],
        },
        {
          title: "评论管理",
          icon: "iconfont icon-FontAwesomecommentdots",
          childs: [
            {
              title: "商品评论审核",
              path: "commentAduit",
            },
          ],
        },
        {
          title: "专区及品牌维护",
          icon: "iconfont icon-prefecture",
          childs: [
            {
              title: "品牌列表管理",
              path: "prefectureList",
            },
            {
              title: "药店专区管理",
              path: "pharmacyZone",
            },
            {
              title: "门诊专区管理",
              path: "outpatientZone",
            },
          ],
        },
        {
          title: "抽奖管理",
          icon: "iconfont icon-lottery",
          childs: [
            {
              title: "中奖记录",
              path: "recorded",
            },
            {
              title: "抽奖规则",
              path: "prizeRule",
            },
            {
              title: "奖品列表",
              path: "prizeList",
            },
          ],
        },
        {
          title: "日志管理",
          icon: "iconfont icon-log",
          childs: [
            {
              title: "用户IP捕捉",
              path: "logIp",
            },
            {
              title:"用户操作日志",
              path:"handleLog"
            }
          ],
        },
        {
          title: "行为分析",
          icon: "iconfont icon-analyze",
          childs: [
            {
              title: "搜索频率分析",
              path: "searchFrequency",
            },
            {
              title: "购物车商品分析",
              path: "shopCart",
            },
            {
              title: "下单时间统计",
              path: "orderTime",
            },
            {
              title: "下单频率统计",
              path: "orderFrequency",
            },
            {
              title: "收藏统计",
              path: "collect",
            },
            {
              title: "客单价统计",
              path: "unitPrice",
            },
            {
              title: "订单来源统计",
              path: "orderSource",
            },
            {
              title: "支付类型统计",
              path: "typePay",
            },
          ],
        },
        {
          title: "图片管理",
          icon: "iconfont icon-image",
          childs: [
            {
              title: "图片维护",
              path: "imgMan",
            },
          ],
        },
        {
          title: "消息推送",
          icon: "iconfont icon-pushMsg",
          childs: [
            {
              title: "消息管理",
              path: "informMan",
            },
          ],
        },
        {
          title: "咨询管理",
          icon: "iconfont icon-salesman",
          childs: [
            {
              title: "咨询管理",
              path: "advisoryMan",
            },
            {
              title: "帮助中心",
              path: "helps",
            },
          ],
        },
        {
          title: "业务员管理",
          icon: "iconfont icon-advisory",
          childs: [
            {
              title: "业务员列表",
              path: "salesmanList",
            },
            {
              title: "会员分组管理",
              path: "groupMembers",
            },
            {
              title: "业务员订单列表",
              path: "salesmanOrderList",
            },
            {
              title:"业务员审核",
              path:"salesmanAduit"
            }
          ],
        },
      ],
      /**标签页数据 */
      tabList: [],
      /**活动状态的的tab */
      activeTab: "",
      isDay: true, //日间模式
      isCollapse: false,
      offsetLeft: "0px", //tabs的偏移量
      offsetIndex: 0,
      /**存储打开的标签页 */
      keepAlive: [],
      mainStyle:{width:'calc(100% - 200px)'},
      asideStyle:{width:'200px'},
      /**修改密码dialog */
      changePassDialog:false,
      accountForm:{
        
      }
    };
  },
  computed: {
    /**将keep-alive组件数组改为字符串 */
    keepAliveStr() {
      return this.keepAlive.join();
    },
  },
  mounted() {
    // this.getNavList();
    //从localStroage中获取机构id、用户id、token
    this.$store.commit('getUserInfo');
    this.setLimit();
  },
  methods: {
    /**获取导航菜单数据 */
    getNavList(){
      request({
        url:"HTSystemSetting/GetFunctionModule",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
        },
      }).then((res) => {
        // let {Success,Data} = res.data.models;
        // this.tableData = [];
        // if (Success) {
          
        // }
        window.console.log(res)
        // 获取成功后价格导航菜单的数据存放在vuex中，方便调用
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**存放权限数据到vuex中，合并为数据 */
    setLimit(){
      //该函数应该放在getNavList回调中
      let path = [];
      this.navList.forEach(ele => {
        ele.childs.forEach(ele2 => {
          path.push(ele2.path);
        });
      });
      this.$store.commit('setLimitPath',{path:path.join()});
    },

    /**菜单伸缩展开 */
    changeCollapse(bool) {
      if (bool) {
        this.isCollapse = true;
        this.asideStyle = {width:'64px'};
        this.mainStyle = {width:'calc(100% - 64px)'};
      } else {
        this.isCollapse = false;
        this.mainStyle = {width:'calc(100% - 200px)'};
        this.asideStyle = {width:'200px'};
      }
    },

    /**添加tab */
    handleMenu(item) {
      //将组件名称存储到keepAlive
      //再存一份给标签页
      //1、判断缓存组件中是否包含
      let result = this.keepAlive.indexOf(item.path);
      if (result == -1) {
        this.keepAlive.push(item.path);
        this.tabList.push({
          title: item.title,
          path: item.path,
          name: item.path,
        });
      }
      this.activeTab = item.path;
    },
    /**删除tab */
    removeTab(targetName) {
      let tabs = this.tabList;
      let activeName = this.activeTab;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.activeTab = activeName;
      this.tabList = tabs.filter((tab) => tab.name !== targetName);
      this.keepAlive = this.keepAlive.filter((item) => item !== targetName);
      this.$router.push(this.activeTab);
    },

    /**点击登出 */
    handleCommand(command){
      if (command == "logout") {
        this.logout();
      } else {
        this.$message({
          message: '修改密码',
          type: 'info'
        });
      }
    },
    /**登出 */
    logout(){
      this.$confirm('确定登出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //清除localStroage，跳转到login
        window.localStorage.removeItem('b2bToken');
        window.localStorage.removeItem('organId');
        window.localStorage.removeItem('adminId');
        this.$router.replace({
          path:"/login"
        })
      });
    },
    /**重置表单 */
    resetForm(){

    },
    /**提交表单 */
    submitForm(){
    
    }
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
/******************* aside菜单容器 *******************/
.aside {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 100%;
  background-color: #3a3f51;
  overflow: visible;
  transition: width 0.3s;
}
.close,
.open {
  position: absolute;
  top: 52px;
  font-size: 30px;
  z-index: 9;
}
.close {
  right: -5px;
}
.open {
  right: -22px;
}

/* logo */
.aside-logo{
  height: 50px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  border-bottom: 0.5px solid #909399;
  box-sizing: border-box;
  padding: 10px 20px;
}
.aside-logo-img{
  width: 30px;
  height: 30px;
  vertical-align: -8px;
}
.aside-logo-title{
  font-size: 18px;
  color: #FFF;
  margin-left: 10px;
}

/******************* 头部信息 *******************/
.home-header {
  position: relative;
  border-bottom: 0.5px solid #dcdcdc;
}
/* //头部信息容器 */
.header-con {
  text-align: right;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/******************* tabs标签容器 *******************/
.header-con-tabs {
  position: absolute;
  left: 20px;
  top: 0;
  height: 100%;
  width: 560px;
  overflow: hidden;
}

/******************* main菜单容器 *******************/
.main{
  height:100%;
  display:inline-block;
  width:calc(100% - 200px);
  overflow: hidden;
  transition: width 0.3s;
}
.main-con{
  width: 100%;
  height: calc(100% - 50px);
}


/******************* 过渡动画 *******************/
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter {
  opacity: 0;
  transform: translateX(-30px);
  -webkit-transform: translateX(-30px);
  -ms-transform: translateX(-30px);
  -moz-transform: translateX(-30px);
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-30px);
  -webkit-transform: translateX(-30px);
  -ms-transform: translateX(-30px);
  -moz-transform: translateX(-30px);
}
</style>
