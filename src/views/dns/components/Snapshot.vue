<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/views/analyse/components/mixins/resize'
import axios from 'axios'
let chart = null

export default {
  name: 'Snapshot',
  inject: ['reload'], // 注入依赖
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
    }
  },
  created() {
    this.loadData()
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
        axios.get('/graph1.json')
          .then(res => {
            this.graph = res.data
            // console.log(this.graph)
            this.initChart()
          })
      } else if (this.id === '1') {
        axios.get('/graph2.json')
          .then(res => {
            this.graph = res.data
            // console.log(this.graph)
            this.initChart()
          })
      } else if (this.id === '2') {
        axios.get('/graph3.json')
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
          text: '时间窗口' + this.id,
          //subtext: 'Default layout',
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

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 10px 10px 10px;
    margin-bottom: 20px;
  }

}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
