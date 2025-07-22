<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import * as echarts from 'echarts'
import  axios from "axios";
import feature from '@/utils/feature'
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
      default: '400px'
    }
  },
  data() {
    return {
      option:{
              tooltip: {
          trigger: 'item'
                    },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'audio',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 104, name: '合规'},
              { value: 20, name: '不合规'}
            ]
          }
        ]
      },
      
    }
  },
  created(){
    this.getData()
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
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

      this.chart.setOption(this.option)
    },

    async getData(){
      const pictureResponse = await feature.get('/compliance/audio');
      console.log(pictureResponse)
      const chartData=[{value: pictureResponse.compliant, name: '合规' },
            {value: pictureResponse.nonCompliant, name: '不合规'  }]

      this.option.series[0].data=chartData
      // console.log(this.option.series.data)
      this.chart.setOption(this.option)
    }


  }
}
</script>
