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
    name:"DomainTop10",
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
        topDomains: null,
        option : {
          title: {
            text: 'DOQ访问次数统计图',
            textStyle: {
              fontWeight: 'bold'
            }
          },
          dataset: {
            source: []
          },
          grid: { 
            containLabel: true,
            left: '1%',
           },
          xAxis: { name: '数量' },
          yAxis: { 
            type: 'category' ,
            triggerEvent: true,
            axisLabel: {
              
              rotate: 45, // 文字倾斜
               // 文字省略
              formatter: function (value) {
                if (value.length > 8) {
                  return `${value.slice(0, 8)}...`
                }
                return value
              },
            },



          },
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['热度'],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ['#65B581','#FFCE34', '#FD665F']
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'domain'
              }
            }
          ]
        }
       

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
    
        getData(){
          axios.get('/api/qscan/top10')
          .then(response => {
                this.topDomains = response.data.topDomains;
                this.processData();
                chart.setOption(this.option);
                this.extension(chart)
                
              })
          .catch(error => {
                console.error('请求出错：', error);
              });

        },
        processData() {
          if (this.topDomains) {
            let scores = [];
              for (let i = 10; i <= 100; i += 10) {
                  scores.push(i);
              }
            let totalOccurrences = 0;
            // 先计算总的occurrences数量，用于后续计算比例
            this.topDomains.forEach(item => {
              totalOccurrences += item.occurrences;
            });

            this.option.dataset.source.push(['score', 'amount', 'domain']);
            // 遍历topDomains数据进行转换
            this.topDomains.reverse().forEach((item,index) => {
              // const score = (item.occurrences / totalOccurrences * 100).toFixed(1);
              const score = index < scores.length? scores[index] : null; // 添加判断，避免越界

              const amount = item.occurrences;
              const product = item.serverdomain;
              this.option.dataset.source.push([score, amount, product]);
            });

            console.log('转换后的数据：', this.option.dataset.source);
            // 此时可以根据需求进一步使用self.source，比如在模板中展示等
          }
        },
        extension(chart) {
          // 注意这里，是以X轴显示内容过长为例，如果是y轴的话，需要把params.componentType == 'xAxis'改为yAxis
          // 判断是否创建过div框,如果创建过就不再创建了
          // 该div用来盛放文本显示内容的，方便对其悬浮位置进行处理
          var elementDiv = document.getElementById('extension')
          if (!elementDiv) {
            
            var div = document.createElement('div')
            div.setAttribute('id', 'extension')
            div.style.display = 'block'
            document.querySelector('html').appendChild(div)
          }
          chart.on('mouseover', function (params) {
            if (params.componentType == 'yAxis') {
              var elementDiv = document.querySelector('#extension')
              //设置悬浮文本的位置以及样式
              var elementStyle =
                'position: absolute;z-index: 99999;color: #fff;font-size: 12px;padding: 5px;display: inline;border-radius: 4px;background-color: #303133;box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px'
              elementDiv.style.cssText = elementStyle
              elementDiv.innerHTML = params.value
              document.querySelector('html').onmousemove = function (event) {
                var elementDiv = document.querySelector('#extension')
                var xx = event.pageX - 10
                var yy = event.pageY + 15
                // console.log('22', xx)
                elementDiv.style.top = yy + 'px'
                elementDiv.style.left = xx + 'px'
              }
            }
          })
          chart.on('mouseout', function (params) {
            //注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
            if (params.componentType == 'yAxis') {
              var elementDiv = document.querySelector('#extension')

              elementDiv.style.cssText = 'display:none'
            }
          })
        },

        
      },



}

</script>