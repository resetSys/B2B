<template>
  <div class="home">
    <el-container style="width:100%;height:100%;">
      <el-aside width="200px" style="background-color:#545c64;">
        <el-scrollbar class="scrollbar">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container style="height:100%;">
        <el-header class="home-header" height="50px">
          <div class="header-con">
            <div class="header-con-tabs">
                <el-tabs type="card" closable>
                  <el-tab-pane
                    style="background-color:red;"
                    v-for="(item, index) in 5"
                    :key="index"
                    :label="'lable'+item"
                    :name="'name'+item"
                  >
                    <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
                  </el-tab-pane>
                </el-tabs>
              
            </div>
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
    return {};
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
.scrollbar {
  height: 100%;
}
.home-header{
  border-bottom: 0.5px solid #dcdcdc;
}
.header-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
// tabs标签容器
.header-con-tabs{
  display: flex;
  align-items: flex-end;
  height: 100%;
}
</style>
