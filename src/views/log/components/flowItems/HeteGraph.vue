<template>

  <div :id="id" :class="className" style="width: 60%; height: 300px" />
</template>

<script>
import echarts from 'echarts'
import resize from '../mixins/resize'
// import resize from './mixins'
import axios from 'axios'
let chart = null
const id = 0
const urlList = [
  'http://127.0.0.1:9292/train_graph_data/train_graph_data_0.json/',
  'http://127.0.0.1:9292/train_graph_data/train_graph_data_2.json/',
  'http://127.0.0.1:9292/train_graph_data/train_graph_data_1.json/',
  'http://127.0.0.1:9292/train_graph_data/train_graph_data_3.json/',
  'http://127.0.0.1:9292/train_graph_data/train_graph_data_4.json/',
  'http://127.0.0.1:9292/train_graph_data/train_graph_data_5.json/'
]

export default {
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
    step: {
      default: 0
    },
    isOriginal: {
      default: false
    }
  },
  data() {
    return {
      graph: null,
      epoch: 0,
      timer: null
    }
  },
  watch: {
    step(newval) {
      if (newval === '3' && this.isOriginal === true) {
        this.loadData(urlList[0])
      }
      if (newval === '4' && this.isOriginal === false) {
        // this.loadData(urlList[0])
        this.epoch = 0
        this.loadData(urlList[this.epoch])
        this.epoch = this.epoch + 1
        this.timer = setInterval(() => {
          if (this.epoch <= 5) {
            this.loadData(urlList[this.epoch])
            this.epoch = this.epoch + 1
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 3500)
      }
    }
  },
  created() {
    // this.loadData(urlList[0])
  },
  beforeDestroy() {
    if (!chart) {
      return
    }
    chart.dispose()
    chart = null
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    loadData(url) {
      axios.get(url)
        .then(res => {
          this.graph = res.data
          this.initChart()
        })
    },
    initChart() {
      chart = echarts.init(document.getElementById(this.id), 'macarons')
      chart.setOption({
        tooltip: {},
        // title: {
        //   text: 'GraphSage和IDGL迭代构建图',
        //   textStyle: {
        //     fontWeight: 'bold',
        //     color: "#1890ff"
        //   }
        // },
        legend: [
          {
            data: this.graph.categories.map(function(a) {
              return a.name
            }),
            formatter: function(name) {
              if (name === 'normal') {
                return '正常加密流量'
              } else {
                return '恶意加密流量'
              }
            },
            top: 'top',
            left: 'left',
            orient: 'vertical'
          }
        ],
        animationDuration: 500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            data: this.graph.nodes,
            links: this.graph.links,
            categories: this.graph.categories,
            roam: true,
            label: {
              position: 'right'
              // formatter: '{c}'
            },
            color: ['#5470c6', '#ee6666', '#91cc75', '#fac858'],
            // color:['#588dd5', '#c05050', '#ffb980'],
            // force: {
            //   // edgeLength: 10,
            //   repulsion: 10,
            //   // gravity: 0.1
            // },
            lineStyle: {
              // color: 'source',
              // curveness: 0.1
            },
            scaleLimit: {
              min: 0.45,
              max: 0.45
            }
            // emphasis: {
            //   focus: 'adjacency',
            //   lineStyle: {
            //     width: 10
            //   }
            // }
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

