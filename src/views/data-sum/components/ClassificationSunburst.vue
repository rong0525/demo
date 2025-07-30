<template>
  <div class="classification-sunburst">
    <div id="sunburstContainer" class="sunburst-container" />
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'ClassificationSunburst',
  data() {
    return {
      chartInstance: null,
      // 分类数据保持不变
      classificationData: [
        {
          name: '地理信息',
          children: [
            { name: '构图数据', value: 35 }, // 基础地图数据量大，占比最高
            { name: '点云数据', value: 28 }, // 三维建模数据量较大
            { name: '惯导数据', value: 15 }, // 设备传感器数据，中等规模
            { name: '位置数据', value: 22 } // 轨迹类数据，持续产生
          ]
        },
        {
          name: '个人信息',
          children: [
            { name: '身份信息', value: 12 }, // 结构化数据，量少但敏感
            { name: '人脸图像', value: 30 }, // 图像数据体积大
            { name: '生物特征', value: 8 }, // 特征向量数据量较小
            { name: '踪迹数据', value: 50 } // 持续产生的时序数据，总量最大
          ]
        },
        {
          name: '社会信息',
          children: [
            { name: '车流数据', value: 40 }, // 实时采集的大量时序数据
            { name: '充电网数据', value: 25 }, // 充电桩记录，中等数据量
            { name: '车牌图像', value: 20 }, // 图像数据，数量随车流量变化
            { name: '敏感区域数据', value: 15 } // 受限区域采集，数据量较少
          ]
        }
      ]
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.handleResize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handleResize)
      this.destroyChart()
    })
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('sunburstContainer')
      this.chartInstance = echarts.init(chartDom)

      // 定义大类主色
      const categoryColors = {
        '地理信息': '#28B17E', // 蓝色
        '个人信息': '#1F78D1', // 绿色
        '社会信息': '#3FA9A0' // 橙色
      }

      // 定义子类颜色（稍微透明）
      const subCategoryColors = {
        '构图数据': '#44C397',
        '点云数据': '#A6E5D2',
        '惯导数据': '#5FC2A0',
        '位置数据': '#9BE1C4',

        '身份信息': '#6BA9E5',
        '人脸图像': '#A0C9F0',
        '生物特征': '#4E98DC',
        '踪迹数据': '#B7DAF9',

        '车流数据': '#75D3CB',
        '充电网数据': '#A4E7E1',
        '车牌图像': '#62C0B6',
        '敏感区域数据': '#B7F0E7'
      }

      // 为原始数据添加 itemStyle.color
      const processedData = this.classificationData.map(category => {
        const parentColor = categoryColors[category.name]
        return {
          ...category,
          itemStyle: { color: parentColor },
          children: category.children.map(child => ({
            ...child,
            itemStyle: { color: subCategoryColors[child.name] }
          }))
        }
      })

      const option = {
        series: {
          type: 'sunburst',
          radius: [0, '85%'],
          center: ['50%', '50%'],
          data: processedData,

          levels: [
            {}, // root
            {
              r0: '15%',
              r: '45%'

            },
            {
              r0: '45%',
              r: '90%',

              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2
              }
            }
          ],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            show: true,
            position: 'inside', // 文字在圆环内部
            overflow: 'ellipsis', // 文字超出时显示省略号
            ellipsis: '...',
            rotate: 'radial', // 文字沿径向排列（贴合圆环弧度）
            textStyle: {
              color: '#000', // 黑色文字
              fontSize: 8, // 小字号（可根据圆环大小调整）
              fontWeight: 'normal' // 常规字重
            }
          }

        }
      }

      this.chartInstance.setOption(option)
    },

    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    },
    destroyChart() {
      if (this.chartInstance) {
        echarts.dispose(this.chartInstance)
        this.chartInstance = null
      }
    }
  }
}
</script>

<style scoped>
.classification-sunburst {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  min-height: 250px;
}

.sunburst-container {
  min-height: 250px;
}
</style>
