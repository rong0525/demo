<template>
    <div :class="className" :style="{height:height,width:width}"/>
  </template>

<script>
let chart = null;
import * as echarts from 'echarts'
import axios from 'axios'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default{
    name:"BarChart",
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
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    
  },


    data(){
      return{
        option:{
                title: {
                    text: '请求内容分析',
                    textStyle: {
                    fontWeight: 'bold'
                    }
                },
                
                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                    type: 'category',
                    data: [],
                    axisLabel:{
                      rotate: 40,

                    },
                    
                    // name:'国家',
                    // nameLocation:'end',
                    axisTick: {
                        alignWithLabel: true
                    }
                    }
                ],
                yAxis: [
                    {
                    type: 'value'

                    }
                ],
                series: [
                    {
                    
                    type: 'bar',
                    barWidth: '60%',
                    data: [],
                    
                    color:"#ffc0cb",
                    label: {
                        show: true
                        
                      },
                    
                    
                    },
                    
                    
                ]
                },
          dohResult:{
              low: 0,
              middle: 0,
              high: 0
          },
          doqResult:{
              low: 0,
              middle: 0,
              high: 0
          },
          dotResult:{
              low: 0,
              middle: 0,
              high: 0
          },
          data1:[],
          data2:[],
          data3:[]

      }

    },
    created(){
      this.getData();

    },

    mounted(){
        this.initChart()

    },
    methods:{
        initChart(){
            chart = echarts.init(this.$el, 'macarons')
            chart.setOption(this.option);
        },
    
        async getData(){
          const response = await axios.get('http://localhost:9292/getMode');
          const type=[]
          const number=[]
          response.data.forEach((modeData) =>{
            type.push(modeData.mode)
            number.push(modeData.num)

          });
          
          this.option.xAxis[0].data=type;
          // console.log(this.option.xAxis[0].data)
          this.option.series[0].data=number;
          chart.setOption(this.option);
 

        },
        
      },



}

</script>