<template>
  <div style="width: 100%">
    <el-row :gutter="10">
<!--      <h5 style="color: #1890ff;">模型损失和精度</h5>-->
      <el-col :xs="36" :sm="36" :lg="12">
        <line-chart :step="step"/>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <line-chartF1 :step="step" />
      </el-col>
    </el-row>
    <el-row>
<!--      <h5 style="color: #1890ff;">GraphSage和IDGL迭代构建图</h5>-->
      <hete-graph :step="step" :is-original="false" :id="'chartStep4'"/>
    </el-row>
  </div>
</template>

<script>
import LineChart from "@/views/job/components/flowItems/LineChart";
import LineChartF1 from "@/views/job/components/flowItems/LineChartF1";
import HeteGraph from "@/views/job/components/flowItems/HeteGraph";

export default {
  name: "FlowItemTrainLoss",
  props:{
    step:{
      default:0
    }
  },
  components: {
    HeteGraph,
    LineChart,
    LineChartF1
  }
}
</script>

<style scoped>

</style>
