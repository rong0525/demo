<template>
  <div class="app-container">
    <el-row :gutter="30" class="box-row">
      <!-- 规则库列表表单 -->
      <el-col :span="24">
        <div class="content-wrapper">
          <!-- 左侧侧框 -->
          <div class="left-panel">
            <div class="panel-section">
              <div class="panel-header">法规条例</div>
              <div class="panel-content">
                <div class="panel-item">工信部等-《汽车数据出境安全指引》</div>
                <div class="panel-item">网信办等-《汽车数据安全管理若干规定》</div>
                <div class="panel-item">自然资源部-《智能网联汽车时空数据安全处理基本要求》</div>
                <div class="panel-item">自然资源部-《智能网联汽车时空数据传感系统安全基本要求》</div>
                <div class="panel-item">《中华人民共和国个人信息保护法》</div>
              </div>
            </div>
            <div class="panel-section">
              <div class="panel-header">标准规范</div>
              <div class="panel-content">
                <div class="panel-item">《汽车数据通用要求》</div>
                <div class="panel-item">《汽车整车信息安全技术要求》</div>
              </div>
            </div>
          </div>
          <!-- 右侧规则库列表表单 -->
          <div class="right-panel">
            <div class="white-box third-box">
              <div class="box-title">规则库列表</div>
              <div class="filter-container" style="display: flex;">
                <el-select v-model="listQuery.ruleSource" placeholder="规则来源" clearable class="filter-item" style="width: 150px; margin-right: 10px;" @change="handleFilter">
                  <el-option v-for="item in ruleSourceOptions" :key="item" :label="item" :value="item" />
                </el-select>
                <el-select v-model="listQuery.ruleType" placeholder="规则类型" clearable class="filter-item" style="width: 150px; margin-right: 10px;" @change="handleFilter">
                  <el-option v-for="item in ruleTypeOptions" :key="item" :label="item" :value="item" />
                </el-select>
                <el-select v-model="listQuery.status" placeholder="生效状态" clearable class="filter-item" style="width: 120px; margin-right: 10px;" @change="handleFilter">
                  <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
                </el-select>
                <el-input v-model="listQuery.keyword" placeholder="请输入规则ID、规则描述或数据资产名称" class="filter-item" style="flex: 1;" prefix-icon="el-icon-search" @keyup.enter.native="handleFilter" />
                <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px; display: none;" @click="handleCreate">新增规则</el-button>
              </div>
              <div class="table-wrapper">
                <el-table
                  :data="list"
                  fit
                  highlight-current-row
                  style="width: 100%;"
                  @sort-change="handleSortChange"
                >
                  <el-table-column label="序号" prop="sequence" min-width="60" sortable="custom" align="center" />
                  <el-table-column label="规则ID" prop="ruleId" min-width="80" sortable="custom" align="center" />
                  <el-table-column label="规则来源" prop="ruleSource" min-width="150" sortable="custom" align="center" />
                  <el-table-column label="规则描述" prop="ruleDescription" min-width="300" sortable="custom" align="center" />
                  <el-table-column label="规则类型" prop="ruleType" min-width="120" sortable="custom" align="center" />
                  <el-table-column label="数据资产名称" prop="dataAssetName" min-width="150" sortable="custom" align="center" />
                  <el-table-column label="生效状态" prop="status" min-width="100" sortable="custom" align="center">
                    <template slot-scope="{row}">
                      <el-tag :class="['status-tag', row.status === '启用' ? 'status-enabled' : 'status-unpublished']" size="small">
                        {{ row.status }}
                      </el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"
              />
              <el-dialog :title="dialogStatus==='edit' ? '编辑规则' : '新增规则'" :visible.sync="dialogFormVisible">
                <el-form ref="dataForm" :model="temp" :rules="rules" label-width="120px">
                  <el-form-item label="序号" prop="sequence">
                    <el-input-number v-model="temp.sequence" :min="1" :max="9999" placeholder="请输入序号" />
                  </el-form-item>
                  <el-form-item label="规则ID" prop="ruleId">
                    <el-input v-model="temp.ruleId" placeholder="请输入规则ID，格式如：1-1-1-1" />
                  </el-form-item>
                  <el-form-item label="规则来源" prop="ruleSource">
                    <el-select v-model="temp.ruleSource" placeholder="请选择规则来源">
                      <el-option v-for="item in ruleSourceOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="规则描述" prop="ruleDescription">
                    <el-input v-model="temp.ruleDescription" type="textarea" :rows="3" placeholder="请输入规则描述" />
                  </el-form-item>
                  <el-form-item label="规则类型" prop="ruleType">
                    <el-select v-model="temp.ruleType" placeholder="请选择规则类型">
                      <el-option v-for="item in ruleTypeOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数据资产名称" prop="dataAssetName">
                    <el-input v-model="temp.dataAssetName" placeholder="请输入数据资产名称" />
                  </el-form-item>
                  <el-form-item label="生效状态" prop="status">
                    <el-radio-group v-model="temp.status">
                      <el-radio v-for="item in statusOptions" :key="item" :label="item">{{ item }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="submitEdit">保存</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchRuleList, updateRule, deleteRule, createRule } from '@/api/rule'

export default {
  name: 'RulesOverview',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        ruleSource: '',
        ruleType: '',
        status: '',
        keyword: '',
        sort: '',
        order: ''
      },
      ruleSourceOptions: ['汽车数据出境安全指引', '汽车数据安全管理若干规定'],
      ruleTypeOptions: ['文本关键词', '文本关键词/数据特征分析', '文本关键词/图像特征/点云数据分析', '图像特征识别'],
      statusOptions: ['启用', '未发布'],
      list: [],
      total: 0,

      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        id: '',
        sequence: 1,
        ruleId: '',
        ruleSource: '',
        ruleDescription: '',
        ruleType: '',
        dataAssetName: '',
        status: '未发布'
      },
      rules: {
        sequence: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        ruleId: [{ required: true, message: '请输入规则ID', trigger: 'blur' }],
        ruleSource: [{ required: true, message: '请选择规则来源', trigger: 'change' }],
        ruleDescription: [{ required: true, message: '请输入规则描述', trigger: 'blur' }],
        ruleType: [{ required: true, message: '请选择规则类型', trigger: 'change' }],
        dataAssetName: [{ required: true, message: '请输入数据资产名称', trigger: 'blur' }],
        status: [{ required: true, message: '请选择生效状态', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSortChange({ prop, order }) {
      this.listQuery.sort = prop
      this.listQuery.order = order === 'ascending' ? 'asc' : 'desc'
      this.getList()
    },
    handleCreate() {
      this.temp = {
        id: '',
        sequence: 1,
        ruleId: '',
        ruleSource: '',
        ruleDescription: '',
        ruleType: '',
        dataAssetName: '',
        status: '未发布'
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.temp = { ...row }
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定要删除该规则吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRule(row.id).then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
      })
    },
    submitEdit() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          if (this.dialogStatus === 'edit') {
            updateRule(this.temp).then(() => {
              this.$message.success('修改成功')
              this.dialogFormVisible = false
              this.getList()
            })
          } else {
            createRule(this.temp).then(() => {
              this.$message.success('新增成功')
              this.dialogFormVisible = false
              this.getList()
            })
          }
        }
      })
    },
    getList() {
      this.listLoading = true
      const query = { ...this.listQuery }
      // 处理时间筛选
      if (query.createTime && query.createTime.length === 2) {
        query.startTime = query.createTime[0]
        query.endTime = query.createTime[1]
      }
      delete query.createTime
      fetchRuleList(query).then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.chart-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 15px;
  padding-right: 15px
}

.chart-title-container .el-date-editor {
  width: 240px;
}

@media (max-width: 768px) {
  .chart-title-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .chart-title-container .el-date-editor {
    width: 100%;
  }
}
</style>

<style lang="scss">
.table-wrapper {
  border-top: 1px solid black;
  margin-bottom: 32px;
}

.el-table .caret-wrapper {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.el-table .cell {
  position: relative;
  padding-right: 20px; /* 为排序图标留出空间 */
  word-break: break-word; /* 允许长单词换行 */
  white-space: normal; /* 允许文本换行 */
  line-height: 1.4; /* 设置行高 */
  text-align: center; /* 所有列内容居中 */
}

/* 规则描述列的特殊样式 */
.el-table .el-table__row .el-table__cell:nth-child(4) .cell {
  text-align: center; /* 规则描述列也居中 */
  padding: 8px 12px;
}

.status-tag {
  width: 60px;
  text-align: center;
  border: 1px solid;
  font-size: 13px;
  height: 26px;
  line-height: 26px;
}

.status-enabled {
  background-color: #addecc;
  color: #358d86;
}

.status-unpublished {
  background-color: #fcbcbd;
  color: #8d3535;
}

.box-title {
  color: #4560f7;
  font-weight: bold;
  font-size: 23px;
  margin-bottom: 8px;
}

.el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: 1px solid #dcdfe6 !important;
}

.el-table::before, .el-table::after {
  display: none;
}

.el-table--border, .el-table--group {
  border: none;
}

.el-table--border .el-table__cell,
.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: none;
}

.el-table__header-wrapper, .el-table__body-wrapper {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #a1a3a9;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #f6f6f6;
    border-radius: 3px;
  }
}

</style>

<style lang="scss" scoped>
.app-container {
  background-color: #f5f5f5;
  padding: 10px 40px 10px;
}
.filter-container {
  padding: 15px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.box-row {
  margin-bottom: 30px;
}

.filter-item {
  margin-right: 0;
}
.el-select, .el-input {
  min-width: 180px;
}
.white-box {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.third-box .el-table {
  margin-top: 15px;
}

.white-box.third-box {
  padding: 20px 20px;
}

/* 表格响应式优化 */
@media (max-width: 1200px) {
  .white-box.third-box {
    padding: 20px 25px;
  }
}

@media (max-width: 992px) {
  .white-box.third-box {
    padding: 20px 20px;
  }

  .filter-container {
    flex-direction: column;
    gap: 10px;
  }

  .filter-item {
    width: 100% !important;
    margin-right: 0 !important;
  }

  .el-select, .el-input {
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .white-box.third-box {
    padding: 15px 15px;
  }

  .app-container {
    padding: 10px 20px 10px;
  }

  .box-title {
    font-size: 20px;
  }
}

/* 左侧侧框样式 */
.left-panel {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 200px;
  margin-right: 15px;
  flex-shrink: 0;
}

.panel-section {
  margin-bottom: 15px;
}

.panel-section:last-child {
  margin-bottom: 0;
}

.panel-header {
  background-color: #4560f7;
  color: #fff;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.panel-content {
  padding: 12px;
  background-color: #f8f9fa;
}

.panel-item {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #e9ecef;
}

.panel-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.panel-item:hover {
  color: #4560f7;
  cursor: pointer;
}

.content-wrapper {
  display: flex;
  gap: 0px;
  min-width: 0; /* 确保flex子元素可以收缩 */
}

.right-panel {
  flex: 1;
  min-width: 0; /* 确保内容可以收缩 */
  overflow: hidden; /* 防止内容溢出 */
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .left-panel {
    width: 200px;
  }

  .content-wrapper {
    gap: 12px;
  }
}

@media (max-width: 992px) {
  .left-panel {
    width: 180px;
  }

  .panel-header {
    font-size: 13px;
    padding: 8px 10px;
  }

  .panel-content {
    padding: 10px;
  }

  .panel-item {
    font-size: 11px;
    padding: 5px 0;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 15px;
  }

  .left-panel {
    width: 100%;
    margin-right: 0;
  }

  .right-panel {
    min-width: 100%;
  }
}
</style>
