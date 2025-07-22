<template>
  <div class="dashboard-editor-container">
    <!-- <el-row :gutter="32" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;height:650px">
        <Map />
    </el-row> -->
    <panel-group />
    <el-row :gutter="32" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;height:650px">
      <flow-card />
    </el-row>
  </div>
</template>

<script>
//import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'

import FlowCard from './components/FlowCard'




export default {
  name: 'DashboardAdmin',
  components: {
 
    PanelGroup,
   
    FlowCard
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
