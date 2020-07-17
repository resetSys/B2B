<template>
  <!-- 单品方案设计 -->
  <div class="single">
    <el-scrollbar style="height:100%;padding-top:20px;box-sizing:border-box">
      <el-form :model="formData" label-position="right" label-width="200px">
        <el-form-item label="方案名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入方案名称" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="商品范围" prop="range">
          <el-select v-model="formData.range" placeholder="请选择" style="width:200px;" clearable>
            <el-option label="全部" value="全部"></el-option>
            <el-option label="分类商品" value="分类商品"></el-option>
            <el-option label="独立商品" value="独立商品"></el-option>
            <el-option label="品牌商品" value="品牌商品"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="促销类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择" style="width:200px;" clearable>
            <el-option label="满赠" value="满赠"></el-option>
            <el-option label="满减" value="满减"></el-option>
            <el-option label="折扣" value="折扣"></el-option>
            <el-option label="换购" value="换购"></el-option>
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
        <el-form-item label="活动商品" prop="activeGoods">
          <el-input v-model="formData.activeGoods" placeholder="" style="width:200px;"></el-input>
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
        <el-form-item label="促销数量" prop="sum">
          <el-input-number v-model="formData.sum" controls-position="right" :min="1"
           :controls="false" style="width:200px;"></el-input-number>
        </el-form-item>
        <el-form-item label="限购数量" prop="limit">
          <el-input-number v-model="formData.limit" controls-position="right" :min="1"
           :controls="false" style="width:200px;"></el-input-number>
        </el-form-item>
        <el-form-item label="促销模式" prop="mode">
          <el-select v-model="formData.mode" placeholder="请选择" style="width:200px;" clearable>
            <el-option label="满足金额" value="满足金额"></el-option>
            <el-option label="满足数量" value="满足数量"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶梯递增模式" prop="increase">
          <el-checkbox v-model="formData.increase">请选择</el-checkbox>
        </el-form-item>
        <el-form-item label="满足条件" prop="">
          <el-input-number controls-position="right" :min="1" placeholder="满足金额"
           :controls="false" style="width:100px;margin-right:5px"></el-input-number>
           <el-input placeholder="商品" style="width:200px;margin-right:5px"></el-input>
           <el-input-number controls-position="right" :min="1" placeholder="满足数量"
           :controls="false" style="width:100px;margin-right:5px"></el-input-number>
           <el-input-number controls-position="right" :min="1" placeholder="满足"
           :controls="false" style="width:100px;margin-right:5px"></el-input-number>
           <el-button type="primary">保存</el-button>
        </el-form-item>
        <el-form-item label="促销描述" prop="des">
          <el-input v-model="formData.des" placeholder="促销描述" style="width:200px;"></el-input>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'single',
  data() {
    return {
      formData:{
        name:"",//方案名称
        range:"",//商品范围
        type:"",//促销类型
        clientType:"",//客户类型
        activeGoods:"",//活动商品
        scope:"",//时间范围
        sum:"",//促销总数
        limit:"",//限购数量
        mode:"",//促销模式
        increase:"",//阶梯递增
        des:""//促销描述
      }
    }
  },
  components: {

  }
}
</script>

<style scoped>
.single{
  width: 100%;
  height: 100%;
}
</style>
