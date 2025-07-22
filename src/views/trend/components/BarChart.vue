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
      default: '350px'
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
                    text: '访问稳定性',
                    textStyle: {
                    fontWeight: 'bold'
                    }
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    top: 'top'
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
                    data: ['DOH', 'DOQ', 'DOT'],
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
                    name: 'high',
                    type: 'bar',
                    barWidth: '60%',
                    data: [],
                    stack:'doh',
                    color:"#ffc0cb",
                    label: {
                        show: true
                        
                      },
                    
                    
                    },
                    {
                    name: 'middle',
                    type: 'bar',
                    barWidth: '60%',
                    data: [],
                    stack:'doh',
                    label: {
                        show: true
                      },
                    color:'#5470c6'

                    },
                    {
                    name: 'low',
                    type: 'bar',
                    barWidth: '60%',
                    data: [],
                    stack:'doh',
                    label: {
                        show: true
                      },
                    color:'#91cc75'

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
          const dohresponse = await axios.get('http://localhost:9292/getDohStability');
          const dotresponse = await axios.get('http://localhost:9292/getDoqStability');
          const doqresponse = await axios.get('http://localhost:9292/getDotStability');
          // const dohData=dohresponse.data;
          this.dohResult=this.classifyData(dohresponse.data);
          this.doqResult=this.classifyData(doqresponse.data);
          this.dotResult=this.classifyData(dotresponse.data);

          // console.log(doqresponse.data);
          // console.log(this.doqResult);
          this.data1.push(this.dohResult.low);
          this.data1.push(this.doqResult.low);
          this.data1.push(this.dotResult.low);


          this.data2.push(this.dohResult.middle);
          this.data2.push(this.doqResult.middle);
          this.data2.push(this.dotResult.middle);



          this.data3.push(this.dohResult.high);
          this.data3.push(this.doqResult.high);
          this.data3.push(this.dotResult.high);
          // console.log(this.data1);
          // console.log(this.data2);
          this.option.series[0].data=this.data1;
          this.option.series[1].data=this.data2;
          this.option.series[2].data=this.data3;
          
          
          
          chart.setOption(this.option);
          


        },
        classifyData(data) {
          const thresholds = {
                    low: 50,
                    high: 2000
                };
            const { low: lowThreshold, high: highThreshold } = thresholds;
            const result = {
                low: 0,
                middle: 0,
                high: 0
            };

            data.forEach((number) => {
                if (number < lowThreshold) {
                    result.low++;
                } else if (number >= lowThreshold && number < highThreshold) {
                    result.middle++;
                } else {
                    result.high++;
                }
            });

            var sum=result.low+result.middle+result.high;
            result.low=(result.low/sum).toFixed(3);
            result.middle=(result.middle/sum).toFixed(3);
            result.high=(result.high/sum).toFixed(3);

            return result;
        }
      },



}

</script>