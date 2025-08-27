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
                <el-menu-item index="《智能网联汽车时空数据安全处理基本要求》" class="menu-item-style">
                  <span slot="title">自然资源部-《智能网联汽车时空数据安全处理基本要求》</span>
                </el-menu-item>
                <el-menu-item index="《智能网联汽车时空数据传感器安全基本要求》" class="menu-item-style">
                  <span slot="title">自然资源部-《智能网联汽车时空数据传感器安全基本要求》</span>
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
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="时间">
                      <span>{{ props.row.time }}</span>
                    </el-form-item>
                    <el-form-item label="源IP">
                      <span>{{ props.row.sourceIp }}</span>
                    </el-form-item>
                    <el-form-item label="目的IP">
                      <span>{{ props.row.destIp }}</span>
                    </el-form-item>
                    <el-form-item label="违规内容">
                      <span
                        class="view-link"
                        style="cursor:pointer;"
                        @click="handleViewViolationContent(props.row)"
                      >{{ props.row.violationContent }}</span>
                    </el-form-item>
                    <el-form-item label="原始流量">
                      <span
                        class="view-link"
                        style="cursor:pointer;"
                        @click="handleViewOriginalTraffic(props.row)"
                      >{{ props.row.originalTraffic }}</span>
                    </el-form-item>
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
  </div>
</template>

<script>
import { fetchHeguiList, fetchViolationContent, fetchOriginalTraffic } from '@/api/hegui'

export default {
  name: 'FilterableTablePage',
  data() {
    return {
      originalTableData: [],
      total: 0,
      activeFilter: 'all',
      currentPage: 1,
      pageSize: 10
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
      fetchViolationContent(row.violationId).then(res => {
        const { type, value } = res.data
        if (type === 'image' || type === 'link') {
          window.open(value, '_blank')
        } else if (type === 'text') {
          // 可用 alert 或自定义弹窗
          this.$alert(value, '违规内容详情', { confirmButtonText: '确定' })
        }
      })
    },
    handleViewOriginalTraffic(row) {
      fetchOriginalTraffic(row.violationId).then(res => {
        const { value } = res.data
        window.open(value, '_blank')
      })
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
  height: 80vh;
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
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/deep/ .el-card__header {
  padding: 0px;
  background-color: #4560F7;
  border-bottom: 1px solid #eee;
}

/* 统一“查看详情”和“查看原始流量”文字样式 */
.view-link {
  color: #409EFF;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;
}
.view-link:hover {
  color: #1d78f7;
}
</style>
