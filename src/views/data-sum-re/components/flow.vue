<template>
  <div class="table-wrapper">
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
              <span class="sub-value">{{ props.row.lastActive }}</span>
            </div>
            <div class="kv-row">
              <span class="sub-label">风险描述摘要</span>
              <span class="sub-value">{{ props.row.riskSummary }}</span>
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
        label="流量总量 (TB)"
        sortable
        min-width="120"
        align="center"
      />

      <!-- 流入流量 -->
      <el-table-column
        prop="inflow"
        label="流入流量 (TB)"
        sortable
        min-width="120"
        align="center"
      />

      <!-- 流出流量 -->
      <el-table-column
        prop="outflow"
        label="流出流量 (TB)"
        sortable
        min-width="120"
        align="center"
      />

      <!-- 关联IP数量 -->
      <el-table-column
        prop="ipCount"
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
          <span class="cross-rate">{{ scope.row.crossRate }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TrafficTable',
  data() {
    return {
      tableData: [
        {
          id: 1,
          domain: 'data.car-a.com',
          total: 850,
          inflow: 220,
          outflow: 630,
          ipCount: 28,
          countries: '美国、德国、中国',
          crossRate: 38,
          lastActive: '2025-07-31 10:30:00',
          riskSummary:
            '近期固定IP的流出流量在短时间内激增，疑含未脱敏的车机AI训练数据，存在境外传输合规风险。'
        },
        {
          id: 2,
          domain: 'telemetry.car-b.com',
          total: 1200,
          inflow: 1180,
          outflow: 20,
          ipCount: 56,
          countries: '新加坡、中国',
          crossRate: 5,
          lastActive: '2025-07-31 11:00:00',
          riskSummary:
            '存在周期性大流入，可能包含车辆实时位置与遥测数据，需要核查最小化原则。'
        },
        {
          id: 3,
          domain: 'api.car-c.com',
          total: 2100,
          inflow: 500,
          outflow: 1600,
          ipCount: 180,
          countries: '美国、巴西、中国',
          crossRate: 25,
          lastActive: '2025-07-31 09:15:00',
          riskSummary:
            '境外高峰时段调用集中，疑似研发测试接口被频繁访问，需限制测试账户权限。'
        },
        {
          id: 4,
          domain: 'ota.car-d.com',
          total: 1500,
          inflow: 1450,
          outflow: 50,
          ipCount: 12,
          countries: '印度、中国',
          crossRate: 2,
          lastActive: '2025-07-31 08:00:00',
          riskSummary:
            '主要为系统OTA推送，数据类型相对可控，整体安全风险较低。'
        },
        {
          id: 5,
          domain: 'hr.car-d.com',
          total: 15,
          inflow: 5,
          outflow: 10,
          ipCount: 3,
          countries: '美国、中国',
          crossRate: 95,
          lastActive: '2025-07-31 10:20:00',
          riskSummary:
            '流出比例异常偏高，或涉及员工敏感信息外发，需立即审计并加密脱敏。'
        },
        {
          id: 6,
          domain: 'map.car-c.com',
          total: 720,
          inflow: 500,
          outflow: 220,
          ipCount: 89,
          countries: '德国、法国、中国',
          crossRate: 60,
          lastActive: '2025-07-31 09:45:00',
          riskSummary:
            '地图瓦片/轨迹相关数据对外分发较多，涉及境外存储与访问频繁。'
        },
        {
          id: 7,
          domain: 'test-env.car-d.com',
          total: 8,
          inflow: 3,
          outflow: 5,
          ipCount: 6,
          countries: '日本、中国',
          crossRate: 45,
          lastActive: '2025-07-31 12:00:00',
          riskSummary:
            '测试环境接口频繁调用，存在跨境传输风险，应限制外网访问。'
        },
        {
          id: 8,
          domain: 'log.car-b.com',
          total: 5500,
          inflow: 5480,
          outflow: 20,
          ipCount: 320,
          countries: '德国、日本、中国',
          crossRate: 1,
          lastActive: '2025-07-31 07:50:00',
          riskSummary:
            '以日志备份为主，跨境比例极低，注意日志中PII的脱敏与访问控制。'
        }
      ]
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  height: 100%;           /* 表格充满父容器 */
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
