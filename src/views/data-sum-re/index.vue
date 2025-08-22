<template>
  <div class="dashboard-container">
    <!-- 顶部统计栏 -->
    <top-status />
    <el-tabs class="middle-content" type="border-card">
      <el-tab-pane label="流量分析">流量分析</el-tab-pane>
      <el-tab-pane label="数据资产">
        <data-asset />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TopStatus from '@/views/data-sum-re/components/TopStatus.vue'
import DataAsset from '@/views/data-sum-re/components/DataAsset.vue'
export default {
  name: 'DataSum',
  components: {
    TopStatus,
    DataAsset
  },
  methods: {
    // 处理资产详情查看

  }
}
</script>

<style scoped>
.dashboard-container {
  padding-top: 20px;
  padding-left: 6vh;
  padding-right: 6vh;
  background-color:#eff1f4;;
}

.middle-content {
  margin-top: 3vh;
  gap: 30px;
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
