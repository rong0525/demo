<template>
  <div class="audit-container">
    <div class="content-card">
      <el-row>
        <el-col :span="4" class="left-section">
          <div class="left-sidebar">
            <div class="upload-area">
              <div class="upload-box">
                <i class="el-icon-plus" />
                <p>拖拽至此上传文件</p>
              </div>
              <p class="support-type">支持文件类型：.pcap</p>

              <div class="file-list">
                <div class="file-item">
                  <i class="el-icon-document" />
                  <span>test.pcap</span>
                  <i class="el-icon-check success-icon" />
                </div>
              </div>

              <el-button type="primary" class="start-btn" style="background-color: rgb(69,96,247);">开始分析</el-button>
            </div>

            <div class="steps-container">
              <div class="step">
                <div class="step-circle active">1</div>
                <div class="step-text">正在解析文件</div>
              </div>
              <div class="step-line" />
              <div class="step">
                <div class="step-circle current">2</div>
                <div class="step-text active-text">规则引擎检测中</div>
              </div>
              <div class="step-line" />
              <div class="step">
                <div class="step-circle">3</div>
                <div class="step-text">审计完成</div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="20" class="right-section">
          <div class="main-content">
            <div class="header">
              <h2 style="color: rgb(69,96,247);">审计结果</h2>
              <div class="date-filter">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </div>
            </div>

            <el-table :data="auditData" border style="width: 100%;" class="custom-table">
              <el-table-column prop="id" label="序号" width="80" sortable>
                <template slot-scope="scope">
                  {{ scope.row.id }}
                </template>
              </el-table-column>

              <el-table-column prop="violationId" label="违规项ID" width="120" sortable>
                <template slot-scope="scope">
                  {{ scope.row.violationId }}
                </template>
              </el-table-column>

              <el-table-column prop="regulation" label="对应法规标准" width="200" sortable>
                <template slot-scope="scope">
                  {{ scope.row.regulation }}
                </template>
              </el-table-column>

              <el-table-column prop="description" label="违规描述" sortable>
                <template slot-scope="scope">
                  {{ scope.row.description }}
                </template>
              </el-table-column>

              <el-table-column prop="dataAsset" label="涉及数据资产" width="180" sortable>
                <template slot-scope="scope">
                  {{ scope.row.dataAsset }}
                </template>
              </el-table-column>

              <el-table-column prop="subject" label="违规主体 (域名/IP)" width="200" sortable>
                <template slot-scope="scope">
                  {{ scope.row.subject }}
                </template>
              </el-table-column>
            </el-table>

            <div class="footer">
              <el-button type="primary" class="report-btn" style="background-color: rgb(69,96,247);">生成报告</el-button>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
export default {
  name: 'AuditResults',
  data() {
    return {
      dateRange: '',
      auditData: [
        {
          id: 1,
          violationId: 'PII-001',
          regulation: '《个人信息保护法》',
          description: '未经用户同意，向第三方共享用户的精确地理位置信息。',
          dataAsset: '用户行程轨迹数据',
          subject: 'third-party-tracker.com'
        },
        {
          id: 2,
          violationId: 'PII-002',
          regulation: '《个人信息保护法》',
          description: '在未告知用户的情况下，收集并分析驾驶员的生物特征数据。',
          dataAsset: '驾驶员生物特征数据',
          subject: 'biometric-analytics.com'
        },
        {
          id: 3,
          violationId: 'CDR-001',
          regulation: '《汽车数据安全管理若干规定》',
          description: '未经许可，将中国境内的车辆诊断数据传输至位于境外的服务器。',
          dataAsset: '车辆识别码、控制指令',
          subject: 'diagnostics.eu.com'
        },
        {
          id: 4,
          violationId: 'MAP-001',
          regulation: '《汽车数据出境安全指引》',
          description: '在未进行安全评估的情况下，将高精度地图矢量数据上传至国外云存储。',
          dataAsset: '高精度地图数据',
          subject: 'map-storage.us.com'
        },
        {
          id: 5,
          violationId: 'SEC-001',
          regulation: '《汽车整车信息安全技术要求》',
          description: '车辆通信模块使用弱加密算法，导致数据传输过程中存在被窃听的风险。',
          dataAsset: '网联通信数据',
          subject: '192.168.10.254'
        },
        {
          id: 6,
          violationId: 'OTA-001',
          regulation: '《汽车数据安全管理若干规定》',
          description: 'OTA升级服务绕过安全审核，直接从非授权服务器下载更新文件。',
          dataAsset: 'OTA数据',
          subject: 'unauthorized-ota.cdn'
        },
        {
          id: 7,
          violationId: 'TRAF-001',
          regulation: '《智能网联汽车时空数据安全处理基本要求》',
          description: '车辆在特定区域（如军事管理区）收集的车辆流量数据被上传至公网。',
          dataAsset: '车辆流量数据',
          subject: 'data-collector.cn'
        },
        {
          id: 8,
          violationId: 'BIO-001',
          regulation: '《个人信息保护法》',
          description: '远程监控系统在未脱敏的情况下，传输包含车内人员真实人脸和车辆号牌的图像。',
          dataAsset: '真实人脸数据、真实汽车号牌数据',
          subject: 'monitor.cloud.io'
        },
        {
          id: 9,
          violationId: 'GEO-001',
          regulation: '《智能网联汽车时空数据传感器安全基本要求》',
          description: '车辆收集的原始点云数据中包含了敏感地理信息，且未经处理就进行了传输。',
          dataAsset: '车辆点云数据',
          subject: 'raw-data-stream.com'
        }
      ]
    }
  }
}
</script>

<style scoped>

.audit-container {
  display: flex;
  width: 100%;
  min-height: 70vh;
  background-color: rgb(238,238,238);
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中，可选 */
}

.left-section {
  padding-right: 20px;

  border-right: 1px solid #ebeef5;
}

.right-section {
  padding-left: 20px;
}

.content-card {
  width: 95%;
  background: white;
  border-radius: 8px;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-top: 20px;
}

.left-sidebar {
  padding: 20px;
  border-right: 1px solid #ebeef5;
  height: 100%;
  background: white;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-box {
  width: 180px;
  height: 280px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.upload-box i {
  font-size: 28px;
  color: #8c939d;
}

.upload-box p {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}

.support-type {
  font-size: 12px;
  color: #909399;
  margin-bottom: 15px;
}

.file-list {
  width: 100%;
  margin-top: 10px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.file-item i {
  margin-right: 5px;
  color: #909399;
}

.success-icon {
  margin-left: auto;
  color: #67c23a;
}

.start-btn {
  width: 100%;
  margin-top: 20px;
}

.steps-container {
  margin-top: 50px;
}

.step {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.step-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #606266;
  margin-right: 10px;
}

.step-circle.active, .step-circle.current {
  background-color: #409EFF;
  color: white;
}

.step-text {
  color: #606266;
}

.active-text {
  color: #409EFF;
  font-weight: bold;
}

.step-line {
  width: 2px;
  height: 20px;
  background-color: #e6e6e6;
  margin-left: 15px;
}

.main-content {
  padding: 20px;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  color: #303133;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.report-btn {
  font-size: 14px;

}

.custom-table {
  color: rgb(143,143,143);
}
</style>
