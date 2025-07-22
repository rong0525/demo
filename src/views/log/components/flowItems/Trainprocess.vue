<template>
  <div style="width: 100%">
    <sub-graph id="train" />
  </div>
</template>

<script>
// import LineChart from '@/views/job/components/flowItems/LineChart'
// import LineChartF1 from '@/views/job/components/flowItems/LineChartF1'
// import HeteGraph from '@/views/job/components/flowItems/HeteGraph'
import SubGraph from '@/views/analyse/components/SubGraph.vue'

export default {
  name: 'FlowItemTrainLoss',
  components: {
    // HeteGraph,
    // LineChart,
    // LineChartF1,
    SubGraph
  },
  props: {
    step: {
      default: 0
    }
  }
}
</script>

  <style scoped>

  </style>

