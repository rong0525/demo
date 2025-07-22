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
    }
  },
  data() {
    return {
      xdata:[],
      dohTrend:[],
      option:{
          animationDuration: 5000,
          title: {
            text: '每日变化趋势图',
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
            {name: "DOH", type: 'line', showSymbol: false, data: []},
            {name: "DOQ", type: 'line', showSymbol: false, data: []},
            {name: "DOT", type: 'line', showSymbol: false, data: []},
            // {name: "train_mic_f1", type: 'line', showSymbol: false, data: trainMicF1,xAxisIndex: 1, yAxisIndex: 1 },
            // {name: "val_mic_f1", type: 'line', showSymbol: false, data: valMicF1,xAxisIndex: 1, yAxisIndex: 1 },
            // {name: "train_mac_f1", type: 'line', showSymbol: false, data: trainMacF1,xAxisIndex: 1, yAxisIndex: 1 },
            // {name: "val_mac_f1", type: 'line', showSymbol: false, data: valMacF1,xAxisIndex: 1, yAxisIndex: 1 },
          ]
        }

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
      let tdata;
      

      // const weekDates = this.getLastWeekDates();
      axios.get(`http://localhost:9292/getDohChange`) 
        .then(response => {
          // tdata=this.turnData(response)
          // console.log(tdata)
      this.option.series[0].data=this.turnData(response)
      for(let i=0;i<7;i++){
        this.option.series[0].data[i]=Math.floor(this.option.series[0].data[i]*3.94410224823)
      }
      
      chart.setOption(this.option)
      });
      axios.get(`http://localhost:9292/getDotChange`) 
        .then(response => {
      this.option.series[2].data=this.turnData(response)
      for(let i=0;i<7;i++){
        this.option.series[2].data[i]=Math.floor(this.option.series[2].data[i]*2.7499672)
      }
      chart.setOption(this.option)
      });
      axios.get(`http://localhost:9292/getDoqChange`) 
        .then(response => {
      this.option.series[1].data=this.turnData(response)
      // console.log(this.option.series[1].data)
      for(let i=0;i<7;i++){
        // console.log(this.option.series[1].data[i])
        this.option.series[1].data[i]=Math.floor(this.option.series[1].data[i]*4.4195250659631)
        
      }
      chart.setOption(this.option)
      });

    },
    
     
    turnData(response){
      const sdata=response.data.sort((a, b) => {
            return a.date.localeCompare(b.date);
        });
      let sum = 0;
      for (let i = 0; i < sdata.length; i++) {
        sum += sdata[i].count;
      };

      


      const trendData=[]
      const sumData=[]
      const lastSevenData = sdata.slice(-7);
      // let dohTrend = [];
      // console.log(lastSevenData);
      for (let i = 0; i < 7; i++) {
        if(i<lastSevenData.length){
          // const diff = lastSevenData[i + 1].count - lastSevenData[i].count;
          trendData.push(lastSevenData[i].count);
          
        }
        else{
          trendData.push(0);
        }
      }
      // console.log(trendData)
      let result = [];
      result.push(sum)
      for (let numElements = 1; numElements <= 6; numElements++) {
          let partialSum = trendData.slice(0, numElements).reduce((acc, cur) => acc + cur, 0);
          result.push(sum-partialSum);
      }
      // console.log(result)
      return result.reverse() 

    },
 

        

    initChart() {
      this.option.xAxis.data= this.getLastWeekDates();

        chart = echarts.init(this.$el, 'macarons');
        chart.setOption(this.option)
    
    
    },
  }
}
</script>
