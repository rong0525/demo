<template>
  <div class="app-container">
    <main-content>
      <content-layout>
        <content-header>
          <content-title style="font-size: 40px; margin-top: 20px;">重点事件通报</content-title>
        </content-header>
        <content-layout>
            <card1-over-view :statistics="statistics" />
            <!-- 修改这部分，添加一个容器来横向布局事件卡片 -->
            <div class="events-container">
              <card2-event v-for="(event, index) in eventList" :key="index" :event="event" /> 
            </div>
        </content-layout>

      </content-layout>
    </main-content>
  </div>
</template>

<script>
import MainContent from './components/MainContent'
import ContentLayout from './components/ContentLayout'
import Card2Event from './components/Card2-event'
import Card1OverView from './components/Card1-overView'
import ContentHeader from './components/ContentHeader'
import ContentTitle from './components/ContentTitle'

export default {
  name: 'EventReport',
  components: {
    MainContent,
    ContentLayout,
    Card2Event,
    Card1OverView,
    ContentHeader,
    ContentTitle
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
          title: '用户账号信息异常访问频率增高',
          time: '2025-07-17 08:30:15',
          description: '系统监测到多个IP地址频繁访问用户账号信息，疑似信息泄露',
          // dataAmount: '58,000条用户账号数据',
          // severity: '中',
          // status: '处理中'
        },
        {
          type: '低危',
          title: '系统日志记录不完整风险',
          time: '2025-07-16 15:45:22',
          description: '部分系统日志记录不完整，可能影响安全审计和追溯能力',
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
}

/* 添加这个样式来实现卡片的横向布局 */
.events-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 90%;
  gap: 15px;
 width: calc(100% - 20px); /* 关键修改：宽度减少20px */
  background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>