<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { fetchFlowCount } from '@/views/data-sum-re/database/db.ts'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '285%'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      inFlowCount: 0,
      outFlowCount: 0
    }
  },
  mounted() {
    fetchFlowCount().then(res => {
      this.inFlowCount = res.inflowCount
      this.outFlowCount = res.outflowCount
      this.$nextTick(() => {
        this.initChart()
      })
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
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 'bottom',
          padding: [0, 0, 0, 0],
          data: ['流入', '流出']
        },
        series: [
          {
            name: '流量占比图',
            type: 'pie',
            radius: [75, 115],
            center: ['50%', '45%'],
            data: [
              { value: this.inFlowCount, name: '流入' },
              { value: this.outFlowCount, name: '流出' }
            ],
            label: {
              formatter: '{b}\n{d}%'
            },
            labelLine: {
              normal: {
                length: 8,
                length2: 8
              }
            },
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
