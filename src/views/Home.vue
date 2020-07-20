<template>
  <div class="home">
    <el-container style="width:100%;height:100%;">
      <el-aside width="200px" style="background-color:#545c64;">
        <el-scrollbar class="scrollbar">
          <div class="userInfo" style="display:none;">
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
          </div>
          <el-menu
            class=""
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            default-active=""
            router
          >
            <el-submenu index="1">
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
                <el-menu-item index="registCertificate"
                  >注册资质管理</el-menu-item
                >
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
                <i class="el-icon-eleme"></i>
                <span>签到管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="signRule">签到规则</el-menu-item>
                <el-menu-item index="signFun">签到功能</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-eleme"></i>
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
                <i class="el-icon-eleme"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="productList">商品列表</el-menu-item>
                <el-menu-item index="productClassify">商品分类</el-menu-item>
                <el-menu-item index="giftList">礼品列表</el-menu-item>
                <el-menu-item index="integralGoods">积分商品</el-menu-item>
                <el-menu-item index="controlGoods">控销商品</el-menu-item>
                <el-menu-item index="GetGoods">商品到货提醒</el-menu-item>
                <el-menu-item index="RecommendGoods">商品推荐管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-eleme"></i>
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
                <i class="el-icon-eleme"></i>
                <span>优惠券管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="coupons">优惠券列表</el-menu-item>
                <el-menu-item index="giveOut">优惠券下发</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="10">
              <template slot="title">
                <i class="el-icon-eleme"></i>
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
                <i class="el-icon-eleme"></i>
                <span>评论管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="commentAduit">商品评论审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="12">
              <template slot="title">
                <i class="el-icon-eleme"></i>
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
                <i class="el-icon-eleme"></i>
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
                <i class="el-icon-eleme"></i>
                <span>日志管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="logIp">用户IP捕捉</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container style="height:100%;">
        <el-header class="home-header" height="50px">
          <div class="header-con">
            <!-- 标签页 -->
            <!-- <div class="header-con-tabs">
              <el-tabs type="card" closable>
                <el-tab-pane
                  style="background-color:red;"
                  v-for="(item, index) in tabList"
                  :key="index"
                  :label="'lable' + item.title"
                  :name="'name' + item.title">
                    <span slot="label">
                      <router-link :to="item.path">
                        <i class="el-icon-date"></i>
                        {{item.title}}
                      </router-link>
                    </span>
                </el-tab-pane>
              </el-tabs>
            </div> -->
            <!-- 日间夜间模式 -->
            <div class="theme-color">
              <transition
                name="fade"
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
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      navList: [
        {
          title: "导航1",
          childs: [
            {
              title: "子导航1",
              path: "item1",
            },
            {
              title: "子导航2",
              path: "item2",
            },
          ],
        },
      ],
      tabList: [
        {
          title: "子导航1",
          path: "item1",
        },
        {
          title: "子导航2",
          path: "item2",
        },
      ],
      isDay: true, //日间模式
    };
  },
  components: {},
  mounted() {},
  methods: {
    changeTheme() {
      this.isDay = !this.isDay;
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
// navMenu滚动条
.scrollbar {
  height: 100%;
}
//用户信息
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
//头部信息
.home-header {
  border-bottom: 0.5px solid #dcdcdc;
}
//头部信息容器
.header-con {
  display: flex;
  // justify-content: space-between;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
// tabs标签容器
.header-con-tabs {
  display: flex;
  align-items: flex-end;
  height: 100%;
  width: 560px;
  padding-top: 25px;
  overflow-x: scroll;
  overflow-y: hidden;
}
//navMenu样式
.el-scrollbar__view >>> .el-submenu__title {
  text-align: left;
}
//主题切换
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
.theme-night,.theme-day{
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  transition: transform 0.7s;
}
//过度动画
.fade-enter{//开始进入
  transform: translateY(-35px);
}
.fade-enter-to{//进入完毕
  transform: translateY(0px);
}
.fade-leave{//开始离开
  transform: translateY(0px);
}
.fade-leave-to{//离开完毕
  transform: translateY(35px);
}
//进入时显现
.custom-appear-class{
  transform: scale(0,0);
}
.custom-appear-to-class{
  transform: scale(20px,20px);
}
</style>
