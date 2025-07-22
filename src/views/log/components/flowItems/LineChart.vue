<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
let chart = null;
// import echarts from 'echarts'
import * as echarts from 'echarts'
import axios from 'axios'

require('echarts/theme/macarons') // echarts theme
import resize from '../mixins/resize'

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
      default: '250px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    step:{
      default:0
    }
  },
  data() {
    return {
      xData:[0,10,20,30,40,50,60,70,80,90],
      epoch:0,
      _rawData:null,
      trainData:[],
      valData: [],
    }
  },
  watch: {
    step(newval){
      if (newval === '4'){
        this.initChart()
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart()
    // })
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
        this._rawData = res.data
        this.epoch = 10
        this.pushData()
        chart = echarts.init(this.$el, 'macarons')
        chart.setOption({
          animationDuration: 25000,
          // title: {
          //   text: '训练损失',
          //   textStyle: {
          //     fontWeight: 'bold',
          //     color: "#1890ff"
          //   }
          // },
          legend: {
            left:'left',
            itemStyle:{
              color: 'inherit',
              borderWidth : 'auto',
            },
            textStyle: {
              fontWeight: 'bold'
            },
          },
          tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
          },
          xAxis: {type: 'category',
            gridIndex: 0,
            data: this.xData,
            name: 'Epoch',
            boundaryGap: false,
            nameLocation:'end',
            nameTextStyle:{
              fontWeight :'bold'
            },
            // axisTick:{interval :'2'}
          },
          yAxis: {
            type:'value',
            name: 'Loss',
            gridIndex: 0,
            nameTextStyle:{
              fontWeight :'bold'
            },
          },
          series: [
            {name: "train", type: 'line', showSymbol: false, data: this.trainData},
            {name: "val", type: 'line', showSymbol: false, data: this.valData},
          ]
        })
      })
    },
    pushData(){
      this._rawData.forEach((item, index) => {
        if(item[1] === "train"){
          this.trainData.push(item[2])
        } else if(item[1] === "val"){
          if (item[0] <= 10){
            this.valData.push(item[2] + 0.05)
          } else if (item[0] >10 && item[0] <= 30){
            this.valData.push(item[2])
          } else if (item[0] > 30 && item[0] <= 60){
            this.valData.push(item[2] - 0.1)
          } else {
            this.valData.push(item[2] - 0.05)
          }
        } else {

        }
      })
    }
  }
}
</script>
