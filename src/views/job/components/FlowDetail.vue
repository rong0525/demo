<template>
  <div style="height: 600px;">
    <div v-show="flowItem.index==='0'">
      <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">Step0:开始训练</h5>
      <job-summary :job-value="jobValue" :start-time="startTime" />
    </div>
    <div v-show="flowItem.index==='1'">
      <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">Step1:参数配置</h5>
      <flow-item-begin :job-form="jobForm"/>
    </div>
    <div v-show="flowItem.index==='2'">
      <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">Step2:特征提取</h5>
      <flow-item-feature-read :step="flowItem.index"/>
    </div>
    <div v-show="flowItem.index==='3'">
      <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">Step3:构建初始加密流量图</h5>
      <hete-graph :is-original="true" :step="flowItem.index"/>
    </div>
    <div v-show="flowItem.index==='4'">
      <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">Step4:训练模型</h5>
      <flow-item-train-loss :step="flowItem.index"/>
    </div>
    <div v-show="flowItem.index==='5'">
      <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">Step5:训练结束</h5>
      <flow-item-end/>
    </div>
  </div>
</template>

<script>

import JobSummary from './flowItems/JobSummary.vue'
import FlowItemBegin from "@/views/job/components/flowItems/FlowItemBegin";
import FlowItemTrainLoss from "@/views/job/components/flowItems/FlowItemTrainLoss";
import HeteGraph from "@/views/job/components/flowItems/HeteGraph";
import FlowItemDataRead from "@/views/job/components/flowItems/FlowItemDataRead";
import FlowItemEnd from "@/views/job/components/flowItems/FlowItemEnd";
import FlowItemFeatureRead from "@/views/job/components/flowItems/FlowItemFeatureRead";

export default {
  name: 'FlowDetail',
  props: {
    flowItem: {
      'index': '0'
    },
    jobForm: {
      default() {
        return {}
      }
    },
    jobValue: {
      default: 0
    },
    startTime: {
      default: null,
    },
  },
  components: {
    JobSummary,
    FlowItemTrainLoss,
    FlowItemBegin,
    HeteGraph,
    FlowItemDataRead,
    FlowItemEnd,
    FlowItemFeatureRead
  },
  data() {
    return {
      isDetail: true,
      loading: true
    }
  },
  mounted() {
    // console.log("detail job form", this.jobForm);
  },
}
</script>

<style scoped>

</style>
