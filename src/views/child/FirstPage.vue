<template>
  <!-- home显示第一页 -->
  <div class="firstPage">
    数据统计界面
  </div>
</template>

<script>
//混入driver
//混入driver
import driver from "@/mixins/drivers/driver"

export default {
  name: 'firstPage',
  mixins:[driver],
  data() {
    return {

    }
  },
  components: {

  },
  mounted(){
    //获取localStorage中的数据
    let isNeedDrive = window.localStorage.getItem('isNeedDrive');
    if (isNeedDrive) {
      //不需要提示
    } else {
      //需要提示
      this.guide();
    }
  },
}
</script>

<style scoped>
.firstPage{
  width: 100%;
  height: 100%;
}
.iframe{
  display: inline-block;
  width: 100%;
  height: auto;
}
</style>
