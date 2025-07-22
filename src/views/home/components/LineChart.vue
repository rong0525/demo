<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '650px'
    },
    height: {
      type: String,
      default: '450px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ hostdata, alertdata } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 5,
          right: 5,
          bottom: 5,
          top: 5,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: [
                {
                    type: 'value',
                    nameTextStyle: {
                        color: "#FFFFFF",
                    },
                    min: 0,
                    max: 160,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
            ],
        legend: {
          data: ['主机','告警' ]
        },
        series: [
          {
          name: '主机', 
          itemStyle: {
            normal: {
              color: '#67C23A',
              lineStyle: {
                color: '#67C23A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: hostdata,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '告警', 
          itemStyle: {
            normal: {
              color: '#E6A23C',
              lineStyle: {
                color: '#E6A23C',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: alertdata,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }
        ]
      })
    }
  }
}
</script>
