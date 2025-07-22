<template>
  <div id="my-pie-chart" :class="className" :style="{height:height, width:width}"></div>
</template>

<script>
let chart= null;
import * as echarts from 'echarts';
import resize from './mixins/resize'
require('echarts/theme/macarons') // echarts theme
export default {
    name: "PieChart",
    mixins: [resize],
    props: {
        pieData: {
            type: Object,
            default: {
                title: "",
                data: [],
                domId: "",
                seriesName: "",
            }
        },
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '400px'
        },
        height: {
            type: String,
            default: '400px'
        }
    },
    data() {
        return {
            chart: null,
            myChartStyle: { float: "left", width: "100%", height: "300px" },
            total: 0,
        }
    },
    mounted() {
        this.initEcharts();
    },
    beforeDestroy() {
        if (!chart) {
            return
        }
        // this.chart.dispose()
        chart.clear()
        // this.chart = null
    },
    methods: {
        initEcharts() {
            const option = {
                title: {
                    text: this.pieData.title,
                    // left: 'center',
                    textStyle: {
                        fontWeight: 'bold',
                        color: '#008acd',
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: '{a}<br/>{b}——{c}({d}%)',
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    top: 'bottom'
                },
                "color": [
                    "#5470c6",
                    "#91cc75",
                    "#fac858",
                    "#ee6666",
                    "#73c0de",
                    "#3ba272",
                    "#fc8452",
                    "#9a60b4",
                    "#ea7ccc"
                ],
                series: [
                    {
                        name: this.pieData.seriesName,
                        type: 'pie',
                        // radius: '50%',
                        data: this.pieData.data,
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        roseType: 'radius',
                        radius: [10, 90],
                        center: ['50%', '45%'],
                        // itemStyle: {
                        //     borderRadius: 8
                        // },
                        label: {
                            show: true,
                            position: 'outside'
                        },
                        labelLine: {
                            show: true,
                            length: 7,
                            length2: 7,
                        },
                    }
                ],
                animationDuration: 1000,
            };
            chart = echarts.init(document.getElementById(this.pieData.domId), "macarons");
            chart.setOption(option);
                window.addEventListener("resize", () => {
                chart.resize();
            });
        }
    },
    watch: {
        pieData: {
            immediate: true,
            handler(n) {
                var count = 0
                if (n.data.length !=0){
                    for (let num of n.data) {
                        count += num["value"]
                    }
                }
                this.total = count;
            }
        }
    }

}
</script>

<style>

</style>