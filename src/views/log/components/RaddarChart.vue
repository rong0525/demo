<template>
<!--  <div :class="className" :style="{height:height,width:width}">-->
<!--  <div style="height:250px ;width:100%">-->
<!--    <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 5px">任务进度</h5>-->
    <div :class="className" style="height:300px ;width:100%"/>
<!--  </div>-->

</template>

<script>
let chart = null;
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  name: "RaddarChart",
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
      default: '300px'
    },
    jobValue: {
      default: 0
    }
  },
  data() {
    return {
      value: 0
    }
  },
  watch: {
    jobValue(){
      this.initChart()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      // let value = 0;
      chart = echarts.init(this.$el, 'macarons')
      chart.setOption({
        // title: {
        //   text: '任务进度',
        //   left: 'left',
        //   color: 'rgb(46, 199, 201)'
        // },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            // startAngle: 180,
            // endAngle: 0,
            progress: {
              show: true,
              width: 15
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [1, "rgb(46, 199, 201)"],
                ]
              }
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
              }
            },
            detail: {
              formatter: '{value}' + '%',
              valueAnimation: true,
              fontSize: 30,
              offsetCenter: [0, '70%'],
            },
            data: [
              {
                value: this.jobValue,
                // name: 'SCORE'
              }
            ]
          }
        ],

      })
    }
  }
}
</script>
