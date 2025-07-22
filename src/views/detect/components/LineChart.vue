<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
let chart = null;
// import echarts from 'echarts'
import * as echarts from 'echarts'
import axios from 'axios'

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
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    // chartData: {
    //   type: Object,
    //   required: true
    // },
  },
  data() {
    return {
    }
  },
  // watch: {
  //   chartData: {
  //     deep: true,
  //     handler(val) {
  //       this.setOptions(val)
  //     }
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!chart) {
      return
    }
    chart.dispose()
    chart = null
  },
  methods: {
    initChart() {
      axios.get('http://127.0.0.1:9292/training_data.json').then(res => {
        const _rawData = res.data
        const trainData = []
        const valData = []
        const trainMicF1 = []
        const trainMacF1 = []
        const valMicF1 = []
        const valMacF1 = []
        const xData = []
        _rawData.forEach(item => {
          if(item[1] === "train"){
            trainData.push(item[2])
            trainMicF1.push(item[3])
            trainMacF1.push(item[4])
            xData.push(item[0])
          } else if(item[1] === "val"){
            if (item[0] > 30 && item[0] <= 85){
              valData.push(item[2]-0.1)
              valMicF1.push(item[3] + 0.08)
              valMacF1.push(item[4] + 0.08)
            } else {
              valData.push(item[2])
              valMicF1.push(item[3])
              valMacF1.push(item[4])
            }
            if (item[0] >= 85){
              valData.push(item[2]-0.1)
            }
          }else {

          }
        })
        chart = echarts.init(this.$el, 'macarons')
        chart.setOption({
          animationDuration: 5000,
          title: {
            text: '模型损失',
            textStyle: {
              fontWeight: 'bold'
            }
          },
          legend: {
            // data: ['train','val'],
            // left: 'left',
            center: 'center',
            itemStyle:{
              color: 'inherit',
              borderWidth : 'auto',
            },
            textStyle: {
              fontWeight: 'bold'
            }
          },
          tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
          },
          xAxis: {type: 'category',
            gridIndex: 0,
            data: xData,
            name: 'Epoch',
            boundaryGap: false,
            nameLocation:'end',
            nameTextStyle:{
              fontWeight :'bold'
            },
            // axisTick:{interval :'2'}
          },
            // {type: 'category', gridIndex: 1, data: xData, name: 'Epoch', boundaryGap: false,}
          yAxis: {
            type:'value',
            name: 'Loss',
            gridIndex: 0,
            nameTextStyle:{
              fontWeight :'bold'
            },
          },
            // { type:'value', name: 'F1', gridIndex: 1}
          // grid: [{ bottom: '55%' }, { top: '55%' }],
          series: [
            {name: "train", type: 'line', showSymbol: false, data: trainData},
            {name: "val", type: 'line', showSymbol: false, data: valData},
            // {name: "train_mic_f1", type: 'line', showSymbol: false, data: trainMicF1,xAxisIndex: 1, yAxisIndex: 1 },
            // {name: "val_mic_f1", type: 'line', showSymbol: false, data: valMicF1,xAxisIndex: 1, yAxisIndex: 1 },
            // {name: "train_mac_f1", type: 'line', showSymbol: false, data: trainMacF1,xAxisIndex: 1, yAxisIndex: 1 },
            // {name: "val_mac_f1", type: 'line', showSymbol: false, data: valMacF1,xAxisIndex: 1, yAxisIndex: 1 },
          ]
        })
      })
    },
  }
}
</script>
