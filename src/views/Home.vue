<template>
  <div class="home">
    <el-container style="width:100%;height:100%;">
      <el-aside width="200px" style="background-color:#545c64;">
        <el-scrollbar class="scrollbar">
          <div class="userInfo">
            <el-avatar class="userInfo-avg" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
            default-active="sysSetting"
            router>
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
                <i class="el-icon-edit"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="admin">管理员管理</el-menu-item>
                <el-menu-item index="role">角色管理</el-menu-item>
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
      navList:[
        {
          title:"导航1",
          childs:[
            {
              title:"子导航1",
              path:"item1"
            },
            {
              title:"子导航2",
              path:"item2"
            }
          ]
        }
      ],
      tabList:[
        {
          title:"子导航1",
          path:"item1"
        },
        {
          title:"子导航2",
          path:"item2"
        }
      ]
    };
  },
  components: {},
  mounted() {},
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
.userInfo{
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
.userInfo-avg{
  width: 100px;
  height: 100px;
}
.userInfo-name{
  font-size: 20px;
  color: #fff;
  margin-top: 10px;
}
.userInfo-con{
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
</style>
