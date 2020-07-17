<template>
  <!-- 组合方案设计 -->
  <div class="group">
    <el-scrollbar style="height:100%;padding-top:20px;box-sizing:border-box">
      <el-form :model="formData" label-position="right" label-width="200px">
        <el-form-item label="方案名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入方案名称" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="方案类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择" style="width:200px;" clearable>
            <el-option label="商品组合" value="商品组合"></el-option>
            <el-option label="抢购(秒杀)" value="抢购(秒杀)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型" prop="clientType">
          <el-select v-model="formData.clientType" placeholder="请选择" style="width:200px;" clearable>
            <el-option label="全部" value="全部"></el-option>
            <el-option label="终端" value="终端"></el-option>
            <el-option label="批发" value="批发"></el-option>
            <el-option label="连锁" value="连锁"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围" prop="scope">
          <el-date-picker
            v-model="formData.scope"
            style="width:400px;"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-checkbox v-model="formData.isShow">
            <span v-show="formData.isShow">显  示</span>
            <span v-show="!formData.isShow">不显示</span>
          </el-checkbox>
        </el-form-item>
        <el-form-item label="促销数量" prop="sum">
          <el-input-number v-model="formData.sum" controls-position="right" :min="1"
           :controls="false" style="width:200px;"></el-input-number>
        </el-form-item>
        <el-form-item label="限购数量" prop="limit">
          <el-input-number v-model="formData.limit" controls-position="right" :min="1"
           :controls="false" style="width:200px;"></el-input-number>
        </el-form-item>
        <el-form-item label="促销描述" prop="des">
          <el-input v-model="formData.des" placeholder="促销描述" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="活动商品" prop="">
          
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'group',
  data() {
    return {
      formData:{
        name:"",//方案名称
        type:"",//方案类型
        clientType:"",//客户类型
        scope:"",//时间范围
        isShow:"",//是否显示
        sum:"",//促销总数
        limit:"",//限购数量
        des:""//促销描述
      }
    }
  },
  components: {

  }
}
</script>

<style scoped>
.group{
  width: 100%;
  height: 100%;
}
</style>
