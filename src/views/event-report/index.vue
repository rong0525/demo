<template>
  <div class="app-container">
    <main-content>
      <content-layout>
        <card1-over-view :statistics="statistics" />
        <!-- 修改这部分，添加一个容器来横向布局事件卡片 -->
        <div class="events-container">
          <card2-event v-for="(event, index) in eventList" :key="index" :event="event" />
        </div>
      </content-layout>
    </main-content>
  </div>
</template>

<script>
import MainContent from './components/MainContent'
import ContentLayout from './components/ContentLayout'
import Card2Event from './components/Card2-event'
import Card1OverView from './components/Card1-overView'
// import ContentHeader from './components/ContentHeader'
// import ContentTitle from './components/ContentTitle'

export default {
  name: 'EventReport',
  components: {
    MainContent,
    ContentLayout,
    Card2Event,
    Card1OverView
    // ContentHeader,
    // ContentTitle
  },
  data() {
    return {
      statistics: {
        total: 12585
      },
      eventList: [
        {
          type: '高危',
          title: '车辆定位数据存在大规模未经授权传输风险',
          time: '2025-07-18 10:15:30',
          description: '监测到某批次车辆（VIN范围：ABC001-ABC999）的近15万条高精度定位数据，疑似通过非合规渠道流出，风险等级极高。',
          dataAmount: '150,000条高精度定位数据',
          severity: '高',
          status: '待处理'
        },
        {
          type: '中危',
          title: '人脸图像未脱敏存储',
          time: '2025-07-17 08:30:15',
          description: '人脸图像数据在存储过程中未进行必要的脱敏处理，可能导致用户隐私泄露风险。涉及数据包括通过车载摄像头采集的用户面部图像，未采用模糊化、匿名化或其他脱敏技术，直接以明文形式存储于云端数据库，可能存在数据泄露或滥用风险。',
          dataAmount: '58,000条用户账号数据',
          severity: '中',
          status: '处理中'
        },
        {
          type: '低危',
          title: '车辆系统日志出现大量数据丢失告警',
          time: '2025-07-16 15:45:22',
          description: '机系统日志记录出现异常，大量日志数据丢失，涉及车辆运行状态、传感器数据记录和用户交互日志。缺失的日志数据可能影响系统安全性审计、故障追溯以及合规性检查的能力，违反车联网数据完整性管理规范。初步分析可能由系统缓存溢出或日志存储模块故障引起。',
          dataAmount: '25,000条系统日志',
          severity: '低',
          status: '已处理'
        }
      ]
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  background-color: #EEE;
  height: 100%;
}

/* 添加这个样式来实现卡片的横向布局 */
.events-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
  gap: 15px;
  width: calc(100% - 20px); /* 关键修改：宽度减少20px */
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
