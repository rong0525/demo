<template>
  <el-descriptions class="margin-top" title="参数设置" :column="1" style="height: auto;">
    <el-descriptions-item label="训练轮次" >{{jobForm.epoch}}</el-descriptions-item>
    <el-descriptions-item label="Batch数量" >{{jobForm.batchSize}}</el-descriptions-item>
    <el-descriptions-item label="学习率" >{{jobForm.learningRate}}</el-descriptions-item>

    <el-descriptions-item label="一阶邻居采样数量" >{{jobForm.sample_1 }}</el-descriptions-item>
    <el-descriptions-item label="二阶邻居采样数量" >{{jobForm.sample_2 }}</el-descriptions-item>
    <el-descriptions-item label="三阶邻居采样数量" >{{jobForm.sample_3 }}</el-descriptions-item>

    <el-descriptions-item label="graphSage类型" >{{jobForm.graphSage}}</el-descriptions-item>
    <el-descriptions-item label="是否使用IDGL" >{{idglMap(jobForm.idgl)}}</el-descriptions-item>

  </el-descriptions>
</template>

<script>
export default {
  name: 'FlowItemBegin',
  props:{
    jobForm: {
      default: () => {},
    },
    startTime:{
      default: 0
    }
  },
  filters:{
    lossFilter(statue){
      if(statue === "0"){
        return "均值填充"
      } else if (statue === "1"){
        return "中值填充"
      } else if(statue === "2"){
        return "零填充"
      } else{
        return ""
      }
    },
    abnormalFilter(statue){
      if(statue === "0"){
        return "K-means修正"
      } else if(statue === "1"){
        return "均值修正"
      } else {
        return ""
      }
    },
    scalerFilter(statue){
      if(statue === "0"){
        return "MinMaxScaler"
      } else if (statue === "1"){
        return "StanderScaler"
      } else if (statue === "2"){
        return "不归一化"
      } else {
        return ""
      }
    }
  },
  mounted() {
    console.log("begin job form", this.jobForm);
  },
  methods: {
    idglMap(val){
      console.log("idgl", val);
      if (val === 1) {
        return "否"
      } else {
        return "是"
      }
    }
  }
}
</script>

<style scoped>

</style>
