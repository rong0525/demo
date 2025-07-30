<template>
  <div class="usage-row">
    <!-- CPU使用率 -->
    <div class="usage-item cpu-usage">
      <div id="cpuChart" class="mini-chart" />
      <div class="usage-text">
        <div class="usage-label">CPU</div>
        <div class="usage-value">{{ cpuUsage }}%</div>
      </div>
    </div>

    <!-- 内存使用率 -->
    <div class="usage-item memory-usage">
      <div id="memChart" class="mini-chart" />
      <div class="usage-text">
        <div class="usage-label">内存</div>
        <div class="usage-value">{{ memoryUsage }}%</div>
      </div>
    </div>

    <!-- 存储使用率 -->
    <div class="usage-item storage-usage">
      <div id="storageChart" class="mini-chart" />
      <div class="usage-text">
        <div class="usage-label">存储</div>
        <div class="usage-value">{{ storageUsage }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ResourceUsage',
  props: {
    cpuUsage: {
      type: Number,
      default: 72
    },
    memoryUsage: {
      type: Number,
      default: 81
    },
    storageUsage: {
      type: Number,
      default: 26
    },
    cpuColor: {
      type: String,
      default: '#1659A5'
    },
    memoryColor: {
      type: String,
      default: '#3298DC'
    },
    storageColor: {
      type: String,
      default: '#28B17E'
    },
    cpuColor2: {
      type: String,
      default: '#F2F4F7'
    },
    memoryColor2: {
      type: String,
      default: '#E8F5E9'
    },
    storageColor2: {
      type: String,
      default: '#E3F2FD'
    }
  },
  data() {
    return {
      // cpuColor2: '#F2F4F7',
      // memoryColor2: '#E8F5E9',
      // storageColor2: '#E3F2FD'
    }
  },
  mounted() {
    this.initMiniChart('cpuChart', this.cpuUsage, this.cpuColor, this.cpuColor2)
    this.initMiniChart('memChart', this.memoryUsage, this.memoryColor, this.memoryColor2)
    this.initMiniChart('storageChart', this.storageUsage, this.storageColor, this.storageColor2)

    this.$watch('cpuUsage', (newVal) => {
      this.updateChart('cpuChart', newVal, this.cpuColor, this.cpuColor2)
    })
    this.$watch('memoryUsage', (newVal) => {
      this.updateChart('memChart', newVal, this.memoryColor, this.memoryColor2)
    })
    this.$watch('storageUsage', (newVal) => {
      this.updateChart('storageChart', newVal, this.storageColor, this.storageColor2)
    })
  },
  methods: {
    initMiniChart(domId, value, color, color2) {
      const chartDom = document.getElementById(domId)
      if (!chartDom) return

      const myChart = echarts.init(chartDom)
      this[`${domId}Instance`] = myChart

      const option = this.getChartOption(value, color, color2)
      myChart.setOption(option)

      const resizeHandler = () => myChart.resize()
      window.addEventListener('resize', resizeHandler)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeHandler)
        echarts.dispose(myChart)
      })
    },
    updateChart(domId, value, color, color2) {
      // console.log(`Updating chart ${domId} with value: ${value}`)
      const myChart = this[`${domId}Instance`]
      if (myChart) {
        myChart.setOption({
          series: [{
            data: [
              { value: value, name: '', itemStyle: { color: color }},
              { value: 100 - value, name: '', itemStyle: { color: color2 }}
            ]
          }]
        })
      }
    },
    getChartOption(value, color, color2) {
      return {
        series: [
          {
            type: 'pie',
            radius: ['45%', '75%'],
            center: ['50%', '50%'],
            data: [
              { value: value, name: '', itemStyle: { color: color }},
              { value: 100 - value, name: '', itemStyle: { color: color2 }}
            ],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              borderWidth: 0,
              borderRadius: 5
            },
            emphasis: {
              disabled: true
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
/* 使用率行容器 - 水平排列三个项目 */
.usage-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  /* 给行容器增加内边距，避免内容贴边 */
  padding: 0 5px;
}

/* 每个使用率项目：改为行布局，让饼图和文字水平排列 */
.usage-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px; /* 增加图表与文字的缝隙（从8px增至12px） */
  flex: 1; /* 平均分配父容器空间 */
  justify-content: center; /* 内容居中防止偏向一侧 */
  padding: 0 5px; /* 增加内部留白 */
}

/* 小型饼图样式 */
.mini-chart {
  width: 100px; /* 固定宽度 */
  height: 100px; /* 固定高度（与宽度一致，保持正方形） */
}

/* 文字说明容器：改为列布局，让标签和数值垂直排列 */
.usage-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 标签样式（CPU/内存/存储） */
.usage-label {
    color: #828282;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 30px */
    letter-spacing: -0.2px;
}

/* 数值样式（72%/81%/26%） */
.usage-value {
    color: #1659A5 !important;
    font-family: Inter;
    font-size: 48px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 72px */
    letter-spacing: -0.48px;
}

/* CPU特有样式 */
.cpu-usage .usage-label {
  color: v-bind(cpuColor);
}

/* 内存特有样式 */
.memory-usage .usage-label {
  color: v-bind(memoryColor);
}

/* 存储特有样式 */
.storage-usage .usage-label {
  color: v-bind(storageColor);
}

.usage-value {
  color: #303133;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .mini-chart {
    width: 50px;
    height: 50px;
  }
  .usage-label {
    font-size: 12px;
  }
  .usage-value {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .usage-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .usage-item {
    flex-direction: row;
  }
}
</style>
