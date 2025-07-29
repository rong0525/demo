<template>
  <div class="data-classification-container">
    <!-- 标题 -->
    <div class="title">重要数据分类分级</div>
    <!-- 内容容器，左侧图表 + 右侧列表 -->
    <div class="content-wrapper">
      <!-- 左侧图表区域 -->
      <div class="left-charts">
        <!-- 自定义文字标题：环形图标题 -->
        <div class="chart-title">
          <span class="chart-number">{{ importantPercent }}</span>
          <span class="chart-label">重要数据</span>
        </div>
        <!-- 环形图 -->
        <div class="chart-item">
          <div id="ringChart" style="width: 300px; height: 300px;" />
        </div>

        <div class="chart-divider" />

        <!-- 自定义文字标题：饼图标题 -->
        <div class="chart-title">
          <span class="chart-number2">{{ categoryCount }}</span>
          <span class="chart-label">大类</span>
          <span class="chart-number2">{{ subcategoryCount }}</span>
          <span class="chart-label">子类</span>
        </div>
        <!-- 旭日图 -->
        <div class="chart-item">
          <ClassificationSunburst />
          <!-- <div id="sunburstChart" style="width: 300px; height: 300px;"></div> -->
        </div>
      </div>
      <!-- 右侧分类列表区域 -->
      <div class="right-list">
        <div class="category">
          <div class="category-header">
            <img
              src="./image/location.png"
              class="icon"
              alt="地理位置图标"
            >
            <span>地理信息</span>
          </div>
          <ul class="geo-info">
            <li>构图数据</li>
            <li>点云数据</li>
            <li>惯导数据</li>
            <li>位置数据</li>
          </ul>
          <div class="right-divider" />
        </div>

        <!-- <div class="chart-divider"></div> -->

        <div class="category">
          <div class="category-header">
            <img
              src="./image/person.png"
              class="icon"
              alt="个人信息图标"
            >
            <span>个人信息</span>
          </div>
          <ul class="personal-info">
            <li>身份信息</li>
            <li>人脸图像</li>
            <li>生物特征</li>
            <li>踪迹数据</li>
          </ul>
          <div class="right-divider" />
        </div>

        <div class="category">
          <div class="category-header">
            <img
              src="./image/social.png"
              class="icon"
              alt="社会信息图标"
            >
            <span>社会信息</span>
          </div>
          <ul class="social-info">
            <li>车流数据</li>
            <li>充电网数据</li>
            <li>车牌图像</li>
            <li>敏感区域数据</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import ClassificationSunburst from './ClassificationSunburst.vue'
// 如果使用 Element UI 的图标，需要确保已引入相关样式和组件（这里只是示例用 class 模拟图标，实际可替换）
export default {
  components: {
    ClassificationSunburst
  },
  data() {
    return {
      importantPercent: '68%',
      categoryCount: 3,
      subcategoryCount: 12
    }
  },
  mounted() {
    // 初始化环形图
    this.initRingChart()
    // 初始化饼图
    this.initSunburstChart()
  },
  methods: {
    // 初始化环形图（重要数据占比）
    initRingChart() {
      const ringChartDom = document.getElementById('ringChart')
      const ringChart = echarts.init(ringChartDom)
      const option = {
        series: [
          {
            name: '重要数据占比',
            type: 'pie',
            radius: ['40%', '70%'], // 环形图内外半径
            center: ['50%', '50%'],
            data: [
              { value: 68, name: '重要数据', itemStyle: { color: '#1F78D1' }},
              { value: 32, name: '一般数据', itemStyle: { color: '#D0E7FF' }}
            ],
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}'
            },
            labelLine: {
              show: true
            }

          }
        ],
        legend: {
          bottom: '5%',
          left: 'center'
        }
      }
      ringChart.setOption(option)
    }
    // 初始化饼图（3 大类 12 子类）

  }
}
</script>

<style scoped>
.data-classification-container {
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
.title {
    color: #4560F7;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: 120%; /* 48px */
    letter-spacing: -0.32px;
}
.content-wrapper {
  display: flex;
  gap: 20px;
}
.left-charts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.chart-item {
  display: flex;
  justify-content: center;
  margin-bottom: -35px;
}
.chart-title {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 6px;
  margin-top: 10px;
  margin-bottom: -53px; /* 如果想靠近图表 */
}

.chart-number {
    color: #1F78D1;
    text-align: center;
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 900;
    line-height: 120%; /* 54px */
    letter-spacing: -0.36px;
}
.chart-number2 {
    color: #3FA9A0;
    text-align: center;
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 900;
    line-height: 120%; /* 54px */
    letter-spacing: -0.36px;
}
.chart-divider {
  width: 80%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px auto;
  margin-bottom: -20px
}
.chart-label {
    color: #828282;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.24px;
}
.right-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.category {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.category-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: -16px;
}

.category-header img {
  margin-right: 6px;
  width: 38px;
  height: 38px;
}
.category-header span {
  color: #828282;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 33.6px */
  letter-spacing: -0.24px;
}
ul {
  list-style: none;
  padding-left: 30px;
  margin-bottom: -5px;
}

ul li {
  position: relative;
  padding-left: 14px;
  margin: 4px 0;
  line-height: 1.5;

  color: #828282;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: -0.2px;
}

ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* 为每类的子项设置不同颜色 */
ul.geo-info li::before {
  background-color: #1F78D1;
}
ul.personal-info li::before {
  background-color: #45B39D;
}
ul.social-info li::before {
  background-color: #F39C12;
}
.right-divider {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px auto;
  margin-bottom: -20px
}
</style>
