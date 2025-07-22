<template>
  <div id="HeteGraphId" :class="className" :style="{height:height,width:width}"/>
</template>


<script>
let chart= null;
import echarts from 'echarts'
import resize from './mixins/resize'
// import resize from './mixins'
import axios from 'axios'

export default {
  name: 'FamilyGraph',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
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
    }
  },
  data() {
    return {
      graph: null,
      // data: []
    }
  },
  created() {
    this.loadData()
    // this.initChart()
    // this.test()
  },
  mounted() {
    // this.initChart()
    // this.test()
  },
  beforeDestroy() {
    if (chart) {
      return
    }
    // chart.dispose()
    chart.clear()
    // chart = null
  },
  methods: {
    loadData() {
      axios.get('http://127.0.0.1:9292/graph')
        .then(res => {
          this.graph = res.data
          console.log(res);
          this.initChart()
        })
    },
    initChart() {
      chart = echarts.init(document.getElementById("HeteGraphId"), 'macarons')
      // this.handleData()
      chart.setOption({
        title: {
          text: '恶意软件关系图',
          textStyle: {
            fontWeight: 'bold'
          }
        },
        tooltip: {
          show: true,
          formatter: (param) => {
            console.log("param", param);
            var str = `<span>`
            if (param.dataType === "edge") {
                str += `边<br/>`
                str += `id: ${param.name}`
            }
            else if (param.dataType === "node") {
                str += `会话样本节点<br/>`
                if (param.data.category === 0){
                    var category = 'benign'
                } else {
                    var category = 'malicious'
                }
                str += `id: ${param.data.id}<br/>`
                str += `category: ${category}<br/>`
                // str += `client: ${param.data.value.ip}:${param.data.value.port}<br\>`
                // str += `server: ${param.data.value.server_ip}:${param.data.value.s_port}<br\>`
            }
            str += `</span>`
            return str;
          }
        },
        legend: [
          {
            data: this.graph.categories.map(function (a) {
              return a.name;
            }),
            formatter: function (name) {
              return name
            },
            top: '40px',
            left: '10px',
            orient: 'vertical',
          }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Relation Graph',
            type: 'graph',
            layout: 'force',
            data: this.graph.nodes,
            links: this.graph.links,
            categories: this.graph.categories,
            roam: true,
            label: {
              show: true,
              formatter: '',
            },
            "color": ["#fc97af", "#87f7cf", "#f7f494", "#72ccff", "#f7c5a0", "#d4a4eb"],
            force: {
              // edgeLength: 40,
              repulsion: 40,
              // gravity: 0.1
            },
            lineStyle: {
              // color: 'source',
              // curveness: 0.1
            },
            scaleLimit: {
              min: 0.45,
              max: 0.45
            },
            symbolSize: 12
            // emphasis: {
            //   focus: 'adjacency',
            //   lineStyle: {
            //     width: 10
            //   }
            // }
          }
        ]
      })
    },
    handleData(){
      this.graph.nodes.forEach(node => {
        // if(node.category === 0 || node.category === 1){
        //   node.x = parseInt(Math.random() * 1000);
        //   node.y = parseInt(Math.random() * 500);
        // }
        // if (node.category === 2){
        //   node.x = parseInt(Math.random() * 500);
        //   node.y = parseInt(Math.random() * 250);
        // }
        // if (node.category === 3){
        //   node.x = parseInt(Math.random() * 500 + 500);
        //   node.y = parseInt(Math.random() * 250 + 250);
        // }
        node.x = parseInt(Math.random() * 1000);
        node.y = parseInt(Math.random() * 400);
        node.symbolSize = 10;
        // node.x = parseInt(Math.random() * 500);
        // console.log(node.x);
        // node.y = parseInt(Math.random() * 500);
      })
    },
    test(){
      setInterval(() => {
        // this.data.push({
        //   id: this.data.length + ''
        // });
        this.data.push({
          id: this.graph.nodes[id] + ''
        });

        for (let i = 0; i < 5; i++){
          let source = Math.round((this.data.length - 1) * Math.random());
          let target = Math.round((this.data.length - 1) * Math.random());
          if (source !== target) {
            this.edges.push({
              source: source,
              target: target
            });
          }
        }
        chart.setOption({
          series: [
            {
              type: 'graph',
              layout: 'force',
              animation: false,
              force: {
                repulsion: 100,
                edgeLength: 5
              },
              roam: true,
              data: this.data,
              edges: this.edges
            }
          ]
        });
        console.log('nodes: ' + this.data.length);
        console.log('links: ' + this.edges.length);
      }, 200);
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

