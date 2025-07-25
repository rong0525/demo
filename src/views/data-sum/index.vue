<template>
  <div class="dashboard-container">
    <!-- 顶部统计栏 -->
    <TopStats />

    <div class="middle-content">
      <div class="content-card"><DataTrend /></div>
      <div class="content-card"><DataClassification /></div>
      <div class="content-card"><AssetList /></div>
    </div>
  </div>
</template>

<script>
import TopStats from './components/TopStats.vue'
import DataTrend from './components/DataTrend.vue'
import DataClassification from './components/DataClassification.vue'
import AssetList from './components/AssetList.vue'
export default {
  name: 'DataSum',
  components: {
    TopStats,
    DataTrend,
    DataClassification,
    AssetList
  },
  methods: {
    // 处理资产详情查看

  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color:#eff1f4;;
}

.middle-content {
  margin-top: 20px;
  display: flex;
  gap: 30px;
  height: calc(100vh - 350px);
}
.content-card {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
/* 响应式调整 */
@media (max-width: 1200px) {
  .middle-content {
    flex-direction: column;
    height: auto;
  }

  .content-card {
    margin-bottom: 20px;
  }
}
</style>
