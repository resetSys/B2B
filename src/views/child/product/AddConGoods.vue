<template>
  <div class="addConGoods">
    <page-header @back="goBack" title="添加控销商品"></page-header>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: 'addConGoods',
  data() {
    return {

    }
  },
  components: {
    PageHeader
  },
  methods:{
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.addConGoods{
  width: 100%;
  height: 100%;
}
</style>
