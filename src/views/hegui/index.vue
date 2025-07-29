<template>
  <div :class="$style.maincontent">
    <div :class="$style.contentlayout">
      <div :class="$style.card1Complianceratioandtrend">
        <b :class="$style.b9">整体合规情况</b>
        <!-- 1. 环形图 -->
        <div :class="$style.div68">
          <!-- 修改: v-chart 替换为 div -->
          <div ref="pieChart" :class="$style.pieChart" />
          <div :class="$style.div69">
            <p :class="$style.p">当前合规率</p>
            <p :class="$style.p28">73.1%</p>
          </div>
        </div>
        <!-- 2. 统计项列表 -->
        <div :class="$style.statsList">
          <div :class="$style.statItem">
            <span>未合规项总数：</span>
            <b :class="$style.b6">{{ statsData.totalUncompliant }} 条</b>
          </div>
          <div :class="$style.statItem">
            <span>高风险不合规项：</span>
            <b :class="$style.b6">{{ statsData.highRisk }} 条</b>
          </div>
          <div :class="$style.statItem">
            <span>待处理项：</span>
            <b :class="$style.b7">{{ statsData.pending }} 条</b>
          </div>
          <div :class="$style.statItem">
            <span>今日新增不合规项：</span>
            <b :class="$style.b5">{{ statsData.newToday }} 条</b>
          </div>
          <div :class="$style.statItem">
            <span>已处理不合规项（今日）：</span>
            <b :class="$style.b4">{{ statsData.processedToday }} 条</b>
          </div>
        </div>
        <!-- 3. 时间选择器 -->
        <div :class="$style.timeSelectorContainer">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            size="mini"
          />
          <el-select v-model="timeUnit" placeholder="请选择" size="mini" :class="$style.timeUnitSelect">
            <el-option
              v-for="item in timeUnitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- 4. 折线图 -->
        <!-- 修改: v-chart 替换为 div -->
        <div ref="lineChart" :class="$style.lineChart" />
      </div>
      <div :class="$style.card2">
        <div :class="$style.cardHeader">
          <b :class="$style.b2">不合规项类型分布</b>
          <el-radio-group v-model="chartView" size="mini">
            <el-radio-button label="month">本月</el-radio-button>
            <el-radio-button label="week">本周</el-radio-button>
            <el-radio-button label="day">今日</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 修改: v-chart 替换为 div -->
        <div ref="barChart" :class="$style.barChart" />
      </div>
      <div :class="$style.card3">
        <b :class="$style.b2">不合规项详情列表</b>
        <div :class="$style.table">
          <div :class="$style.tablefunction">
            <div /> <!-- 占位符，将图标推到右边 -->
            <div :class="$style.functionIcons">
              <img :class="$style.icon10" alt="" src="./icon-打印.png">
              <img :class="$style.icon9" alt="" src="./icon-导出.png">
              <img :class="$style.icon8" alt="" src="./icon-选项.png">
            </div>
          </div>
          <div :class="$style.tablecontent">
            <div :class="[$style.tablegrid, $style.tableheader]">
              <div :class="$style.headerCell"><span>排序</span><img :class="$style.icon7" alt="" src="./排名.png"></div>
              <div :class="$style.headerCell"><span>不合规类型</span><img :class="$style.icon6" alt="" src="./排序.png"></div>
              <div :class="$style.headerCell"><span>涉及数据</span><img :class="$style.icon5" alt="" src="./排序.png"></div>
              <div :class="$style.headerCell"><span>发生时间</span><img :class="$style.icon4" alt="" src="./排序.png"></div>
              <div :class="$style.headerCell"><span>严重程度</span><img :class="$style.icon2" alt="" src="./排序.png"></div>
              <div :class="$style.headerCell"><span>处理状态</span><img :class="$style.icon2" alt="" src="./排序.png"></div>
              <div :class="$style.headerCell"><span>匹配规则</span><img :class="$style.icon1" alt="" src="./排序.png"></div>
              <div :class="$style.headerCell"><span>操作</span><img :class="$style.icon" alt="" src="./排序.png"></div>
            </div>
            <div :class="$style.rows">
              <!-- 表格行 -->
              <div v-for="item in tableData" :key="item.id" :class="[$style.tablegrid, $style.tableRow]">
                <div>{{ item.id }}</div>
                <div>{{ item.type }}</div>
                <div>
                  <p :class="$style.p">{{ item.data.name }}</p>
                  <p :class="$style.p">{{ item.data.source }}</p>
                </div>
                <div>{{ item.time }}</div>
                <div>
                  <div :class="[$style.label, $style[item.severity.toLowerCase()]]">
                    {{ item.severity }}
                  </div>
                </div>
                <div>{{ item.status }}</div>
                <div>
                  <p :class="$style.p">{{ item.rule.name }}</p>
                  <p :class="$style.p">{{ item.rule.detail }}</p>
                </div>
                <div :class="$style.actionLink">
                  <span v-if="item.action === '详情'">{{ item.action }}</span>
                  <span v-else v-html="item.action" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 1. 修改 ECharts 导入方式
import echarts from 'echarts/lib/echarts' // 导入主模块
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
// 2. 移除 vue-echarts 导入

export default {
  name: 'Documentation',
  // 3. 移除 VChart 组件注册
  components: {},
  data() {
    const barChartData = {
      month: {
        categories: ['数据泄露', '权限滥用', '存储不当', '传输加密', '身份认证', '日志缺失'],
        values: [620, 932, 901, 934, 1290, 1330]
      },
      week: {
        categories: ['数据泄露', '权限滥用', '存储不当', '传输加密', '身份认证', '日志缺失'],
        values: [120, 200, 150, 80, 70, 110]
      },
      day: {
        categories: ['数据泄露', '权限滩用', '存储不当', '传输加密', '身份认证', '日志缺失'],
        values: [30, 45, 35, 20, 15, 25]
      }
    }
    return {
      // 4. 为 ECharts 实例添加占位符
      pieChartInstance: null,
      lineChartInstance: null,
      barChartInstance: null,
      statsInterval: null, // 用于存储定时器ID
      statsData: { // 存储统计项的动态数据
        totalUncompliant: 15,
        highRisk: 3,
        pending: 8,
        newToday: 2,
        processedToday: 5
      },
      chartView: 'month', // for bar chart
      barChartData,
      dateRange: [], // v-model for el-date-picker
      timeUnit: 'month', // v-model for el-select, with a default value
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setHours(0, 0, 0, 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            const day = start.getDay() || 7 // Make Sunday (0) be 7
            start.setTime(start.getTime() - 3600 * 1000 * 24 * (day - 1))
            start.setHours(0, 0, 0, 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(1)
            start.setHours(0, 0, 0, 0)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      timeUnitOptions: [
        { value: 'hour', label: '按小时' },
        { value: 'day', label: '按天' },
        { value: 'month', label: '按月' }
      ],
      pieChartOption: {
        title: {
          text: '73.1%',
          left: 'center',
          top: 'center',
          textStyle: { fontSize: 24, fontWeight: 'bold', color: '#333' }
        },
        tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
        series: [{
          name: '合规率',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 73.1, name: '合规' },
            { value: 26.9, name: '不合规' }
          ],
          color: ['#1f78d1', '#f7b6a6']
        }]
      },
      lineChartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Day 1', 'Day 6', 'Day 11', 'Day 16', 'Day 21', 'Day 26']
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value} %' }
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        series: [{
          name: '合规率',
          type: 'line',
          stack: 'Total',
          data: [40, 58, 62, 68, 70, 73],
          smooth: true,
          // 修改: 设置线条、数据点和区域的颜色为蓝色
          itemStyle: {
            color: '#1f78d1'
          },
          lineStyle: {
            color: '#1f78d1'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(31, 120, 209, 0.5)'
            }, {
              offset: 1,
              color: 'rgba(31, 120, 209, 0)'
            }])
          }
        }]
      },
      tableData: [
        { id: 1, type: '未经匿名化传输', data: { name: '位置数据' }, time: '2025-07-15 09:30', severity: '高', status: '待处理', rule: { name: 'GBT XXX-202X', detail: '脱敏规定' }, action: '<span style="color: #0050b3;">处理</span> / <span style="color: #0050b3;">详情</span>' },
        { id: 2, type: '用户未授权采集', data: { name: '人脸图像' }, time: '2025-07-15 08:45', severity: '高', status: '进行中', rule: { name: 'GDPR-CN', detail: '同意条款' }, action: '查看 / 详情' },
        { id: 3, type: '车牌图像明文存储', data: { name: '车牌图像' }, time: '2025-07-14 23:10', severity: '中', status: '待复核', rule: { name: '国家网络安全法', detail: '数据加密' }, action: '详情' },
        { id: 4, type: '车流数据采集频率异常', data: { name: '车流数据' }, time: '2025-07-11 14:00', severity: '低', status: '已处理', rule: { name: '数据采集', detail: '最小必要原则' }, action: '查看报告' },
        { id: 5, type: '内部系统访问权限越界', data: { name: '身份信息' }, time: '2025-07-13 10:05', severity: '高', status: '待处理', rule: { name: '内部权限管理策略', detail: '' }, action: '<span style="color: #0050b3;">处理</span> / <span style="color: #0050b3;">详情</span>' },
        { id: 6, type: 'API接口未授权访问', data: { name: '车辆控制指令' }, time: '2025-07-12 18:20', severity: '中', status: '已处理', rule: { name: 'API安全规范', detail: '访问控制' }, action: '查看报告' },
        { id: 7, type: '驾驶行为数据超期存储', data: { name: '驾驶行为日志' }, time: '2025-07-10 00:00', severity: '低', status: '待复核', rule: { name: '数据保留策略', detail: '存储期限' }, action: '详情' }
      ]
    }
  },
  computed: {
    activeBarChartOption() {
      const viewData = this.barChartData[this.chartView]
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderColor: '#333',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: viewData.categories,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#666'
          },
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }],
        series: [{
          name: '不合规次数',
          type: 'bar',
          barWidth: '40%',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
            // 4. 移除 borderRadius，因为它在 ECharts 4.x 中不受支持
          },
          itemStyle: {
            // 4. 移除 borderRadius
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#83bff6' // 0% 处的颜色
              }, {
                offset: 1, color: '#188df0' // 100% 处的颜色
              }]
            }
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#2378f7'
                }, {
                  offset: 1, color: '#83bff6'
                }]
              }
            }
          },
          data: viewData.values
        }]
      }
    }
  },
  watch: {
    // 监听数据变化，更新图表
    activeBarChartOption(newOption) {
      if (this.barChartInstance) {
        this.barChartInstance.setOption(newOption)
      }
    }
  },
  mounted() {
    this.initCharts()
    // 监听窗口大小变化，实现图表自适应
    window.addEventListener('resize', this.resizeCharts)
    // 设置定时器，每3秒更新一次统计数据
    this.statsInterval = setInterval(this.updateStats, 3000)
  },
  beforeDestroy() {
    // 销毁实例并移除监听，防止内存泄漏
    window.removeEventListener('resize', this.resizeCharts)
    if (this.pieChartInstance) this.pieChartInstance.dispose()
    if (this.lineChartInstance) this.lineChartInstance.dispose()
    if (this.barChartInstance) this.barChartInstance.dispose()
    // 在组件销毁前清除定时器
    clearInterval(this.statsInterval)
  },
  methods: {
    // 新增：模拟从后端获取数据并更新统计项的方法
    updateStats() {
      // 模拟当前间隔内发生的变化
      const newItems = Math.floor(Math.random() * 3) // 本次新增0-2个
      const processedItems = Math.random() > 0.6 ? 1 : 0 // 40%的几率处理掉1个
      const newHighRiskItems = (newItems > 0 && Math.random() > 0.7) ? 1 : 0 // 新增项里有30%几率是高风险

      // 获取当前数据作为基数
      const currentStats = this.statsData

      // 计算新值，确保逻辑合理
      const newTotalUncompliant = currentStats.totalUncompliant + newItems
      const newHighRisk = currentStats.highRisk + newHighRiskItems
      // 待处理项 = 原有待处理 + 新增 - 已处理 (确保不为负数)
      const newPending = Math.max(0, currentStats.pending + newItems - processedItems)
      const newToday = currentStats.newToday + newItems
      const newProcessedToday = currentStats.processedToday + processedItems

      // 更新数据
      this.statsData = {
        totalUncompliant: newTotalUncompliant,
        highRisk: newHighRisk,
        pending: newPending,
        newToday: newToday,
        processedToday: newProcessedToday
      }
    },
    // 6. 添加图表初始化和自适应方法
    initCharts() {
      // 初始化饼图
      this.pieChartInstance = echarts.init(this.$refs.pieChart)
      this.pieChartInstance.setOption(this.pieChartOption)

      // 初始化折线图
      this.lineChartInstance = echarts.init(this.$refs.lineChart)
      this.lineChartInstance.setOption(this.lineChartOption)

      // 初始化柱状图
      this.barChartInstance = echarts.init(this.$refs.barChart)
      this.barChartInstance.setOption(this.activeBarChartOption)
    },
    resizeCharts() {
      // 调整所有图表的尺寸
      this.pieChartInstance && this.pieChartInstance.resize()
      this.lineChartInstance && this.lineChartInstance.resize()
      this.barChartInstance && this.barChartInstance.resize()
    }
  }
}
</script>

<style module>
/* --- 全局和基础 --- */
:root {
    font-size: calc(0.5vw + 5px);
}

.p {
      margin: 0;
}

/* --- 主布局 --- */
.maincontent {
    width: 100%;
    min-height: 100vh;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    box-sizing: border-box;
    font-family: Inter, sans-serif;
    color: #828282;
}

.contentheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
}

.contenttitle .div71 {
    font-size: 2rem;
    font-weight: 900;
    color: #4560f7;
}

.searchcol {
    width: 20rem;
    max-width: 300px;
}

.contentlayout {
    flex-grow: 1;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: auto 1fr;
    gap: 1.5rem;
    width: 100%;
}

/* --- 卡片布局 --- */
.card1Complianceratioandtrend {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.card2 {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.card3 {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.b9, .b2 {
    font-size: 1.8rem;
    color: #4560f7;
}

/* --- Card1 内部布局 --- */
.div68 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}

.div69 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.div68 .p {
    font-size: 2rem;
    color: #000;
}

.div68 .p28 {
    font-size: 4rem;
    font-weight: 900;
    color: #1f78d1;
}

.statsList {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.3rem; /* 增大字体 */
    align-items: center; /* 居中对齐 */
}

.statItem {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pieChart {
    width: 12rem;
    height: 12rem;
}

.lineChart {
    width: 100%;
    height: 100%;
    min-height: 200px;
    align-self: center;
}

.timeSelectorContainer {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
}

.timeUnitSelect {
    width: 120px;
}

.b4 { color: #1f78d1; }
.b5 { color: #ff4d4f; }
.b6 { color: #faad14; }
.b7 { color: #ff4d4f; }

/* --- Card2 样式 --- */
.cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.barChart {
    height: 100%;
    min-height: 250px;
}

/* --- Card3 表格 --- */
.table {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.tablefunction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e0e0e0;
    margin-bottom: 0.5rem;
}

.functionIcons img {
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    margin-left: 0.5rem;
    cursor: pointer;
}

.tablecontent {
    flex-grow: 1;
    overflow-y: auto;
}

.tablegrid {
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1.5fr 1fr;
    gap: 1rem;
    align-items: center;
    text-align: center;
    padding: 0.8rem 0.5rem;
    border-bottom: 1px solid #e0e0e0;
}

.tableheader {
    font-weight: 900;
    color: #333;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
}

.headerCell {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
}

.headerCell img {
    width: 1rem;
    height: 1rem;
    margin-left: 0.3rem;
}

.tableRow {
    font-size: 0.9rem;
}

.tableRow:last-child {
    border-bottom: none;
}

.actionLink {
    color: #0050b3;
    cursor: pointer;
}

/* 严重程度标签 */
.label {
    border-radius: 8px;
    border: 1px solid;
    box-sizing: border-box;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    display: inline-block;
}
.label.高, .label.high {
    background-color: #f7b6a6;
    border-color: #af4328;
    color: #af4328;
}
.label.中, .label.medium {
    background-color: #ffd98c;
    border-color: #ad7300;
    color: #ad7300;
}
.label.低, .label.low {
    background-color: #addecc;
    border-color: #358d86;
    color: #358d86;
}
</style>
