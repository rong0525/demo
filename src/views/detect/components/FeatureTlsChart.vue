<template>
  <div :class="className" :style="{height:height,width:width}">
  </div>

</template>

<script>
let chart = null;
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import axios from 'axios'
// import getTlsData from "@/api/feature.js"

export default {
  name: "FeatureTlsChart",
  props:{
    className: {
      type: String,
      default: 'tlsChartClass'
    },
    tlsChartId: {
      type: String,
      default: "tlsChartId",
    },
    pcapName: {
      type: String,
      default: "sslcapture-new-Windows-7-Full.pcap.TCP_10-0-2-15_49337_216-58-201-101_443",
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
  },
  data() {
    return {
      tlsData: [[0,0],[0,1] ,[1,1], [1,0],[1,-1],[1.5,-1],[1.5,0]],
      option: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            // name: 'Step Start',
            type: 'line',
            step: 'start',
            // data: [[0,0],[0,1] ,[1,1], [1,0],[1,-1],[1.5,-1],[1.5,0]]
            data: this.tlsData,
            areaStyle: {}
          }
        ]
      }
    }
  },
  created() {
    // this.fetchTlsData()
  },
  mounted() {
    this.$nextTick(() => {
        // this.fetchTlsData()

        // dom元素更新后执行
        // this.initChart()
        this.fetchTlsData()

    })
  },
  methods:{
    initChart() {
      // console.log("this.tlsData", this.option.series[0].data);
      chart = echarts.init(document.getElementById(this.tlsChartId))
      chart.setOption(this.option)
    },
    fetchTlsData() {
      axios.get('http://127.0.0.1:9292/tls_features/' + this.pcapName + '.pcap-tls.json').then(
        res=>{
          // console.log("res", res);
          this.tlsData = res.data.data;
        }
      )
    }
  },
  watch: {
    tlsData:{
      handler(n){
        this.option.series[0].data = n;
        this.initChart()
      }
    }
  }
}
</script>

<style scoped>

</style>
