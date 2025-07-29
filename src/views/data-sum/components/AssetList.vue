<template>
  <el-card class="content-card">
    <div class="title">数据资产列表</div>
    <div class="filter-bar">
      <el-select v-model="filter.level" placeholder="级别">
        <el-option label="全部" value="" />
        <el-option label="重要" value="重要" />
        <el-option label="一般" value="一般" />
      </el-select>

      <el-select v-model="filter.status" placeholder="状态">
        <el-option label="全部" value="" />
        <el-option label="合规" value="合规" />
        <el-option label="不合规" value="不合规" />
        <el-option label="待处理" value="待处理" />
      </el-select>

      <el-select v-model="filter.source" placeholder="来源">
        <el-option label="全部" value="" />
        <el-option label="内部系统" value="内部系统" />
        <el-option label="外部接口" value="外部接口" />
        <el-option label="手动录入" value="手动录入" />
      </el-select>

      <el-date-picker
        v-model="filter.date"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        class="filter-item compact-date-picker"
      />

      <el-button type="default" @click="resetFilter">清空</el-button>
    </div>

    <el-table
      :data="filteredAssets"
      style="width: 100%; margin-top: 15px;"
    >

      <!-- 第一列，分配更多空间 -->
      <el-table-column
        prop="name"
        label="数据名称"
        min-width="200"
        show-overflow-tooltip
      />

      <!-- 第二列 -->
      <el-table-column
        prop="level"
        label="分级"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.level === '重要' ? 'warning' : 'info'">
            {{ scope.row.level }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 第三列 -->
      <el-table-column
        prop="status"
        label="合规状态"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.status)">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        label="操作"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-card>

</template>

<script>
export default {
  name: 'AssetList',
  data() {
    return {
      // 资产列表数据 - 组件内部维护
      assetData: [
        { name: '车辆位置日志_20250708', level: '重要', status: '合规' },
        { name: '用户生物特征数据_001', level: '重要', status: '不合规' },
        { name: '实时点云流_前视_20250708', level: '重要', status: '合规' },
        { name: '车牌图像集_停车场A_批次1', level: '重要', status: '待处理' },
        { name: '驾驶员身份验证记录_20250707', level: '重要', status: '合规' },
        { name: '充电桩使用历史_地区C', level: '一般', status: '合规' },
        { name: '道路构图数据更新包_V3.1', level: '重要', status: '合规' },
        { name: '异常车速告警数据_0707', level: '重要', status: '不合规' },
        { name: '惯导系统原始数据_车辆VX90', level: '重要', status: '合规' },
        { name: '敏感区域通行记录_城区B', level: '重要', status: '不合规' }
      ],
      // 筛选条件 - 组件内部维护
      filter: {
        level: '',
        status: ''
      }
    }
  },
  computed: {
    // 筛选后的资产列表
    filteredAssets() {
      return this.assetData.filter(item => {
        if (this.filter.level && item.level !== this.filter.level) return false
        if (this.filter.status && item.status !== this.filter.status) return false
        return true
      })
    }
  },
  methods: {
    // 根据状态获取标签类型
    getTagType(status) {
      switch (status) {
        case '合规': return 'success'
        case '不合规': return 'danger'
        case '待处理': return 'warning'
        default: return 'info'
      }
    },

    // 重置筛选条件
    resetFilter() {
      this.filter = {
        level: '',
        status: '',
        source: '',
        date: ''
      }
    },

    // 查看详情，通过事件传递给父组件
    handleDetail(row) {
      this.$emit('view-detail', row)
    }
  }
}
</script>

<style scoped>
.title {
    color: #4560F7;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 48px */
    letter-spacing: -0.32px;
}
.content-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* padding: 20px; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
  min-width: 300px;
  overflow: hidden;

}

/* 筛选栏样式 */
.filter-bar {
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
}
</style>
