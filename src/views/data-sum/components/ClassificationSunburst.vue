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
            { name: '构图数据', value: 1 },
            { name: '点云数据', value: 1 },
            { name: '惯导数据', value: 1 },
            { name: '位置数据', value: 1 }
          ]
        },
        {
          name: '个人信息',
          children: [
            { name: '身份信息', value: 1 },
            { name: '人脸图像', value: 1 },
            { name: '生物特征', value: 1 },
            { name: '踪迹数据', value: 1 }
          ]
        },
        {
          name: '社会信息',
          children: [
            { name: '车流数据', value: 1 },
            { name: '充电网数据', value: 1 },
            { name: '车牌图像', value: 1 },
            { name: '敏感区域数据', value: 1 }
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
        '地理信息': '#1F78D1', // 蓝色
        '个人信息': '#45B39D', // 绿色
        '社会信息': '#F39C12' // 橙色
      }

      // 定义子类颜色（稍微透明）
      const subCategoryColors = {
        '构图数据': 'rgba(31, 120, 209, 0.5)',
        '点云数据': 'rgba(31, 120, 209, 0.6)',
        '惯导数据': 'rgba(31, 120, 209, 0.7)',
        '位置数据': 'rgba(31, 120, 209, 0.8)',

        '身份信息': 'rgba(69, 179, 157, 0.5)',
        '人脸图像': 'rgba(69, 179, 157, 0.6)',
        '生物特征': 'rgba(69, 179, 157, 0.7)',
        '踪迹数据': 'rgba(69, 179, 157, 0.8)',

        '车流数据': 'rgba(243, 156, 18, 0.5)',
        '充电网数据': 'rgba(243, 156, 18, 0.6)',
        '车牌图像': 'rgba(243, 156, 18, 0.7)',
        '敏感区域数据': 'rgba(243, 156, 18, 0.8)'
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
              r0: '20%',
              r: '40%'

            },
            {
              r0: '40%',
              r: '85%',

              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2
              }
            }
          ],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
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
