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
import feature from '@/utils/feature'
export default {
  mixins: [resize],
  props: {
    
    className: {
      type: String,
      default: 'audio'
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
    }
  },
  data() {
    return {
      
      
      option:{
          animationDuration: 5000,
          title: {
            text: '近一周音频检测数据统计',
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
            data:[],
            name: '年-月-日',
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
            name: '数量',
            gridIndex: 0,
            nameTextStyle:{
              fontWeight :'bold'
            },
          },
            // { type:'value', name: 'F1', gridIndex: 1}
          // grid: [{ bottom: '55%' }, { top: '55%' }],
          series: [
            {name: "合规数量", type: 'line', showSymbol: false, data: [1,2,5,7]},
           
           
          ]
        }

    }
  },
  created(){
    this.getTrend();
  },
  
  
  mounted() {
    
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!chart) {
      return
    }
    // chart.dispose()
    // chart = null
    chart.clear()
  },
  methods: {

    getLastWeekDates() {
            let dates = [];
            let today = new Date();
            for (let i = 6; i >= 0; i--) {
                let date = new Date(today);
                date.setDate(today.getDate() - i);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);
                dates.push(`${year}-${month}-${day}`);
            }
            return dates;
        },

      
    getTrend(){
      
      

      // const weekDates = this.getLastWeekDates();
      feature.get('audio/last7days') 
        .then(res => {
          const dates = res.map(item => item.date);
  
          // 提取数量数组
          const counts = res.map(item => item.count);
        // console.log(response);
        //排序日期
        this.option.xAxis.data=dates;
        this.option.series[0].data=counts
        chart.setOption(this.option)
    });
    
   

    },
    
        

    initChart() {
      
      // this.option.xAxis.data=this.getLastWeekDates();

      
      chart = echarts.init(this.$el, 'macarons');
        
      chart.setOption(this.option)
      

     
      
    },
  }
}
</script>
