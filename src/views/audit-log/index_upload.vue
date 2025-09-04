<template>
  <div class="container-wrapper">
    <el-row :gutter="20" class="cards-row">
      <!-- 左侧区域 -->
      <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="4">
        <el-card class="box-card fixed-height-card" shadow="never">
          <div slot="header" class="clearfix blue-background">
            <span>文件上传与分析</span>
          </div>
          <div class="card-content">
            <!-- 文件上传区域 -->
            <div class="upload-area">
              <el-upload
                class="upload-box"
                accept=".pcap,.pcapng"
                :on-change="handleFileChange"
                :http-request="uploadFile"
                :auto-upload="true"
              >
                <i class="el-icon-plus" />
                <p>点击上传</p>
              </el-upload>
              <p class="support-type">支持文件类型：.pcap, .pcapng</p>

              <!-- 文件列表 -->
              <el-select v-model="selectedFile" placeholder="请选择文件" class="file-select" @change="handleFileSelect">
                <el-option
                  v-for="item in uploadedFiles"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span v-if="item.status === 'success'" style="float: right; color: #67c23a"><i class="el-icon-check" /></span>
                  <span style="float: right; color: #f56c6c; margin-right: 10px" @click.stop="removeFile(item.name)"><i class="el-icon-close" /></span>
                </el-option>
              </el-select>

              <el-button type="primary" class="start-btn" :disabled="!selectedFile" @click="startAnalysis">开始分析</el-button>
            </div>

            <!-- 进度指示器 -->
            <div class="steps-container">
              <div v-for="step in 3" :key="step" class="step">
                <div class="step-wrapper">
                  <div :class="['step-circle', { active: step < currentStep, current: step === currentStep, 'current-number': step === currentStep }]">
                    {{ step }}
                  </div>
                  <div :class="['step-text', { 'active-text': step === currentStep }]">
                    {{ step === 1 ? '正在解析文件' : step === 2 ? '规则引擎检测中' : '审计完成' }}
                  </div>
                </div>
                <div v-if="step < 3" class="step-line-wrapper">
                  <div class="step-line" />
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧区域 -->
      <el-col :xs="24" :sm="24" :md="18" :lg="20" :xl="20">
        <el-card class="box-card fixed-height-card" shadow="never">
          <div slot="header" class="clearfix blue-background">
            <span style="color: rgb(69,96,247); font-size: 28px;">审计结果</span>
          </div>
          <div class="card-content table-container">
            <el-table
              :data="filteredTableData"
              border
              style="width: 100%"
              height="100%"
              class="custom-table"
            >
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
            <!-- 分页器 -->
            <div class="fixed-pagination">
              <el-pagination
                background
                layout="prev, pager, next, jumper"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="filteredTotal"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AuditResults',
  data() {
    return {
      originalTableData: [
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
      ],
      activeFilter: 'all',
      currentPage: 1,
      pageSize: 15,
      currentStep: 1,
      selectedFile: '',
      uploadedFiles: []
    }
  },
  computed: {
    filteredTableData() {
      let data = this.originalTableData
      if (this.activeFilter !== 'all') {
        data = data.filter(item => item.regulation === this.activeFilter)
      }
      const start = (this.currentPage - 1) * this.pageSize
      return data.slice(start, start + this.pageSize)
    },
    filteredTotal() {
      let data = this.originalTableData
      if (this.activeFilter !== 'all') {
        data = data.filter(item => item.regulation === this.activeFilter)
      }
      return data.length
    }
  },
  methods: {
    handleFileChange(file) {
      const newFile = { name: file.name, status: 'success' }
      this.uploadedFiles.push(newFile)
      this.selectedFile = file.name
      this.$message.success(`已选择文件：${file.name}`)
    },
    async uploadFile({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$message.success('文件上传成功')
        this.currentStep = 1 // 开始解析
        // 假设后端返回分析结果，更新表格数据
        if (response.data && response.data.results) {
          this.originalTableData = response.data.results
          this.currentStep = 3 // 审计完成
        }
      } catch (error) {
        this.$message.error('文件上传失败')
        console.error(error)
      }
    },
    removeFile(fileName) {
      this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== fileName)
      if (this.selectedFile === fileName) {
        this.selectedFile = this.uploadedFiles.length > 0 ? this.uploadedFiles[0].name : ''
      }
    },
    handleFileSelect(value) {
      this.selectedFile = value
    },
    startAnalysis() {
      if (!this.selectedFile) {
        this.$message.warning('请选择文件！')
        return
      }
      this.$message.success('分析已开始')
      this.currentStep = 1
      // 调用后端分析API
      axios.post('/api/analyze', { file: this.selectedFile })
        .then(response => {
          this.currentStep = 2 // 规则引擎检测中
          if (response.data && response.data.results) {
            this.originalTableData = response.data.results
            this.currentStep = 3 // 审计完成
          }
        })
        .catch(error => {
          this.$message.error('分析失败')
          console.error(error)
        })
    },
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
:root {
  --primary-color: #4560F7;
}

.container-wrapper {
  padding: 20px;
  background-color: #f5f5f5;
}

.cards-row {
  display: flex;
  flex-wrap: wrap;
}

.box-card {
  height: 100%;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2) !important;
}

.fixed-height-card {
  height: calc(100vh - 12vh);
  display: flex;
  flex-direction: column;
}

.fixed-height-card .el-card__body {
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}

.blue-background {
  background-color: var(--primary-color);
  color: #fff;
  padding: 15px;
  font-weight: bold;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.upload-box {
  width: 100%;
  height: 250px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #fff;
  padding-top: 20px;
}

.upload-box i {
  font-size: 28px;
  color: #8c939d;
}

.upload-box p {
  font-size: 12px;
  color: #606266;
  margin: 0;
  padding-top: 20px;
  text-align: center;
}

.support-type {
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}

.file-select {
  width: 100%;
  margin-bottom: 10px;
}

.start-btn {
  width: 100%;
  background-color: #4560F7;
  border-color: #4560F7;
}

.steps-container {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 100%;
}

.step-wrapper {
  display: flex;
  align-items: center;
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
  flex-shrink: 0;
}

.step-circle.active,
.step-circle.current {
  background-color: var(--primary-color);
  color: white;
}

.step-circle.current-number {
  background-color: rgb(64,158,255);
}

.step-text {
  color: #606266;
  margin-left: 10px;
}

.active-text {
  color: var(--primary-color);
  font-weight: bold;
}

.step-line-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 5px;
}

.step-line {
  width: 2px;
  height: 40px;
  background-color: #e6e6e6;
  margin-left: 15px;
  flex-shrink: 0;
}

.table-container {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.custom-table {
  color: #606266;
}

.fixed-pagination {
  position: sticky;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 2;
  padding: 8px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
