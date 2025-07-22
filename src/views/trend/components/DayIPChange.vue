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
      
      
      option:{
          animationDuration: 5000,
          title: {
            text: 'IP迁移趋势图',
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
            name: '年-周',
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

      //获取周的日期
        getRecentWeeks() {
        const weeks = [];
        const currentDate = new Date();
        for (let i = 6; i >= 0; i--) {
            const weekStart = new Date(currentDate);
            weekStart.setDate(currentDate.getDate() - (currentDate.getDay() + (7 * i)));
            const year = weekStart.getFullYear();
            const weekNum = Math.ceil((weekStart.getDate() - 1 + (weekStart.getMonth() * 30.44)) / 7) + 1;
            weeks.push(`${year}-${weekNum}`);
        }
        return weeks;
    },
    getTrend(){
      
      

      // const weekDates = this.getLastWeekDates();
      axios.get(`http://localhost:9292/getIpChange`) 
        .then(response => {
        // console.log(response);
        //排序日期
      const sdata=response.data.sort((a, b) => {
            return a.date.localeCompare(b.date);
        });
      this.option.series[0].data=this.turndata(sdata);
      chart.setOption(this.option)
    });
    axios.get(`http://localhost:9292/getDoqIpChange`) 
        .then(response => {
        // console.log(response);
        //排序日期
      const sdata=response.data.sort((a, b) => {
            return a.date.localeCompare(b.date);
        });
      this.option.series[1].data=this.turndata(sdata);
      chart.setOption(this.option)
    });
    axios.get(`http://localhost:9292/getDotIpChange`) 
        .then(response => {
        // console.log(response);
        //排序日期
      const sdata=response.data.sort((a, b) => {
            return a.date.localeCompare(b.date);
        });
      this.option.series[2].data=this.turndata(sdata);
      chart.setOption(this.option)
    });
   

    },
    turndata(sdata){
      const result=[];  
      const lastData = sdata.slice(-56);
     
      // console.log(lastData);

      for (let i = 0; i < lastData.length; i += 7) {
          let sum = 0;
          // 取当前组的七个元素并计算总和
          for (let j = i; j < i + 7 && j < lastData.length; j++) {
            // console.log(lastData[j].count);
            sum += lastData[j].count;
          }
          // 将当前和加入结果数组
          result.push(sum);
        }
        // console.log(result);
      for(let i=result.length-1;i<6;i++){
        result.push(0);
      };
      return result.reverse();

    },
        

    initChart() {
      
      this.option.xAxis.data=this.getRecentWeeks();

      
      chart = echarts.init(this.$el, 'macarons');
        
      chart.setOption(this.option)
      

     
      
    },
  }
}
</script>
