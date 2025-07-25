<template>
  <div class="dashboard-container">
    <el-row :gutter="20" class="wrapper-row">
      <!--第一行第一个 card-->
      <el-col :lg="15">
        <el-card>
          <el-row>
            <el-col :lg="24" class="card-title">
              数据概览
            </el-col>
            <el-col>
              <div class="horizon-underline" />
            </el-col>
            <el-col :lg="24" style="margin-top: 3.5vh">
              <!--内部行-->
              <el-row type="flex" class="inner-row">
                <el-col :lg="6">
                  <el-row>
                    <el-col :lg="24">
                      <div class="module-title">
                        今日数据流入总量
                      </div>
                      <div class="todayTotalFlow">{{ todayTotalFlow }}</div>
                    </el-col>
                    <el-col :lg="24" style="margin-top: 2.5vh">
                      <div class="module-title">
                        较昨日同比增长
                      </div>
                      <div class="oneDayBoost">{{ oneDayBoost }}</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :lg="1" class="divider-container"><el-divider class="el-divider--vertical" direction="vertical" /></el-col>
                <el-col :lg="9">
                  <el-row>
                    <el-col :lg="24">
                      <div class="module-title">
                        近7天数据流入趋势
                      </div>
                    </el-col>
                    <el-col :lg="24">
                      <SevenDaysFlowLineChart :chart-data="lineChartData" />
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :lg="1" class="divider-container"><el-divider class="el-divider--vertical" direction="vertical" /></el-col>
                <el-col :lg="7">
                  <el-row>
                    <el-col :lg="24">
                      <div class="module-title">
                        重要数据分级占比图
                      </div>
                    </el-col>
                    <el-col :lg="24" style="margin-top: 1.5vh">
                      <importantDataPie />
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!--第一行第二个 card-->
      <el-col :lg="9">
        <el-card>
          <el-col :lg="24" class="card-title">
            合规概览
          </el-col>
          <el-col>
            <div class="horizon-underline" />
          </el-col>
          <el-col :lg="24" style="margin-top: 3.5vh">
            <!--内部行-->
            <el-row type="flex" class="inner-row">
              <el-col :lg="13">
                <el-row>
                  <el-col :lg="14">
                    <div class="complianceTitle">
                      当前合规率
                    </div>
                    <div class="complianceRate">{{ complianceRate }}</div>
                  </el-col>
                  <el-col :lg="10">
                    <complianceDataPieChart />
                  </el-col>
                  <el-col :lg="24" style="margin-top: 1.5vh">
                    <div class="module-title" style="font-weight: bold">
                      近
                      <span style="font-weight: bold;font-size: 4.5vh;color: #1F78D1">30天</span>
                      合规率趋势
                    </div>
                    <thirtyDaysComplianceDataLineChart :chart-data="thirtyDaysComplianceDataLineChartData" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :lg="1" class="divider-container"><el-divider class="el-divider--vertical" direction="vertical" /></el-col>
              <el-col :lg="10">
                <el-row>
                  <el-col :lg="24">
                    <div class="module-title">
                      不合规项Top10
                    </div>
                  </el-col>
                  <el-col :lg="24" style="margin-top: 0.7vh">
                    <el-table :data="unComplianceTop10Data" :cell-style="{padding:'0.5vh'}" :show-header="false" style="font-size:1.8vh">
                      <el-table-column prop="type" width="50">
                        <template v-if="'person'">
                          <img src="./components/static/uncompliance/person.png" style="width:100%;height:100%;" alt="">
                        </template>
                      </el-table-column>
                      <el-table-column prop="info" />
                    </el-table>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="wrapper-row">
      <!--      第二行-->
      <el-col :lg="8">
        <el-card>
          <el-row>
            <el-col :lg="24" class="card-title">
              重点事件通报
            </el-col>
            <el-col>
              <div class="horizon-underline" />
            </el-col>
            <!--          内部行-->
            <el-col>
              <el-table :data="importantEvents" :cell-style="{padding:'1.2vh'}" :show-header="false">
                <el-table-column prop="type" width="92vh">
                  <template v-if="'数据传输异常'">
                    <img src="./components/static/important-event/transfer-warning.png" style="width:100%;height:100%;" alt="">
                  </template>
                </el-table-column>
                <el-table-column prop="type, info, time">
                  <template v-slot:default="scope">
                    <div style="font-size: 1.8vh;color: #8A8A8A">
                      {{ scope.row.type }}：{{ scope.row.info }}
                    </div>
                    <div style="font-size: 1.5vh;color: #8A8A8A;margin-top: 0.3vh">
                      {{ scope.row.time }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :lg="16">
        <el-card>
          <el-row>
            <el-col :lg="24" class="card-title">
              规则概览
            </el-col>
            <el-col :lg="24">
              <div class="horizon-underline" />
            </el-col>
            <el-col :lg="24" style="margin-top: 2vh">
              <el-row class="inner-row">
                <!--                第一列-->
                <el-col :lg="10">
                  <!--                  todo 分成两行，每行用 template 生成两列-->
                  <el-row>
                    <el-col :lg="12">
                      <div class="module-title">规则总数</div>
                      <div class="blue-count">{{ ruleInfo.counts }}条</div>
                    </el-col>
                    <el-col :lg="12">
                      <div class="module-title">以录入标准数</div>
                      <div class="pink-count">{{ ruleInfo.standardCounts }}篇</div>
                    </el-col>
                    <el-col :lg="24" style="margin-top: 1.5vh">
                      <div class="horizon-underline" />
                    </el-col>
                    <el-col :lg="12" style="margin-top: 2.5vh">
                      <div class="module-title">已启动规则数</div>
                      <div class="pink-count">{{ ruleInfo.activatedCounts }}条</div>
                    </el-col>
                    <el-col :lg="12" style="margin-top: 2.5vh">
                      <div class="module-title">最近更新时间</div>
                      <div class="blue-count-time">{{ ruleInfo.updatedTime.split(' ')[0] }}</div>
                      <div class="blue-count-time">{{ ruleInfo.updatedTime.split(' ')[1] }}</div>
                    </el-col>
                  </el-row>
                </el-col>
                <!--                第二列-->
                <el-col :lg="7">
                  <el-col :lg="24">
                    <div class="module-title">规则总数</div>
                  </el-col>
                  <el-col style="margin-top: 1.0vh; margin-left: 3vh">
                    <el-row>
                      <el-col>
                        <el-row>
                          <el-col :lg="4" style="margin-top: 0.3vh">
                            <img src="./components/static/uncompliance/location.png" style="width:80%;height:80%;" alt="">
                          </el-col>
                          <el-col :lg="20" style="margin-top: 0.3vh">
                            <div class="module-title-smaller">个人信息识别引擎</div>
                            <div class="rule-engine-info">已录入：{{ ruleEngineInfo.engine1.roledInCount }}<span style="margin-left: 2vh" />已启用：{{ ruleEngineInfo.engine1.activatedCount }}</div>
                          </el-col>
                          <el-col><div class="horizon-underline" /></el-col>
                        </el-row>
                        <el-row style="margin-top: 0.3vh">
                          <el-col :lg="4" style="margin-top: 0.3vh">
                            <img src="./components/static/uncompliance/person.png" style="width:80%;height:80%;" alt="">
                          </el-col>
                          <el-col :lg="20" style="margin-top: 0.3vh">
                            <div class="module-title-smaller">人脸与生物特征识别引擎</div>
                            <div class="rule-engine-info">已录入：{{ ruleEngineInfo.engine1.roledInCount }}<span style="margin-left: 2vh" />已启用：{{ ruleEngineInfo.engine1.activatedCount }}</div>
                          </el-col>
                          <el-col><div class="horizon-underline" /></el-col>
                        </el-row>
                        <el-row style="margin-top: 0.3vh">
                          <el-col :lg="4" style="margin-top: 0.3vh">
                            <img src="./components/static/uncompliance/society.png" style="width:80%;height:80%;" alt="">
                          </el-col>
                          <el-col :lg="20" style="margin-top: 0.3vh">
                            <div class="module-title-smaller">敏感地理位置识别引擎</div>
                            <div class="rule-engine-info">已录入：{{ ruleEngineInfo.engine1.roledInCount }}<span style="margin-left: 2vh" />已启用：{{ ruleEngineInfo.engine1.activatedCount }}</div>
                          </el-col>
                          <el-col><div class="horizon-underline" /></el-col>
                        </el-row>
                        <el-row style="margin-top: 0.3vh">
                          <el-col :lg="4" style="margin-top: 0.3vh">
                            <img src="./components/static/uncompliance/location.png" style="width:80%;height:80%;" alt="">
                          </el-col>
                          <el-col :lg="20" style="margin-top: 0.3vh">
                            <div class="module-title-smaller">图像与点云识别引擎</div>
                            <div class="rule-engine-info">已录入：{{ ruleEngineInfo.engine1.roledInCount }}<span style="margin-left: 2vh" />已启用：{{ ruleEngineInfo.engine1.activatedCount }}</div>
                          </el-col>
                          <el-col><div class="horizon-underline" /></el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-col>
                <!--                第三列-->
                <el-col :lg="7" style="display: flex; align-items: center;justify-content: center; flex: 1; height: 30vh">
                  <img src="./components/static/decorate.png" style="width:27vh;height:auto;" alt="">
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.horizon-underline {
    content: '';
    position: relative;
    left: 0;
    margin-top: 0.5vh;
    width: 100%;
    height: 2px; /* 下划线粗细 */
    background-color: #ababab; /* 下划线颜色 */
}
.todayTotalFlow {
  font-size: 6vh;
  letter-spacing: -0.01em;
  line-height: 170%;
  font-weight: 900;
  color: #4560f7;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
}
.oneDayBoost {
  font-size: 6vh;
  letter-spacing: -0.01em;
  line-height: 170%;
  font-weight: 900;
  color: #2db561;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
}
.complianceRate {
  font-size: 5.3vh;
  letter-spacing: -0.01em;
  line-height: 140%;
  font-weight: 900;
  color: #1f78d1;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-divider-horizontal {
  height: 2px;
  background-color: #ababab;
}
.dashboard-container {
  width: 100%;
  min-height: 100vh;
  padding: 2vh 2vw;
  box-sizing: border-box;
  background-color: #f5f7fa;
}
.wrapper-row {
  display: flex;
  margin-bottom: 2vh;
}
.wrapper-row .el-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 100%;
  flex: 1;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  position: relative;
}
.card-title {
  font-size: 2.5vh;
  letter-spacing:  0.05em;
  width: 100%;
  overflow: hidden;
  color: #828282;
}
.module-title {
  font-size: 3.0vh;
  letter-spacing: 0.08em;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #828282;
}
.module-title-smaller {
  font-size: 2vh;
  letter-spacing: 0.08em;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #828282;
}
.rule-engine-info {
  font-size: 1.3vh;
  letter-spacing: 0.08em;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #828282;
  white-space: pre;
}
.complianceTitle {
  font-weight: bold;
  font-size: 3.6vh;
  letter-spacing: 0.03em;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #828282;
}
.divider-container {
  display: flex;
  justify-content: center
}
.el-divider--vertical{
  display: flex;
  width: 2px;
  height: 100%;
  vertical-align:middle;
  position:relative;
}
.inner-row {
  height: 100%;
}
.blue-count {
  color: #1F78D1;
  font-size: 5vh;
  font-weight: 800;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.01em;
  line-height: 140%;
}
.blue-count-time {
  color: #1F78D1;
  font-size: 3vh;
  font-weight: 800;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.01em;
  line-height: 140%;
}
.pink-count {
  color: #F7B6A6;
  font-size: 5vh;
  font-weight: 800;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.01em;
  line-height: 140%;
}
</style>

<script>
import SevenDaysFlowLineChart from './components/SevenDaysFlowLineChart.vue'
import ImportantDataPieChart from './components/ImportantDataPieChart.vue'
import CompliancePieChart from './components/CompliancePieChart.vue'
import ThirtyDaysComplianceDataLineChart from './components/ThirtyDaysComplianceDataLineChart.vue'
import myDashboard from '@/views/myDashboard/index.vue'
// 定义格式化封装函数
function format(timer) {
  const year = timer.getFullYear()
  const month = timer.getMonth() + 1 // 由于月份从0开始，因此需加1
  const day = timer.getDate()
  const hour = timer.getHours()
  const minute = timer.getMinutes()
  const second = timer.getSeconds()
  return `${pad(year, 4)}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`
}
// 定义具体处理标准
// timeEl 传递过来具体的数值：年月日时分秒
// total 字符串总长度 默认值为2
// str 补充元素 默认值为"0"
function pad(timeEl, total = 2, str = '0') {
  return timeEl.toString().padStart(total, str)
}
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [8200, 9320, 9010, 9340, 12900, 13300, 23200]
  }
}
const thirtyDaysComplianceDataLineChartData = {
  actualData: []
}
for (let i = 0; i < 30; i++) {
  thirtyDaysComplianceDataLineChartData.actualData.push(Math.random() * 40 + 40)
}
const unComplianceTop10Data = []
for (let i = 0; i < 10; i++) {
  unComplianceTop10Data[i] = {
    type: 'person',
    info: '这是一个测试数据' + i.toString()
  }
}
const importantEvents = []
for (let i = 0; i < 5; i++) {
  importantEvents[i] = {
    type: '数据传输异常',
    info: '车速传感器数据上传中断',
    time: format(new Date(Date.now()))
  }
}
const ruleInfo = {
  counts: 2842,
  standardCounts: 23,
  activatedCounts: 1324,
  updatedTime: format(new Date(Date.now()))
}
const ruleEngineInfo = {
  engine1: {
    roledInCount: 256,
    activatedCount: 211
  },
  engine2: {
    roledInCount: 256,
    activatedCount: 211
  },
  engine3: {
    roledInCount: 256,
    activatedCount: 211
  },
  engine4: {
    roledInCount: 256,
    activatedCount: 211
  }
}

export default {
  components: {
    'SevenDaysFlowLineChart': SevenDaysFlowLineChart,
    'importantDataPie': ImportantDataPieChart,
    'complianceDataPieChart': CompliancePieChart,
    'thirtyDaysComplianceDataLineChart': ThirtyDaysComplianceDataLineChart
  },
  data() {
    return {
      todayTotalFlow: '1.5 TB',
      oneDayBoost: '↑  15%',
      complianceRate: '73.1%',
      lineChartData: lineChartData.newVisitis,
      thirtyDaysComplianceDataLineChartData: thirtyDaysComplianceDataLineChartData,
      unComplianceTop10Data: unComplianceTop10Data,
      importantEvents: importantEvents,
      ruleInfo: ruleInfo,
      ruleEngineInfo: ruleEngineInfo
    }
  },
  computed: {
    myDashboard() {
      return myDashboard
    }
  },
  methods: {
    moreData(type) {
      switch (type) {
        case '数据概览':
          console.log('查看更多数据')
          alert('查看更多数据')
          break
        case '合规概览':
          console.log('查看更多合规数据')
          alert('查看更多合规数据')
          break
        case '重点事件通报':
          console.log('查看更多重点事件')
          alert('查看更多重点事件')
          break
        case '规则概览':
          console.log('查看更多规则')
          alert('查看更多规则')
          break
      }
    }
  }
}
</script>
