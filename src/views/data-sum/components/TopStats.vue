<template>
  <el-card class="top-stats-card">
    <div class="top-stats">
      <!-- 总数据流入量 -->
      <div class="stat-item first">
        <div class="icon-title-row">
          <img
            src="./image/data_in.png"
            class="icon"
            alt="总流入图标"
          >
          <div class="stat-title">总数据流入量</div>
        </div>
        <div class="stat-value">1.534 PB</div>
        <div class="stat-change" style="color: #ff7875;">较上周同比 ↓2%</div>
      </div>

      <!-- 活跃数据源 -->
      <div class="stat-item first">
        <div class="icon-title-row">
          <img
            src="./image/car.png"
            class="icon"
            alt="活跃数据源图标"
          >
          <div class="stat-title">活跃数据源</div>
        </div>
        <div class="stat-value" style="color: #67c23a;">12758 个</div>
        <div class="stat-change">新增15个 离线21个</div>
      </div>

      <!-- 重要数据存储量 -->
      <div class="stat-item first">
        <div class="icon-title-row">
          <img
            src="./image/store.png"
            class="icon"
            alt="存储量图标"
          >
          <div class="stat-title">重要数据存储量</div>
        </div>
        <div class="stat-value" style="color: #409eff;">350.89 TB</div>
        <div class="stat-change" style="color: #67c23a;">当前存储空间充足</div>
      </div>

      <!-- 系统资源使用率 -->
      <div class="stat-item two resource-usage">
        <div class="icon-title-row">
          <img
            src="./image/setting.png"
            class="icon"
            alt="资源使用率图标"
          >
          <div class="stat-title">系统资源使用率</div>
        </div>
        <div class="usage-row">
          <ResourceUsage
            :cpu-usage="72"
            :memory-usage="81"
            :storage-usage="26"
          />

        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import ResourceUsage from './ResourceUsage.vue'
export default {
  name: 'TopStats',
  components: {
    ResourceUsage
  },
  mounted() {
    this.initMiniChart('cpuChart', 72, '#409eff')
    this.initMiniChart('memChart', 81, '#67c23a')
    this.initMiniChart('storageChart', 26, '#e6a23c')
  },
  beforeDestroy() {
    // 销毁图表实例
    const chartDom = document.getElementById('resourceChart')
    if (chartDom) {
      echarts.dispose(chartDom)
    }
  },
  methods: {
    initMiniChart(domId, value, color) {
      const chartDom = document.getElementById(domId)
      if (!chartDom) return

      const myChart = echarts.init(chartDom)
      const option = {
        series: [
          {
            type: 'pie',
            radius: ['45%', '75%'],
            center: ['50%', '50%'],
            data: [
              { value: value, name: '' },
              { value: 100 - value, name: '' }
            ],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: color,
              borderWidth: 0,
              borderRadius: 5
            },
            emphasis: {
              disabled: true
            }
          }
        ]
      }

      myChart.setOption(option)

      // 监听窗口变化
      const resizeHandler = () => myChart.resize()
      window.addEventListener('resize', resizeHandler)

      // 组件销毁前清理
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeHandler)
        echarts.dispose(chartDom)
      })
    }
  }
}
</script>

<style scoped>
.top-stats-card {
  padding: 15px;
}

.top-stats {
  display: flex;
  width: 100%;
  height: 140px;
}

.stat-item {
  padding: 20px 20px; /* 增加内边距 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中填充空间 */
  height: 100%;
  .first{
    flex: 1;
  }
  .two{
    flex: 2;
  }
}

/* 分隔线样式 */
.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 10%;
  height: 80%;
  width: 1px;
  background-color: #e5e6eb;
}

/* 图标和标题在同一行 */
.icon-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* 增加间距 */
}

.icon {
  width: 45px;  /* 根据需要调整宽度 */
  height: 45px;
  font-size: 45px; /* 增大图标尺寸 */
  margin-right: 12px; /* 增加图标与标题间距 */
  color: #409eff;
}

.stat-title {
    color: #828282;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 48px */
    letter-spacing: -0.32px;
}

.stat-value {
    color: #4560F7;
    font-family: Inter;
    font-size: 48px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 72px */
    letter-spacing: -0.48px;
    padding-left: 20px;
}

.stat-change {
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 30px */
    letter-spacing: -0.2px;
    padding-left: 20px;
}

/* 系统资源使用率样式 */
.resource-usage .chart {
  width: 100%;
  height: 100px; /* 增大图表高度 */
  margin-bottom: 8px;
}

.resource-details {
  font-size: 14px; /* 增大详情字体 */
  color: #666;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .stat-value {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .top-stats {
    flex-direction: column;
  }

  .stat-item {
    padding: 20px 0;
    border-bottom: 1px solid #e5e6eb;
  }

  .stat-item:last-child {
    border-bottom: none;
  }

  .stat-item:not(:last-child)::after {
    display: none;
  }
}
</style>
