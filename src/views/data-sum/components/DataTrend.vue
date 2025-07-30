<template>
  <div class="data-trend-card">
    <!-- 标题 & 筛选器 -->
    <div class="trend-header">
      <div class="title">数据流趋势</div>
      <div class="filter-controls">
        <el-select v-model="timeType" placeholder="时间维度" size="small">
          <el-option label="按日" value="day" />
          <el-option label="按月" value="month" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
      </div>
    </div>

    <!-- 图表 -->
    <div ref="chart" class="chart-container" />

    <!-- 底部说明 -->
    <div class="chart-footer">当前显示：近7天数据流趋势变化</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DataTrend',
  data() {
    return {
      timeType: 'day',
      dateRange: [],
      chartInstance: null,
      mockData: {
        dates: [],
        values: [3200, 2800, 3900, 4200, 3100, 3700, 4500]
      }
    }
  },
  mounted() {
    this.mockData.dates = this.getRecent7Days()
    this.initChart()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
    if (this.chartInstance) this.chartInstance.dispose()
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart)
      const { dates, values } = this.mockData
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#e5e6eb',
          borderWidth: 1,
          textStyle: { color: '#333' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: { lineStyle: { color: '#e5e6eb' }},
          axisLabel: { color: '#86909c', fontSize: 12 }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: { color: '#86909c', fontSize: 12 },
          splitLine: { lineStyle: { color: '#f2f3f5' }},
          min: 0
        },
        series: [
          {
            type: 'line',
            data: values,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { color: '#4560F7', width: 2 },
            itemStyle: { color: '#4560F7', borderColor: '#fff', borderWidth: 2 },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(69, 96, 247, 0.2)' },
                { offset: 1, color: 'rgba(69, 96, 247, 0)' }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(option)
    },
    getRecent7Days() {
      const days = []
      const today = new Date()

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)

        // 格式化：年-月-日（补0，如 2024-07-05）
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // 补0
        const day = String(date.getDate()).padStart(2, '0') // 补0
        days.push(`${year}-${month}-${day}`)
      }

      return days
    },
    resizeChart() {
      this.chartInstance && this.chartInstance.resize()
    }
  }
}
</script>

<style scoped>
.data-trend-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 300px;
  overflow: hidden;
}

.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.title {
    color: #4560F7;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 48px */
    letter-spacing: -0.32px;
}

.filter-controls {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.chart-container {
  flex: 1;
  min-height: 280px;
  width: 100%;
}

.chart-footer {
  margin-top: 10px;
  color: #999;
  font-size: 14px;
  text-align: center;
}
</style>
