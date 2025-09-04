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
                :auto-upload="false"
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
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix blue-background">
            <span style="color: rgb(69,96,247); font-size: 28px;">审计结果</span>
          </div>
          <div class="card-content table-container">
            <el-table
              :data="filteredTableData"
              border
              style="width: 100%"
              :max-height="tableMaxHeight"
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
            <div class="footer">
              <el-button type="primary" class="report-btn" style="background-color: rgb(69,96,247);" @click="generateReport">生成报告</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { saveAs } from 'file-saver' // 导入 saveAs 函数

export default {
  name: 'AuditResults',
  data() {
    return {
      dateRange: [],
      originalTableData: [],
      activeFilter: 'all',
      currentPage: 1,
      pageSize: 10,
      currentStep: 1,
      selectedFile: '',
      uploadedFiles: [],
      tableMaxHeight: 0 // 动态计算表格最大高度
    }
  },
  computed: {
    filteredTableData() {
      let data = this.originalTableData
      if (this.activeFilter !== 'all') {
        data = data.filter(item => item.regulation === this.activeFilter)
      }
      if (this.dateRange && this.dateRange.length === 2) {
        // 假设数据包含 date 字段，实际需根据后端数据结构调整
        // data = data.filter(item => item.date >= this.dateRange[0] && item.date <= this.dateRange[1]);
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
  mounted() {
    this.fetchData()
    this.calculateTableHeight() // 计算表格高度
    window.addEventListener('resize', this.calculateTableHeight) // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateTableHeight) // 清理事件监听
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://10.122.216.193:8080/api/audits')
        this.originalTableData = response.data
        this.calculateTableHeight() // 数据更新后重新计算高度
      } catch (error) {
        console.error('获取审计结果失败:', error)
        this.$message({
          message: '获取审计结果失败，请检查后端服务',
          type: 'error',
          offset: 100
        })
      }
    },
    calculateTableHeight() {
      this.$nextTick(() => {
        const card = this.$el.querySelector('.fixed-height-card')
        const pagination = this.$el.querySelector('.fixed-pagination')
        const footer = this.$el.querySelector('.footer')
        if (card && pagination && footer) {
          const cardHeight = card.clientHeight
          const paginationHeight = pagination.clientHeight
          const footerHeight = footer.clientHeight
          this.tableMaxHeight = cardHeight - paginationHeight - footerHeight - 20 // 减去边距
        }
      })
    },
    handleFileChange(file) {
      this.uploadedFiles.push({ name: file.name, status: 'success', raw: file.raw })
      this.selectedFile = file.name
      this.$message({
        message: `已选择文件：${file.name}`,
        type: 'success',
        offset: 100
      })
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
    async startAnalysis() {
      if (!this.selectedFile) {
        this.$message({
          message: '请选择文件！',
          type: 'warning',
          offset: 100
        })
        return
      }

      const selectedFileObj = this.uploadedFiles.find(file => file.name === this.selectedFile)
      if (!selectedFileObj || !selectedFileObj.raw) {
        this.$message({
          message: '未找到文件数据',
          type: 'error',
          offset: 100
        })
        return
      }

      const formData = new FormData()
      formData.append('file', selectedFileObj.raw)
      this.currentStep = 1
      try {
        const response = await axios.post('http://10.122.216.193:8080/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.$message({
          message: response.data.message,
          type: 'success',
          offset: 100
        })
        await this.fetchData()
        setTimeout(() => { this.currentStep = 2 }, 1000)
        setTimeout(() => {
          this.currentStep = 3
          this.$message({
            message: '分析完成',
            type: 'success',
            offset: 100
          })
        }, 2000)
      } catch (error) {
        console.error('上传错误:', error)
        let errorMessage = '文件上传失败'
        if (error.response) {
          errorMessage += `: ${error.response.data.message || error.response.statusText}`
        } else if (error.request) {
          errorMessage += ': 无法连接到服务器，请检查后端服务是否运行'
        } else {
          errorMessage += `: ${error.message}`
        }
        this.$message({
          message: errorMessage,
          type: 'error',
          offset: 100
        })
        this.currentStep = 1
      }
    },
    handleSelectFilter(key) {
      this.activeFilter = key
      this.currentPage = 1
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    async generateReport() {
      try {
        const response = await axios.get('http://10.122.216.193:8080/api/generate-report', {
          responseType: 'blob' // 确保接收二进制数据
        })
        const blob = new Blob([response.data], { type: 'application/pdf' }) // 明确指定 PDF 类型
        saveAs(blob, `Audit_Report_${new Date().toISOString().split('T')[0]}.pdf`)
        this.$message({
          message: '报告生成成功，已下载！',
          type: 'success',
          offset: 100
        })
      } catch (error) {
        console.error('生成报告失败:', error)
        let errorMessage = '生成报告失败，请检查后端服务'
        if (error.response) {
          errorMessage += `: 状态码 ${error.response.status}, 详情: ${error.response.statusText}`
        } else if (error.request) {
          errorMessage += ': 无法连接到服务器'
        } else {
          errorMessage += `: ${error.message}`
        }
        this.$message({
          message: errorMessage,
          type: 'error',
          offset: 100
        })
      }
    }
  }
}
</script>

<style scoped>
/* 容器样式 */
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
  height: calc(100vh - 12vh); /* 保持左侧卡片固定高度 */
  display: flex;
  flex-direction: column;
}

.box-card .el-card__body {
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

/* 文件上传区域 */
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

/* 表格容器 */
.table-container {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保填满可用空间 */
}

.custom-table {
  color: #606266;
  flex: 1; /* 让表格自适应高度 */
}

/* 分页器 */
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

/* 日期选择器和报告按钮 */
.date-filter {
  float: right;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}

.report-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

:root {
  --primary-color: #4560F7;
}
</style>
