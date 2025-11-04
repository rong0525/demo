<template>
  <div class="container-wrapper">
    <el-row :gutter="20" class="cards-row">

      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <el-card class="box-card fixed-height-card" shadow="never">
          <!-- <div slot="header" class="clearfix blue-background">
            <span>法条标准目录</span>
          </div> -->
          <div class="card-content">
            <el-menu
              :default-active="activeFilter"
              class="custom-menu"
              @select="handleSelectFilter"
            >

              <el-menu-item-group>
                <template slot="title">
                  <span class="group-title">法规条例</span>
                </template>
                <el-menu-item index="《汽车数据出境安全指引》" class="menu-item-style">
                  <span slot="title">工信部等-《汽车数据出境安全指引》</span>
                </el-menu-item>
                <el-menu-item index="《汽车数据安全管理若干规定》" class="menu-item-style">
                  <span slot="title">网信办等-《汽车数据安全管理若干规定》</span>
                </el-menu-item>

                <el-menu-item index="《个人信息保护法》" class="menu-item-style">
                  <span slot="title">《中华人民共和国个人信息保护法》</span>
                </el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">
                  <span class="group-title">标准规范</span>
                </template>
                <el-menu-item index="《汽车数据通用要求》" class="menu-item-style">
                  <span slot="title">《汽车数据通用要求》</span>
                </el-menu-item>
                <el-menu-item index="《汽车整车信息安全技术要求》" class="menu-item-style">
                  <span slot="title">《汽车整车信息安全技术要求》</span>
                </el-menu-item>
                <el-menu-item index="《智能网联汽车时空数据安全处理基本要求》" class="menu-item-style">
                  <span slot="title">自然资源部-《智能网联汽车时空数据安全处理基本要求》</span>
                </el-menu-item>
                <el-menu-item index="《智能网联汽车时空数据传感器安全基本要求》" class="menu-item-style">
                  <span slot="title">自然资源部-《智能网联汽车时空数据传感器安全基本要求》</span>
                </el-menu-item>
              </el-menu-item-group>

              <el-menu-item index="all" class="menu-item-style">
                <span slot="title" class="group-title">全部数据</span>
              </el-menu-item>

            </el-menu>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-card class="box-card fixed-height-card" shadow="never">
          <div slot="header" class="clearfix blue-background">
            <span>合规详情列表</span>
          </div>
          <div class="card-content table-container">
            <el-table
              :data="filteredTableData"
              style="width: 100%"
              height="100%"
              :default-sort="{prop: 'updatedAt', order: 'descending'}"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <!-- 第一行 -->
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="时间">
                          <span>{{ formatTime(props.row.updatedAt) }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="源IP">
                          <span>{{ props.row.sourceIp }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="目的IP">
                          <span>{{ props.row.destIp }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 第二行 -->
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="违规内容">
                          <span
                            class="view-link"
                            @click="handleViewViolationContent(props.row)"
                          >[查看详情]</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="原始流量">
                          <span
                            class="view-link"
                            @click="handleViewOriginalTraffic(props.row)"
                          >[查看详情]</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </template>
              </el-table-column>

              <el-table-column prop="violationId" label="不合规项 ID" sortable />
              <el-table-column prop="lawStandard" label="对应法规标准" sortable />
              <el-table-column prop="violationTerm" label="违规条款/条目" sortable />
              <el-table-column prop="violationDesc" label="违规行为描述" sortable />
              <el-table-column prop="dataAsset" label="涉及数据资产" sortable />
              <el-table-column prop="violatingEntity" label="违规主体（域名/IP）" sortable />
            </el-table>
            <!-- 分页器固定在底部 -->
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

    <!-- 违规内容详情弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="违规内容详情"
      width="60vw"
      :close-on-click-modal="false"
      class="violation-content-dialog"
    >
      <template #title>
        <span>违规内容详情</span>
        <el-button
          class="dialog-download-btn"
          type="primary"
          size="mini"
          @click="handleDownloadFile"
        >
          下载
        </el-button>
      </template>
      <div class="dialog-content">
        <el-scrollbar style="max-height: 70vh;">
          <el-image
            v-if="fileType === 'image'"
            :src="getImageSrc(fileContent)"
            fit="contain"
            style="width:100%;max-width:100%;height:auto;max-height:60vh;display:block;margin:auto;"
          />
          <el-input
            v-else-if="fileType === 'text'"
            type="textarea"
            :value="fileContent"
            rows="10"
            readonly
            class="dialog-textarea"
            style="width:50%;min-width:400px;"
          />
          <div v-else>
            <p>请点击右上角的“下载”按钮获取文件。</p>
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 原始流量文件弹窗 -->
    <el-dialog
      :visible.sync="trafficDialogVisible"
      title="文件下载"
      width="40vw"
      :close-on-click-modal="false"
      class="violation-content-dialog"
    >
      <div class="dialog-content" style="text-align:center;display:flex;flex-direction:column;align-items:center;">
        <p style="margin-bottom: 18px;">点击下方按钮下载文件。</p>
        <el-button
          type="primary"
          size="medium"
          @click="handleDownloadTrafficFile"
        >
          下载文件
        </el-button>
      </div>
      <template #footer>
        <el-button @click="trafficDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { fetchHeguiList, downloadViolationContent, getFile } from '@/api/hegui'

export default {
  name: 'FilterableTablePage',
  data() {
    return {
      originalTableData: [],
      total: 0,
      activeFilter: 'all',
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false, // 控制弹窗显示
      fileContent: '', // 文件内容
      fileType: '', // 文件类型
      dialogFileName: '', // 文件名
      dialogFileUrl: '', // 文件下载链接
      trafficDialogVisible: false,
      trafficFileName: '',
      trafficFileUrl: ''
    }
  },
  computed: {
    filteredTableData() {
      return this.originalTableData
    },
    filteredTotal() {
      return this.total
    }
  },
  created() {
    this.fetchTableData()
  },
  methods: {
    formatTime(utcTime) {
      if (!utcTime) return ''
      // 将UTC时间字符串转换为Date对象
      const date = new Date(utcTime)
      // 转换为北京时间 (UTC+8)
      const beijingTime = new Date(date.getTime() + 8 * 60 * 60 * 1000)
      // 格式化为 YYYY-MM-DD HH:mm:ss
      return beijingTime.toISOString().replace('T', ' ').substring(0, 19)
    },
    fetchTableData() {
      const params = {
        page: this.currentPage,
        limit: this.pageSize
      }
      if (this.activeFilter !== 'all') {
        params.ruleSource = this.activeFilter.replace(/[《》]/g, '')
      }
      fetchHeguiList(params).then(res => {
        const { items, total } = res.data
        this.originalTableData = items
        this.total = total
      })
    },
    handleSelectFilter(key) {
      this.activeFilter = key
      this.currentPage = 1
      this.fetchTableData()
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchTableData()
    },
    handleViewViolationContent(row) {
      const fileUrl = row.violationContent
      if (!fileUrl || !fileUrl.startsWith('http')) {
        this.$message.error('无效的违规内容链接')
        return
      }
      // 检查 fileUrl 是否为 base64 或 data url
      if (fileUrl.startsWith('data:') || /^[A-Za-z0-9+/=]+$/.test(fileUrl.substr(0, 100))) {
        this.$message.error('违规内容链接格式异常，无法直接预览')
        return
      }

      downloadViolationContent(fileUrl)
        .then(fileName => getFile(fileName))
        .then(response => {
          const { content, fileType, fileName } = response.data
          this.fileContent = content
          this.fileType = fileType
          this.dialogFileName = fileName

          // 如果是视频文件，显示下载弹窗而不是预览弹窗
          if (fileType === 'video') {
            this.trafficFileName = fileName
            this.trafficDialogVisible = true
          } else {
            // 对于其他类型的文件，继续使用原有的预览弹窗
            this.dialogVisible = true
          }
        })
        .catch(error => {
          console.error('文件获取失败', error)
          this.$message.error('操作失败，请稍后重试')
        })
    },
    handleDownloadFile() {
      const downloadUrl = `${process.env.VUE_APP_BASE_API}/file/downloadFile?fileName=${encodeURIComponent(this.dialogFileName)}`
      window.open(downloadUrl, '_blank')
    },
    handleViewOriginalTraffic(row) {
      // 新增：支持pcap包下载弹窗
      const fileUrl = row.originalTraffic
      if (!fileUrl || !fileUrl.startsWith('http')) {
        this.$message.error('无效的原始流量文件链接')
        return
      }
      // 通知后端下载并返回 fileName
      downloadViolationContent(fileUrl)
        .then(fileName => {
          this.trafficFileName = fileName
          this.trafficDialogVisible = true
        })
        .catch(error => {
          // 修复：处理 error，打印并提示
          console.error('原始流量文件获取失败', error)
          this.$message.error('原始流量文件获取失败')
        })
    },
    handleDownloadTrafficFile() {
      // 直接用后端返回的 fileName 拼接下载链接
      const downloadUrl = `${process.env.VUE_APP_BASE_API}/file/downloadFile?fileName=${encodeURIComponent(this.trafficFileName)}`
      window.open(downloadUrl, '_blank')
    },
    getImageSrc(content) {
      // 默认按 jpg 处理，如有其它类型可扩展
      return `data:image/jpeg;base64,${content}`
    }
  }
}
</script>

<style scoped>
/* 整个卡片区域的容器 */
.container-wrapper {
  padding: 20px;
}
.cards-row {
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  height: 100%;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2) !important;
}

/* 左右卡片固定高度 */
.fixed-height-card {
  height: calc(100vh - 12vh);
  display: flex; /* 使用flexbox布局 */
  flex-direction: column; /* 垂直排列 */
}

/* 卡片内容区域自动填充剩余空间并显示滚动条 */
.fixed-height-card .el-card__body {
  flex: 1; /* 自动填充剩余空间 */
  padding: 0px 20px;
  display: flex; /* 再次使用flexbox布局 */
  flex-direction: column;
}

.blue-background {
  background-color: #4560F7; /* 蓝色背景 */
  color: #fff; /* 白色文字 */
  padding: 15px; /* 内边距 */
  font-weight: bold; /* 加粗文字 */
}

/* 导航栏样式 */
.custom-menu {
  border-right: none;
  flex: 1; /* 导航菜单占据剩余空间 */
  overflow-y: auto; /* 菜单项过多时显示滚动条 */
}
.custom-menu .el-menu-item.is-active,
.custom-menu .el-submenu.is-active .el-submenu__title {
  color: #409EFF;
}

/* 一级菜单（分组标题）样式 */
.custom-menu .el-menu-item-group__title {
  background-color: #4560F7 !important;
  color: #fff !important;
  font-weight: bold;
  padding: 10px 20px !important;
  height: auto !important;
  line-height: 1.5;
  white-space: normal;
  word-wrap: break-word;
}

/* 分组标题字体样式 */
.group-title {
  font-size: 20px;
  color: #4560F7;
  font-weight: bold;
}

/* “全部数据”菜单项样式与 .group-title 一致 */
.all-data-title {
  font-size: 20px;
  color: #4560F7;
  font-weight: bold;
}

/* 二级菜单项和“全部数据”项的通用样式 */
.custom-menu .menu-item-style {
  background-color: #fff !important;
  color: #606266 !important;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 20px 10px 30px !important;
  height: auto !important;
  line-height: 1.5;
  white-space: normal;
  word-wrap: break-word;
  transition: background-color 0.3s;
}

/* 移除 el-menu-item 默认的左侧 padding，让 padding 保持一致 */
.custom-menu .el-menu-item {
  padding-left: 20px !important;
}
/* 调整分组内的菜单项的左侧 padding，以增加缩进 */
.custom-menu .el-menu-item-group .menu-item-style {
  padding-left: 30px !important;
}

/* 美化 - 二级菜单项悬停和激活状态 */
.custom-menu .menu-item-style:hover {
  background-color: #E0E0E0 !important;
}
.custom-menu .menu-item-style.is-active {
  background-color: #eaf3ff !important; /* 更浅的蓝色底色 */
  color: #4560F7 !important;
  font-weight: bold;
}

/* 表格容器样式 */
.table-container {
  flex: 1;
  overflow-y: auto;
  height: 75vh;
  position: relative;
  /* 移除 height 固定值，让内容和分页器布局自适应 */
  /* height: 70vh; */
  display: flex;
  flex-direction: column;
}

/* 固定分页器在卡片右下角 */
.fixed-pagination {
  position: sticky;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 2;
  padding-top: 8px;
  display: flex;
  justify-content: flex-end; /* 右对齐 */
}

/* 展开行样式 */
.demo-table-expand {
  font-size: 0;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.demo-table-expand label {
  background-color: #4560F7;
  border-bottom: 1px solid #eee;
  color: #fff;
}

/* 弹窗样式 */
.violation-content-dialog .el-dialog__header {
  background-color: #4560F7;
  color: #fff;
  border-bottom: none;
}

.violation-content-dialog .el-dialog__header .dialog-download-btn {
  position: absolute;
  top: 15px;
  right: 20px;
}

.violation-content-dialog .el-dialog__body {
  padding: 0;
}

.violation-content-dialog .el-dialog__footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}

.violation-content-dialog .el-dialog {
  max-width: 90vw !important;
  width: 60vw !important;
  max-height: 80vh !important;
}

.violation-content-dialog .el-dialog__body {
  overflow-y: auto;
  max-height: 70vh;
  padding: 0;
}

.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.violation-content-dialog .el-image {
  background: #fff;
}

/* 超链接样式 */
.view-link {
  color: #409EFF;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s;
}

.view-link:hover {
  color: #1d78f7;
}

.dialog-textarea >>> .el-textarea__inner {
  min-height: 200px;
  height: 40vh !important;
  max-height: 60vh;
  resize: none;
  font-size: 16px;
  line-height: 1.6;
  background: #fafbfc;
}
</style>
