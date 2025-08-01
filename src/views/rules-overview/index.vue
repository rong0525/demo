<template>
  <div class="app-container">
    <el-row :gutter="30" type="flex" class="box-row">
      <el-col :span="15">
        <!-- 第一行 - 前两个方框 -->
        <div class="white-box first-box">
          <div class="part-container">
            <!-- 第一排 -->
            <div class="part-row">
              <div class="part-item">
                <div class="part-header">
                  <img src="@/assets/rules/1.png">
                  <div class="part-label">
                    规则总数
                  </div>
                </div>
                <div class="part-number">{{ stats.total }}</div>
                <div class="part-desc">当前库内所有规则</div>
              </div>
              <div class="part-item">
                <div class="part-header">
                  <img src="@/assets/rules/2.png" alt="1">
                  <div class="part-label">
                    已启用规则
                  </div>
                </div>
                <div class="part-number">{{ stats.enabled }}</div>
                <div class="part-desc">在生产环境中生效的规则</div>
              </div>
              <div class="part-item">
                <div class="part-header">
                  <img src="@/assets/rules/3.png" alt="1">
                  <div class="part-label">
                    本月新增
                  </div>
                </div>
                <div class="part-number">{{ stats.monthlyNew }}</div>
                <div class="part-desc">本自然月内新启用的规则数</div>
              </div>
            </div>
            <!-- 第二排 -->
            <div class="part-row">
              <div class="part-item">
                <div class="part-header">
                  <img src="@/assets/rules/4.png" alt="1">
                  <div class="part-label">
                    覆盖法规数
                  </div>
                </div>
                <div class="part-number">{{ stats.regulations }}</div>
                <div class="part-desc">已关联的内外部法规总数</div>
              </div>
              <div class="part-item">
                <div class="part-header">
                  <img src="@/assets/rules/5.png" alt="1">
                  <div class="part-label">
                    待审核规则
                  </div>
                </div>
                <div class="part-number">{{ stats.unpublished }}</div>
                <div class="part-desc">新建或修改后等待审批的规则</div>
              </div>
              <div class="part-item">
                <div class="part-header">
                  <img src="@/assets/rules/6.png" alt="1">
                  <div class="part-label">
                    高频触发规则
                  </div>
                </div>
                <div class="part-number">{{ stats.highFrequency }}</div>
                <div class="part-desc">过去24h内触发次数超过100次的规则</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 第二个方框 -->
      <el-col :span="9">
        <div class="white-box second-box">
          <div class="part-container">
            <div class="part-row">
              <div class="chart-title-container">
                <div class="chart-title">规则新增趋势</div>
                <el-date-picker
                  v-model="chartTimeRange"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                />
              </div>
            </div>
            <div class="part-row">
              <div ref="chartPlaceholder" class="chart-placeholder" style="height: 250px;" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30" class="box-row">
      <!-- 第三个方框 -->
      <el-col :span="24">
        <div class="white-box third-box">
          <div class="box-title">规则库列表</div>
          <div class="filter-container" style="display: flex;">
            <el-select v-model="listQuery.engine" placeholder="所属规则引擎" clearable class="filter-item" style="width: 150px; margin-right: 10px;" @change="handleFilter">
              <el-option v-for="item in engineOptions" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="listQuery.regulation" placeholder="关联法规" clearable class="filter-item" style="width: 130px; margin-right: 10px;" @change="handleFilter">
              <el-option v-for="item in regulationOptions" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item" style="width: 110px; margin-right: 10px;" @change="handleFilter">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
            </el-select>
            <el-input v-model="listQuery.keyword" placeholder="请输入你想要搜索的规则" class="filter-item" style="flex: 1;" prefix-icon="el-icon-search" @keyup.enter.native="handleFilter" />
          </div>
          <div class="table-wrapper">
            <el-table
              :data="list"
              fit
              highlight-current-row
              style="width: 100%;"
              @sort-change="handleSortChange"
            >
              <el-table-column label="规则名称" prop="name" min-width="180" sortable="custom" />
              <el-table-column label="所属引擎" prop="engine" min-width="150" sortable="custom" />
              <el-table-column label="关联法规" prop="regulation" min-width="150" sortable="custom">
                <template slot-scope="{row}">
                  <span v-if="Array.isArray(row.regulation)">{{ row.regulation.join(', ') }}</span>
                  <span v-else>{{ row.regulation }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" prop="status" min-width="80" sortable="custom" align="center">
                <template slot-scope="{row}">
                  <el-tag :class="['status-tag', row.status === '启用' ? 'status-enabled' : 'status-unpublished']" size="small">
                    {{ row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="创建者" prop="creator" min-width="100" sortable="custom" />
              <el-table-column label="创建日期" prop="createTime" min-width="150" sortable="custom" />

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
            <el-form ref="dataForm" :model="temp" :rules="rules" label-width="80px">
              <el-form-item label="规则名称" prop="name">
                <el-input v-model="temp.name" />
              </el-form-item>
              <el-form-item label="所属引擎" prop="engine">
                <el-select v-model="temp.engine" placeholder="请选择引擎">
                  <el-option v-for="item in engineOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="关联法规" prop="regulation">
                <el-select v-model="temp.regulation" multiple placeholder="请选择关联法规">
                  <el-option v-for="item in regulationOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-radio-group v-model="temp.status">
                  <el-radio v-for="item in statusOptions" :key="item" :label="item">{{ item }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="规则内容" prop="content">
                <el-input v-model="temp.content" type="textarea" />
              </el-form-item>
              <el-form-item label="规则描述" prop="desc">
                <el-input v-model="temp.desc" type="textarea" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitEdit">保存</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchRuleList, updateRule, deleteRule, createRule, fetchRuleStats } from '@/api/rule'
import echarts from 'echarts'

export default {
  name: 'RulesOverview',
  components: { Pagination },
  data() {
    const end = new Date()
    const start = new Date()
    start.setMonth(start.getMonth() - 6)
    return {
      chart: null,
      chartTimeRange: [start, end],
      listQuery: {
        page: 1,
        limit: 10,
        engine: '',
        regulation: '',
        status: '',
        keyword: '',
        sort: '',
        order: ''
      },
      engineOptions: ['数据出境控制引擎', '敏感地理位置识别引擎', '其他引擎'],
      regulationOptions: ['个人信息保护法', '消费者权益保护法', '汽车数据安全管理条例', '数据安全法', '网络安全法', '信息安全技术标准', '网络安全等级保护基本要求'],
      statusOptions: ['启用', '未发布'],
      list: [],
      total: 0,
      stats: {},

      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        id: '',
        name: '',
        engine: '',
        regulation: [],
        status: '未发布',
        creator: '',
        content: '',
        desc: '',
        createTime: ''
      },
      rules: {
        name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
        engine: [{ required: true, message: '请选择所属引擎', trigger: 'change' }],
        regulation: [{ required: true, message: '请选择关联法规', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        content: [{ required: true, message: '请输入规则内容', trigger: 'blur' }]
      }
    }
  },
  watch: {
    chartTimeRange(newRange) {
      console.log('时间范围变化:', newRange)
      if (newRange && newRange.length === 2) {
        this.getStats()
      }
    }
  },
  created() {
    this.getList()
    this.getStats()
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },

  methods: {
    resizeChart() {
      if (this.chart && !this.chart.isDisposed()) {
        this.chart.resize()
      }
    },
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
        name: '',
        engine: '',
        regulation: [],
        status: '未发布',
        creator: '当前用户', // or get from user info
        content: '',
        desc: '',
        createTime: ''
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

    initChart(xAxisData = ['202501', '202502', '202503', '202504', '202505', '202506'], seriesData = [10, 52, 200, 334, 390, 330]) {
      console.log('初始化图表，数据:', { xAxisData, seriesData })
      const chartDom = this.$refs.chartPlaceholder

      if (!chartDom) {
        console.error('图表容器未找到')
        return
      }

      // 如果图表已存在，先销毁
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }

      try {
        this.chart = echarts.init(chartDom)
        const maxData = Math.max(...seriesData)
        const yAxisMax = seriesData.length > 0 ? Math.ceil(maxData * 1.2) : 100

        const option = {
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: '{b}<br/>新增规则: {c0} 条'
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '3%',
            top: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
              interval: 0,
              color: '#6E7079'
            },
            axisLine: {
              lineStyle: {
                color: '#6E7079'
              }
            }
          },
          yAxis: {
            type: 'value',
            max: yAxisMax,
            name: '',
            axisLabel: {
              formatter: '{value}',
              color: '#6E7079'
            },
            axisLine: {
              lineStyle: {
                color: '#6E7079'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#D7DCE5'
              }
            }
          },
          series: [
            {
              name: '新增规则',
              type: 'bar',
              data: seriesData,
              itemStyle: {
                color: '#5470C6'
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                color: '#6E7079'
              },
              barWidth: '60%'
            },
            {
              name: '背景',
              type: 'bar',
              data: seriesData.map(() => yAxisMax),
              itemStyle: {
                color: '#F0F0F0'
              },
              barWidth: '60%',
              barGap: '-100%',
              silent: true,
              animation: false,
              zlevel: -1
            }
          ]
        }

        this.chart.setOption(option)
        console.log('图表初始化成功')
      } catch (error) {
        console.error('图表初始化失败:', error)
      }
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
    },
    getStats() {
      const params = {}
      if (this.chartTimeRange && this.chartTimeRange.length === 2) {
        // 使用字符串格式传递时间范围，避免数组序列化问题
        params.startTime = this.chartTimeRange[0].toISOString()
        params.endTime = this.chartTimeRange[1].toISOString()
        console.log('发送时间范围参数:', { startTime: params.startTime, endTime: params.endTime })
      } else {
        console.log('没有时间范围参数，使用默认范围')
      }
      fetchRuleStats(params).then(res => {
        console.log('获取统计数据成功:', res.data)
        this.stats = res.data

        // 等待下一次DOM更新后初始化图表
        this.$nextTick(() => {
          if (res.data.chartData && res.data.chartData.months && res.data.chartData.counts) {
            this.initChart(res.data.chartData.months, res.data.chartData.counts)
          } else {
            console.warn('API 返回的图表数据为空，使用默认数据')
            this.initChart()
          }
        })
      }).catch(error => {
        console.error('获取统计数据失败:', error)
        // 使用默认数据
        this.$nextTick(() => {
          this.initChart()
        })
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
.chart-title-container {
  display: flex;
  flex:1;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.chart-title {
  font-size: 23px;
  font-weight: bold;
  color:#4560f7;
}

.chart-placeholder {
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
.first-box, .second-box {
  display: flex;
  align-items: center;
  padding: 20px 10px;
  height: 100%;
}

.white-box.third-box {
  padding: 20px 60px;
}

.part-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1px;
  gap: 15px;
}

.part-row {
  display: flex;
  flex: 1;
}

.part-item {
  flex: 1;
  position: relative;
  padding: 10px 1px 8px 20px;
  display: flex;
  flex-direction: column;
  row-gap:5px;
}

.part-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.part-item img {
  width:40px;
  height:40px;
}

/* 仅在每行第1和第2个part-item右侧添加竖线 */
.part-row .part-item:nth-child(1),
.part-row .part-item:nth-child(2) {
  border-right: 2px solid #e0e0e0;
}
.part-row:first-child .part-item {
border-bottom: none;
}
.part-item:not(:last-child) {
border-right: none;
}

/* 移除所有水平边框样式 */
.part-label {
  color: #828282;
  font-weight: 400;
  font-size: 20px;
}
.part-number{
  color:#4560f7;
  font-weight: 800;
  font-size: 35px;
  margin-left:20%
}
.part-desc{
  color:#828282;
  font-weight: 400;
  font-size: 14px;
}
</style>
