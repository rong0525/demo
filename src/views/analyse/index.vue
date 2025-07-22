<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col :span="12">
        <div class="chart-wrapper">
         <pie-chart id="attackIpChart" :pie-data="pieData.attackIp" style="margin-top:20px;margin-left:60px"/>
         <el-button type="primary" style="margin-top:20px;margin-left:200px" @click="toPage">Windows环境</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <pie-chart id="attackIpChart_L" :pie-data="pieData.attackIp_L" style="margin-top:20px;margin-left:60px"/>
           <el-button type="primary" style="margin-top:20px;margin-left:250px" >Linux环境</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import axios from 'axios'

export default {
  name: 'Analyse',
  components: {
    PieChart,
  },
  data() {
    return {
      pieData: {
        'attackIp': {
          title: '不同类型节点占比',
          data: [
            { value: 803, name: 'process' },
            { value: 605, name: 'file' },
            { value: 484, name: 'IP' },
            { value: 387, name: 'regedit' },
            { value: 380, name: 'domain' },
            { value: 280, name: 'clipboard' },
          ],
          domId: 'attackIpChart',
          seriesName: '攻击ip——历史攻击次数(百分比)'
        },
        'attackIp_L': {
          title: '不同类型节点占比',
          data: [
            { value: 803, name: 'process' },
            { value: 605, name: 'file' },
            { value: 484, name: 'thread' },
            { value: 387, name: 'MAP_ANONYMOUS' },
            { value: 380, name: 'NA' },
            { value: 280, name: 'stdin' },
            { value: 380, name: 'stdout' },
            { value: 280, name: 'stderr' },
          ],
          domId: 'attackIpChart_L',
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
    toPage() {
      this.$router.push({ path: '/analysenode/windows' })
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
  padding: 40px;
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
    margin-bottom: 50px;
    height:500px
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
