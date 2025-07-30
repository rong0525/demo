<template>
  <div class="overview-card">
    <div class="statistics">
      <img
        src="./123.png"
        class="icon"
        alt="图标"
      >
      <span class="text">共</span>
      <span class="number">{{ statistics.total }}</span>
      <span class="text">条重点事件</span>
    </div>
    <el-button type="primary" size="small" class="custom-rule-btn" style="background-color: #4560f7;font-size: 20px;">自定义通报规则</el-button>
    <div class="filters">
      <el-select v-model="eventType" placeholder="事件类型" size="small">
        <el-option v-for="item in eventTypes" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="severity" placeholder="严重程度" size="small">
        <el-option v-for="item in severityOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="status" placeholder="处理状态" size="small">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker v-model="timeRange" type="daterange" size="small" start-placeholder="开始日期" end-placeholder="结束日期" />
      <el-input v-model="searchKeyword" placeholder="请输入搜索关键词" prefix-icon="el-icon-search" size="small" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'Card1OverView',
  props: {
    statistics: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      eventType: '',
      severity: '',
      status: '',
      timeRange: '',
      searchKeyword: '',
      eventTypes: [
        { value: '高危', label: '高危' },
        { value: '中危', label: '中危' },
        { value: '低危', label: '低危' }
      ],
      severityOptions: [
        { value: '高', label: '高' },
        { value: '中', label: '中' },
        { value: '低', label: '低' }
      ],
      statusOptions: [
        { value: '待处理', label: '待处理' },
        { value: '处理中', label: '处理中' },
        { value: '已处理', label: '已处理' }
      ]
    }
  }
}
</script>

<style scoped>
.overview-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  width: calc(100% - 20px); /* 关键修改：宽度减少20px */
  padding-right: 0.25rem;
  height: 8.8125rem;
  padding: 1.25rem 1.625rem 1.25rem 1.25rem;
  align-items: center;
  height: 175px;
  margin-top: -20px;
  margin-bottom: -20px;

}

.statistics {
  display: flex;
  align-items: center;
  padding-left: 30px; /* 增加左侧间距 */
   /* 与右侧元素保持间距 */
  padding-right: 30px;

}

.icon {
  width: 40px;
  height: 40px;
  color: #4560F7;
  margin-right: 12px;

}

.text {
  color: #828282;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
}

.filters {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 10px;
}

.filters .el-select, .filters .el-date-picker, .filters {
  width: 100px;

}
.el-input{
  width: 150px;
}
.number {
  color: #4560F7;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%;
  letter-spacing: -0.48px;
  margin-right: 7px;
  margin-left: 7px;
}

</style>
