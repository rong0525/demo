<template>
    <div class="dashboard-editor-container">
      <el-row :gutter="32" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;height:650px">
        <map1/>
    </el-row>
  
    <el-row :gutter="32">
        <el-col :xs="36" :sm="36" :lg="12">
          <div class="chart-wrapper">
            <line-chart  />
          </div>
        </el-col>
        <el-col :xs="36" :sm="36" :lg="12">
          <div class="chart-wrapper">
            <line-chart-f1  />
          </div>
        </el-col>
      </el-row>

      <!-- IP变化域名变化 -->
      <el-row :gutter="32">
        <el-col :xs="36" :sm="36" :lg="12">
          <div class="chart-wrapper">
            <DayIPChange />
          </div>
        </el-col>
        <el-col :xs="36" :sm="36" :lg="12">
          <div class="chart-wrapper">
            <DomainChange />
          </div>
        </el-col>
        
      </el-row>
      

    
    <div><el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :pie-data="pieData.attackIp" :key="componentKey"   id="attackIpChart"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :pie-data="pieData.victimIp" id="victimIpChart"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :pie-data="pieData.victimPort" id="victimPortChart"/>
          </div>
        </el-col>
      </el-row>
    </div>
      

          <div class="chart-wrapper">
            <Stability  />
          </div>
        
          <div class="chart-wrapper">
            <BarChart  />
          </div>
          <div class="chart-wrapper">
            <Mode  />
          </div>
        
    

        <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <DomainTop10  />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <DoqDomainTop10  />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <DotDomainTop10  />
          </div>
        </el-col>
      </el-row>
  
      


    
     
        <Vps/>
     
    
  
  
    
    </div>
  </template>

<script>
// import PanelGroup from './components3/PanelGroup'
import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'

import BarChart from './components/BarChart'

import map1 from './components/map1'
// import HeteGraph from "./components/HeteGraph";
import LineChartF1 from "./components/LineChartF1";
import DayIPChange from './components/DayIPChange';
import DomainChange from './components/DomainChange';
import Vps from './components/Vps';
import Mode from './components/Mode';
import DomainTop10 from './components/DomainTop10';
import DoqDomainTop10 from './components/DoqDomainTop10';
import DotDomainTop10 from './components/DotDomainTop10';
import Stability from './components/Stability';






export default {
  components: {
    Vps,
    Mode,
    DoqDomainTop10,
   
    LineChart,
    BarChart,
    map1,
    DayIPChange,
    DomainTop10,
    DotDomainTop10,

    DomainChange,
    Stability,
  
    PieChart,
  
    LineChartF1,
  },
  data() {
    return {
      componentKey:0,
    
      
      
      
    }
  },
  methods: {
    
    

  },

 
    
  beforeDestroy(){
    console.log('destroying');
  },
  beforeRouteLeave(to, from, next) {
    console.log("leaving");
    this.$destroy();
    next()
  },
}
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
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