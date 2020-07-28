<template>
  <div class="home" v-loading="$store.state.loading">
    <el-container style="width:100%;height:100%;">
      <el-aside ref="aside" class="aside" :width="asideWidth">
        <!-- 展开关闭菜单 -->
        <i v-if="isCollapse" class="open iconfont icon-open" @click="changeCollapse(false)"></i>
        <i v-else class="close iconfont icon-close" @click="changeCollapse(true)"></i>
        <el-scrollbar class="scrollbar">
          <!-- 用户信息 -->
          <!-- <div class="userInfo">
            <el-avatar
              class="userInfo-avg"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span class="userInfo-name">管理员</span>
            <div class="userInfo-con">
              <span>
                <i class="el-icon-setting"></i>
                设置
              </span>
              <span>
                <i class="el-icon-suitcase"></i>
                退出
              </span>
            </div>
          </div>-->
          <!-- 导航菜单 -->
          <el-menu
            class
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            default-active
            :collapse="isCollapse"
            router
          >
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
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统配置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="sysSetting">系统设置</el-menu-item>
                <el-menu-item index="floorSetting">楼层设置</el-menu-item>
                <el-menu-item index="recommend">推荐专区</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-limit"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="admin">管理员管理</el-menu-item>
                <el-menu-item index="role">角色管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="iconfont icon-member"></i>
                <span>会员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="memList">会员列表</el-menu-item>
                <el-menu-item index="certExpired">证书过期管理</el-menu-item>
                <el-menu-item index="registAudit">注册审核管理</el-menu-item>
                <el-menu-item index="registCertificate">注册资质管理</el-menu-item>
                <el-menu-item index="memClassify">会员分类管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="iconfont icon-topup"></i>
                <span>充值管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="topupList">充值活动列表</el-menu-item>
                <el-menu-item index="topupWater">充值流水</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="iconfont icon-sign"></i>
                <span>签到管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="signRule">签到规则</el-menu-item>
                <el-menu-item index="signFun">签到功能</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="iconfont icon-themeActive"></i>
                <span>主题活动</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="themeTem">主题活动模板</el-menu-item>
                <el-menu-item index="themePro">主题商品组合</el-menu-item>
                <el-menu-item index="template">模板绑定</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="iconfont icon-product"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="productList">商品列表</el-menu-item>
                <el-menu-item index="productClassify">商品分类</el-menu-item>
                <el-menu-item index="giftList">礼品列表</el-menu-item>
                <el-menu-item index="integralGoods">积分商品</el-menu-item>
                <el-menu-item index="controlGoods">控销商品</el-menu-item>
                <el-menu-item index="getGoods">商品到货提醒</el-menu-item>
                <el-menu-item index="recommendGoods">商品推荐管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
              <template slot="title">
                <i class="iconfont icon-promotion"></i>
                <span>促销管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="schemes">方案列表</el-menu-item>
                <el-menu-item index="single">单品方案设计</el-menu-item>
                <el-menu-item index="group">组合方案设计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
              <template slot="title">
                <i class="iconfont icon-coupon"></i>
                <span>优惠券管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="coupons">优惠券列表</el-menu-item>
                <el-menu-item index="giveOut">优惠券下发</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="10">
              <template slot="title">
                <i class="iconfont icon-orderForm"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="orderList">订单列表</el-menu-item>
                <el-menu-item index="expenseWater">消费流水列表</el-menu-item>
                <el-menu-item index="integralList">积分订单列表</el-menu-item>
                <el-menu-item index="integralWater">积分流水列表</el-menu-item>
                <el-menu-item index="retreatAudit">退单审核</el-menu-item>
                <el-menu-item index="refundRequest">退款单申请</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="11">
              <template slot="title">
                <i class="iconfont icon-FontAwesomecommentdots"></i>
                <span>评论管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="commentAduit">商品评论审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="12">
              <template slot="title">
                <i class="iconfont icon-prefecture"></i>
                <span>专区及品牌维护</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="prefectureList">品牌列表管理</el-menu-item>
                <el-menu-item index="pharmacyZone">药店专区管理</el-menu-item>
                <el-menu-item index="outpatientZone">门诊专区管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="13">
              <template slot="title">
                <i class="iconfont icon-lottery"></i>
                <span>抽奖管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="recorded">中奖记录</el-menu-item>
                <el-menu-item index="prizeRule">抽奖规则</el-menu-item>
                <el-menu-item index="prizeList">奖品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="14">
              <template slot="title">
                <i class="iconfont icon-log"></i>
                <span>日志管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="logIp">用户IP捕捉</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="15">
              <template slot="title">
                <i class="iconfont icon-analyze"></i>
                <span>行为分析</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="searchFrequency">搜索频率分析</el-menu-item>
                <el-menu-item index="shopCart">购物车商品分析</el-menu-item>
                <el-menu-item index="orderTime">下单时间统计</el-menu-item>
                <el-menu-item index="orderFrequency">下单频率统计</el-menu-item>
                <el-menu-item index="collect">收藏统计</el-menu-item>
                <el-menu-item index="unitPrice">客单价统计</el-menu-item>
                <el-menu-item index="orderSource">订单来源统计</el-menu-item>
                <el-menu-item index="typePay">支付类型统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="16">
              <template slot="title">
                <i class="iconfont icon-image"></i>
                <span>图片管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="imgMan">图片维护</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="17">
              <template slot="title">
                <i class="iconfont icon-pushMsg"></i>
                <span>消息推送</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="informMan">消息管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="18">
              <template slot="title">
                <i class="iconfont icon-salesman"></i>
                <span>咨询管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="advisoryMan">咨询管理</el-menu-item>
                <el-menu-item index="helps">帮助中心</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="19">
              <template slot="title">
                <i class="iconfont icon-advisory"></i>
                <span>业务员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="salesmanList">业务员列表</el-menu-item>
                <el-menu-item index="groupMembers">会员分组管理</el-menu-item>
                <el-menu-item index="salesmanOrderList">业务员订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>-->
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container style="height:100%;">
        <el-header class="home-header" height="50px">
          <div class="header-con">
            <!-- 标签页 -->
            <div class="header-con-tabs">
              <div class="tab-controls">
                <span @click="changeOffset(-1)">
                  <i class="el-icon-arrow-left"></i>
                </span>
                <span @click="changeOffset(1)">
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
              <el-tabs
                class="tabs"
                :style="{'margin-left': offsetLeft,transition: 'margin-left 0.3s'}"
                type="card"
                closable
                v-model="activeTab"
                @tab-remove="removeTab"
              >
                <el-tab-pane
                  v-for="(item, index) in tabList"
                  :key="index"
                  :label="item.title"
                  :name="item.name"
                >
                  <span slot="label">
                    <router-link :to="item.path" tag="span">{{ item.title }}</router-link>
                  </span>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- 日间夜间模式 -->
            <div class="theme-color">
              <transition
                name="slide"
                mode="out-in"
                appear
                appear-class="custom-appear-class"
                appear-to-class="custom-appear-to-class"
                appear-active-class="custom-appear-active-class"
              >
                <span key="day" v-if="isDay" class="theme-day" @click="changeTheme"></span>
                <span key="night" v-else class="theme-night" @click="changeTheme"></span>
              </transition>
            </div>
            <!-- 用户头像 -->
            <el-dropdown>
              <img
                style="height:40px;border-radius:50%;"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                alt
              />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- 菜单页面容器 -->
        <!-- <keep-alive :include="keepAliveStr"> -->
          <!-- <transition mode="out-in" name="fade"> -->
            <router-view></router-view>
          <!-- </transition> -->
        <!-- </keep-alive> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
//网络
import { request } from "@/request";

export default {
  name: "Home",
  data() {
    return {
      adminId:this.$store.state.adminId,
      organId:this.$store.state.organId,
      /**导航菜单数据 */
      navList: [
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
          ],
        },
      ],
      /**标签页数据 */
      tabList: [],
      /**活动状态的的tab */
      activeTab: "",
      isDay: true, //日间模式
      isCollapse: false,
      asideWidth: "200px",
      offsetLeft: "0px", //tabs的偏移量
      offsetIndex: 0,
      /**存储打开的标签页 */
      keepAlive: [],
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
      }).catch((err) => {
        window.console.log(err);
      });
    },

    /**改变主题 */
    changeTheme() {
      this.isDay = !this.isDay;
    },
    /**菜单伸缩展开 */
    changeCollapse(bool) {
      if (bool) {
        this.isCollapse = true;
        this.asideWidth = "auto";
      } else {
        this.isCollapse = false;
        this.asideWidth = "200px";
      }
    },
    /**改变tab偏移量 */
    changeOffset(num) {
      /**
        offsetIndex限制不能小于0，不能大于list.length-4
       */
      this.offsetIndex += num;
      this.offsetIndex = this.offsetIndex <= 0 ? 0 : this.offsetIndex;
      this.offsetIndex =this.offsetIndex >= (this.tabList.length - 4)? (this.tabList.length - 4): this.offsetIndex;
      this.offsetLeft = -120 * this.offsetIndex + "px";
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
      //2、调整tabs位置
      if (this.tabList.length - 4 > 0) {
        this.offsetIndex = this.tabList.length - 4;
        this.offsetLeft = -120 * this.offsetIndex + "px";
      }
      //3、定位到当前activeTab
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
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
/* //aside菜单容器 */
.aside {
  position: relative;
  background-color: #545c64;
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

/* // navMenu滚动条 */
.scrollbar {
  height: 100%;
}

/* //用户信息 */
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px 0;
  margin-left: -7px;
  border-bottom: 0.5px solid #dcdcdc;
}
.userInfo-avg {
  width: 100px;
  height: 100px;
}
.userInfo-name {
  font-size: 20px;
  color: #fff;
  margin-top: 10px;
}
.userInfo-con {
  display: flex;
  width: 120px;
  justify-content: space-around;
  color: #fff;
  margin-top: 10px;
  font-size: 14px;
}
/* //头部信息 */
.home-header {
  position: relative;
  border-bottom: 0.5px solid #dcdcdc;
}
/* //头部信息容器 */
.header-con {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* // tabs标签容器 */
.header-con-tabs {
  position: absolute;
  left: 5px;
  top: 0;
  display: flex;
  align-items: flex-end;
  height: 100%;
  width: 560px;
  overflow: hidden;
}
.tab-controls {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  width: 60px;
  height: 40px;
  bottom: 0;
  z-index: 9;
  background-color: #fff;
}
.tab-controls > span {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #000;
}

/* //主题切换 */
.theme-color {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 40px;
  margin-right: 20px;
  overflow: hidden;
}
.theme-day {
  background: url("../assets/home/day.png") no-repeat center;
}
.theme-night {
  background: url("../assets/home/night.png") no-repeat center;
}
.theme-night,
.theme-day {
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  transition: transform 0.7s;
}
/* //过度动画 */
.slide-enter {
  /* //开始进入 */
  transform: translateY(-35px);
}
.slide-enter-to {
  /* //进入完毕 */
  transform: translateY(0px);
}
.slide-leave {
  /* //开始离开 */
  transform: translateY(0px);
}
.slide-leave-to {
  /* //离开完毕 */
  transform: translateY(35px);
}
/* //进入时显现 */
.custom-appear-class {
  transform: scale(0, 0);
}
.custom-appear-to-class {
  transform: scale(20px, 20px);
}

/* 组件切换过渡效果 */
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 0.3s;
}
</style>
