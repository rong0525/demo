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
      default: 0
    }
  },
  watch: {
    step(newval){
      if (newval === '4'){
        this.initChart()
      }
    }
  },
  data() {
    return {
      _rawData:null,
      trainMicF1:[],
      trainMacF1:[],
      valMicF1:[],
      valMacF1:[],
      xData:[0,10,20,30,40,50,60,70,80,90],
      epoch:0,
    }
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
          legend: {
            left:'left',
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
          xAxis: {
            type: 'category',
            data: this.xData,
            name: 'Epoch',
            boundaryGap: false,
            nameLocation:'end',
            nameTextStyle:{
              fontWeight :'bold'
            },
          },
          yAxis: {
            type:'value',
            name: 'F1_Score',
            nameTextStyle:{
              fontWeight :'bold'
            },
          },
          series: [
            {name: "train_mic_f1", type: 'line', showSymbol: false, data: this.trainMicF1,},
            {name: "val_mic_f1", type: 'line', showSymbol: false, data: this.valMicF1,},
            {name: "train_mac_f1", type: 'line', showSymbol: false, data: this.trainMacF1,},
            {name: "val_mac_f1", type: 'line', showSymbol: false, data: this.valMacF1,},
          ]
        })
      })
    },
    pushData(){
      this._rawData.forEach((item, index) => {
          if(item[1] === "train"){
            this.trainMicF1.push(item[3])
            this.trainMacF1.push(item[4])
          } else if(item[1] === "val"){
            this.valMicF1.push(item[3])
            this.valMacF1.push(item[4])
          } else {

          }
      })
    }
  }
}
</script>
