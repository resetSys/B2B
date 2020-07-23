<template>
  <!-- 单品方案设计 -->
  <div class="single">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['促销管理',$route.meta.title]">
    </crumbs-bar>
    <el-scrollbar style="height:calc(100% - 40px);padding-top:20px;box-sizing:border-box">
      <el-form :model="formData" label-position="right"
        label-width="100px" :rules="formRule" ref="addForm">
        <div class="form-item-wrap">
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
        </div>
        <div class="form-item-wrap">
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
        </div>
        <div class="form-item-wrap">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="formData.startTime"
              style="width:200px;"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="formData.endTime"
              style="width:200px;"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
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
        </div>
        <div class="form-item-wrap">
          <el-form-item label="促销数量" prop="sum">
            <el-input-number v-model="formData.sum" controls-position="right" :min="1"
             :controls="false" style="width:200px;"></el-input-number>
          </el-form-item>
          <el-form-item label="促销描述" prop="des">
            <el-input v-model="formData.des" placeholder="促销描述" style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="阶梯递增模式" prop="increase">
            <el-checkbox v-model="formData.increase">请选择</el-checkbox>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
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
        </div>
        <div class="form-item-wrap">
          <el-form-item label="" prop="">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="info" @click="clearForm">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import crumbsBar from "@/components/CrumbsBar.vue";

export default {
  name: 'single',
  data() {
    return {
      /**新增表单 */
      formData:{
        name:"",//方案名称
        range:"",//商品范围
        type:"",//促销类型
        clientType:"",//客户类型
        activeGoods:"",//活动商品
        startTime:"",//开始时间
        endTime:"",//结束时间
        sum:1,//促销总数
        limit:1,//限购数量
        mode:"",//促销模式
        increase:"",//阶梯递增
        des:""//促销描述
      },
      /**表单规则 */
      formRule:{}
    }
  },
  components: {
    crumbsBar,
  },
  methods:{
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
    },
    /**提交表单 */
    submit(){
      this.$message({
        message: '执行提交操作',
        type: 'info'
      });
    },
  }
}
</script>

<style scoped>
.single{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
