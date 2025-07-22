<template>
  <el-row :gutter="16">
    <el-col :xs="48" :sm="48" :lg="16">
      <div :id="id" :class="className" :style="{ height: height, width: width }" />
    </el-col>
  </el-row>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
// import resize from './mixins'
import axios from 'axios'
let chart = null
export default {
  name: 'SubGraph',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      graph: null
      // data: []
    }
  },
  created() {
    this.loadData()
    // this.initChart()
    // this.test()
  },
  beforeDestroy() {
    if (chart) {
      return
    }
    // chart.dispose()
    chart.clear()
    // chart = null
  },
  methods: {
    loadData() {
      if (this.id === '0') {
        axios.get('/graph_a1.json')
          .then(res => {
            this.graph = res.data
            // console.log(this.graph)
            this.initChart()
          })
      } else if (this.id === '1') {
        axios.get('/graph_a2.json')
          .then(res => {
            this.graph = res.data
            // console.log(this.graph)
            this.initChart()
          })
      } else {
        axios.get('/graph_a3.json')
          .then(res => {
            this.graph = res.data
            // console.log(this.graph)
            this.initChart()
          })
      }
    },
    initChart() {
      // console.log(this.id)
      chart = echarts.init(document.getElementById(this.id), 'macarons')
      // this.handleData()
      chart.hideLoading()
      this.graph.nodes.forEach(function(node) {
        node.symbolSize = 10
      })
      chart.setOption({
        title: {
          text: '时间窗口' + this.id + '的子图',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'center',
        },
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: this.graph.categories.map(function(a) {
              return a.name
            })
          }
        ],
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: this.graph.nodes,
            links: this.graph.links,
            categories: this.graph.categories,
            roam: true,
            label: {
              position: 'right'
            },
            force: {
              repulsion: 1000
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

