<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { fetchCrossBorderDomainCount, fetchDomainUniqueCount } from '@/views/data-sum-re/database/db.ts'

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
      default: '150%'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      allDomainCount: 0,
      crossBorderDomainCount: 0,
      chart: null
    }
  },
  mounted() {
    fetchDomainUniqueCount().then(res => {
      this.allDomainCount = res
      // 通过嵌套保证串行
      fetchCrossBorderDomainCount().then(res => {
        this.crossBorderDomainCount = res
        this.$nextTick(() => {
          this.initChart()
        })
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
        title: {
          text: ((this.crossBorderDomainCount / this.allDomainCount).toFixed(2) * 100).toString() + '%',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '当前合规率',
            type: 'pie',
            radius: ['55%', '86%'],
            center: ['50%', '49%'],
            data: [
              { value: this.crossBorderDomainCount, name: '跨境域名' },
              { value: this.allDomainCount - this.crossBorderDomainCount, name: '非跨境域名' }
            ],
            label: {
              show: false
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
