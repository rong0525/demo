<template>
  <div v-loading="loading" class="table-wrapper">
    <el-table
      :data="tableData"
      row-key="id"
      height="100%"
      style="width: 100%"
    >
      <!-- 展开列：只在展开时显示详细信息，两行固定小标题 -->
      <el-table-column type="expand" width="48">
        <template slot-scope="props">
          <div class="expand-wrap">
            <div class="kv-row">
              <span class="sub-label">最近活跃时间</span>
              <span class="sub-value">{{ props.row.last_active }}</span>
            </div>
            <div class="kv-row">
              <span class="sub-label">风险描述摘要</span>
              <span class="sub-value">{{ props.row.risk_summary }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <!-- 域名/IP -->
      <el-table-column
        prop="domain"
        label="域名/IP"
        sortable
        min-width="200"
        show-overflow-tooltip
      />

      <!-- 流量总量 -->
      <el-table-column
        prop="total"
        label="流量总量"
        sortable
        min-width="120"
        align="center"
      />

      <!-- 流入流量 -->
      <el-table-column
        prop="inflow"
        label="流入流量"
        sortable
        min-width="120"
        align="center"
      />

      <!-- 流出流量 -->
      <el-table-column
        prop="outflow"
        label="流出流量"
        sortable
        min-width="120"
        align="center"
      />

      <!-- 关联IP数量 -->
      <el-table-column
        prop="ip_count"
        label="关联IP数量 (个)"
        sortable
        min-width="120"
        align="center"
      />

      <!-- 通联国家 -->
      <el-table-column
        prop="countries"
        label="通联国家 (地区)"
        min-width="220"
        show-overflow-tooltip
      />

      <!-- 跨境数据占比 -->
      <el-table-column
        prop="crossRate"
        label="跨境数据占比 (%)"
        sortable
        min-width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span class="cross-rate">{{ scope.row.cross_rate }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TrafficTable',
  data() {
    return {
      tableData: [],
      loading: true
    }
  },
  created() {
    this.fetchTableData()
  },
  methods: {
    async fetchTableData() {
      this.loading = true
      try {
        const options = {
          method: 'GET',
          url: 'http://10.21.147.42:8080/api/v2/tables/mfemcbrwc4tik3r/records',
          params: {
            offset: '0',
            limit: '25',
            where: '',
            viewId: 'vw7x8jom2tfll2tm'
          },
          headers: {
            'xc-token': 'WnJQ2xH9_TFUsjaeUI-sVHWKkDatX7ObFEp8hSVw'
          }
        }
        const res = await axios.request(options)
        this.tableData = res.data.list || []
      } catch (e) {
        this.tableData = []
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  height: 60vh; /* 或100%，根据父容器实际高度调整 */
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.el-table {
  flex: 1;
  border-left: none !important;
  border-right: none !important;
}

/* 表头样式 */
.el-table th {
  background: #fafafa;
  font-weight: 700; /* 粗体 */
  color: #828282;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 150%;
  letter-spacing: -0.01rem;
  border-bottom: 2px solid #e5e5e5 !important; /* 横线加粗 */
}

/* 内容单元格样式 */
.el-table td {
  color: #828282;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 400; /* 正常字重 */
  line-height: 150%;
  letter-spacing: -0.01rem;
  border-bottom: 2px solid #e5e5e5 !important; /* 横线加粗 */
}

/* 去掉竖线 */
.el-table td,
.el-table th.is-leaf {
  border-right: none !important;
}

/* 橘色固定样式：正常字重 */
.cross-rate {
  color: #f0ad4e !important;
  font-weight: 400;
  font-size: 1.1rem;
}

/* 展开区块样式：两行，小标题与表头一致风格 */
.expand-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 0 2px 0;
  /* border-top: 2px dashed #e8e8e8; 分隔线加粗 */
}

.kv-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  line-height: 150%;
}

/* 小标题（固定文案）：沿用表头的风格，粗体 */
.sub-label {
  min-width: 8em;
  color: #828282;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.01rem;
  margin-left: 60px;
}

/* 小标题右侧内容：正常字重 */
.sub-value {
  color: #828282;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.01rem;
  white-space: normal;
  word-break: break-all;
}
</style>
