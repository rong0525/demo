<template>
  <div class="dashboard-editor-container">
    <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="toHostlist">返回</el-button>
    <el-row :gutter="16">
      <el-col :xs="48" :sm="48" :lg="16">
        <div class="chart-wrapper">
          <LogTable />
          <!-- <line-chart :chart-data="lineChartData" /> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart id="attackIpChart" :pie-data="pieData.attackIp" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <!-- 这里放图 -->
          <sub-graph id="0" />
          <!-- <pie-chart id="attackIpChart" :pie-data="pieData.attackIp" /> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <sub-graph id="1" />
          <!-- <pie-chart id="victimIpChart" :pie-data="pieData.victimIp" /> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <sub-graph id="2" />
          <!-- <pie-chart id="victimPortChart" :pie-data="pieData.victimPort" /> -->
        </div>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <line-chart-f1 :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row> -->

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <transaction-table />
    </el-row> -->
  </div>
</template>

<script>
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

import SubGraph from '@/views/analyse/components/SubGraph'
import LogTable from '@/views/analyse/components/LogTable'
import axios from 'axios'
// import LineChartF1 from '@/views/home/components/LineChartF1'
// import FamilyGraph from '@/views/home/components/FamilyGraph'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Analyse',
  components: {
    PieChart,
    SubGraph,
    LogTable
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      pieData: {
        'attackIp': {
          title: '不同类型节点占比',
          data: [
            { value: 803, name: 'process' },
            { value: 605, name: 'file' },
            { value: 484, name: 'IP' },
            { value: 387, name: 'regedit' },
            { value: 380, name: 'NA' },
            { value: 380, name: 'domain' },
            { value: 280, name: 'clipboard' },
          ],
          domId: 'attackIpChart',
          seriesName: '攻击ip——历史攻击次数(百分比)'
        },
        'victimIp': {
          title: '被攻击者ip分布',
          data: [
            { value: 805, name: '192.168.0.1' },
            { value: 714, name: '10.0.0.3' },
            { value: 607, name: '192.168.0.2' },
            { value: 488, name: '10.0.0.2' },
            { value: 399, name: '192.168.0.4' },
            { value: 224, name: '192.168.0.3' }
          ],
          domId: 'victimIpChart',
          seriesName: '被攻击ip——历史被攻击次数(百分比)'
        },
        'victimPort': {
          title: '被攻击者端口分布',
          data: [
            { value: 782, name: '137' },
            { value: 624, name: '138' },
            { value: 588, name: '8080' },
            { value: 513, name: '445' },
            { value: 458, name: '20' },
            { value: 395, name: '21' }
          ],
          domId: 'victimPortChart',
          seriesName: '被攻击端口——历史被攻击次数(百分比)'
        }
      }
    }
  },
  beforeDestroy() {
    console.log('destroying')
  },
  methods: {
    toHostlist(){
        this.$router.push({ path: '/analyse/index' })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    loadData() {
      axios.get('/les-miserables.json')
        .then(res => {
          this.graData.graph0.data = res.data
          // console.log(this.graData.graph0.data)
        })
      axios.get('/les-miserables1.json')
        .then(res => {
          this.graData.graph1.data = res.data
          // console.log(res)
        })
      axios.get('/les-miserables2.json')
        .then(res => {
          this.graData.graph2.data = res.data
          // console.log(res)
        })
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('leaving')
    this.$destroy()
    next()
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
