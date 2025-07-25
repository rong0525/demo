<template>
  <div class="event-card">
    <div class="event-header">
      <div class="event-type">
        <i class="el-icon-folder"></i>
        <span class="type-label" :class="typeClass">[{{ event.type }}]</span>
        {{ event.title }}
      </div>
      <div class="underline"></div>
    </div>
    
    <div class="event-time">{{ event.time }}</div>
    
    <div class="event-description">{{ event.description }}</div>
    
    <div class="event-data-amount">
      <span>涉及数据：{{ event.dataAmount }}</span>
    </div>
    
    <div class="event-footer">
      <div class="event-tags">
        <div class="tag-item">
          <span class="tag-label">严重程度：</span>
          <el-tag :type="severityType" size="medium" class="custom-tag">{{ event.severity }}</el-tag>
        </div>
        
        <div class="tag-item">
          <span class="tag-label">处理状态：</span>
          <el-tag :type="statusType" size="middle" class="custom-tag">{{ event.status }}</el-tag>
        </div>
      </div>
      
      <div class="details-action">
        <el-button type="text" class="details-btn" style="font-size: 24px; line-height: 150%;">查看详情/处理</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card2Event',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    typeClass() {
      switch (this.event.type) {
        case '高危':
          return 'high-risk'
        case '中危':
          return 'medium-risk'
        case '低危':
          return 'low-risk'
        default:
          return ''
      }
    },
    severityType() {
      switch (this.event.severity) {
        case '高':
          return 'danger'
        case '中':
          return 'warning'
        case '低':
          return 'info'
        default:
          return ''
      }
    },
    statusType() {
      switch (this.event.status) {
        case '待处理':
          return 'danger'
        case '处理中':
          return 'warning'
        case '已处理':
          return 'success'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.event-card {
  display: flex;
  flex-direction: column;
  width: 31%;
  min-width: 400px;
  padding: 40px;
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin: 10px;
  position: relative;
}

.event-header {
  margin-bottom: 20px;
  margin-top: 20px;
}

.event-type {
  display: flex;
  align-items: center;
  font-size: 32px;
  color: #4560f7;        /* 亮蓝色文字（RGB: 69, 96, 247） */
  position: relative;      /* 相对定位（用于内部绝对定位元素的参考） */
  text-align: center;     /* 文本水平居中（对子级内联元素生效） */
  display: flex;          /* Flex 弹性布局 */
}

.event-type i {
  color: #4560F7;
  font-size: 32px;
  margin-right: 8px;
  flex-shrink: 0; /* 防止图标被压缩 */
}

.type-label {
  margin-right: 20px;
  font-size: 32px;
  font-weight: bold;
  flex-shrink: 0; /* 防止类型标签被压缩 */
}

.underline {
  height: 1px;
  background-color: #EBEEF5;
  margin-top: 8px;
  width: 100%;
}

.high-risk {
  color: #f7455a;
}

.medium-risk {
  color: #E6A23C;
}

.low-risk {
  color: #67C23A;
}

.event-time {
  font-size: 20px;
    line-height: 150%;       /* 行高为字体大小的 1.5 倍（30px） */
  color: #909399;
  margin-bottom: 16px;
  text-align: right;
  
  
}

.event-description {
    width: 90%;
    position: center;
  font-size: 24px;
  color: #828282;
  margin-bottom: 16px;
  margin-left: 20px;
  line-height: 150%;
}

.event-data-amount {
  font-size: 24px;
  color: #828282;
  margin-bottom: 16px;
    line-height: 150%;
    margin-left: 20px;
}

.event-footer {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.event-tags {
  margin-bottom: 16px;
  
}

.tag-item {
  display: flex;
  align-items: center;
  font-size: 24px;
  line-height: 150%;       /* 行高为字体大小的 1.5 倍（即 36px） */
  margin-bottom: 8px;
  margin-left: 20px;
}

.tag-label {
  margin-right: 8px;
  color: #606266;
  line-height: 150%;    
   font-size: 24px;
    margin-bottom: 8px;
  margin-left: 20px;
  
}

.custom-tag {
  width: 80px;
  text-align: center;
  font-size: 24px;
        
}

.details-action {
  text-align: right;
  font-size: 24px;
  line-height: 150%;       /* 行高为字体大小的 1.5 倍（即 36px） */
}

.details-btn {
  color: #4560F7;
  padding: 0;
}

@media (max-width: 1200px) {
  .event-card {
    width: 45%;
  }
}

@media (max-width: 768px) {
  .event-card {
    width: 100%;
  }
}
</style>