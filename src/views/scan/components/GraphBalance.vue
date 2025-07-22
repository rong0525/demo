<template>
  <div class="dashboard-editor-container">
        <div class="chart-wrapper">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :lg="12">
            <h4 style="margin-top: 5px;margin-bottom: 5px">平衡前</h4>
            <el-table :key="tableKey" :data="list1" highlight-current-row style="width: 100%;" height="120px">
              <el-table-column label="class1节点数量" align="center" prop="label" width="160">
                <template slot-scope="{row}">
                  <span>{{ row.node_feature }}</span>
                </template>
              </el-table-column>
              <el-table-column label="class2节点数量" align="center" prop="label" width="200">
                <template slot-scope="{row}">
                  <span>{{ row.node_label }}</span>
                </template>
              </el-table-column>
              <el-table-column label="边数量" align="center" prop="label" width="100">
                <template slot-scope="{row}">
                  <span>{{ row.edge_feature }}</span>
                </template>
              </el-table-column>
            </el-table>
            <hete-graph id="4"/>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <h4 style="margin-top: 5px;margin-bottom: 5px">平衡后</h4>
            <el-table :key="tableKey" :data="list2" highlight-current-row style="width: 100%;" height="120px">
              <el-table-column label="class1节点数量" align="center" prop="label" width="200">
                <template slot-scope="{row}">
                  <span>{{ row.node_feature }}</span>
                </template>
              </el-table-column>
              <el-table-column label="class2节点数量" align="center" prop="label" width="200">
                <template slot-scope="{row}">
                  <span>{{ row.node_label }}</span>
                </template>
              </el-table-column>
              <el-table-column label="边数量" align="center" prop="label" width="100">
                <template slot-scope="{row}">
                  <span>{{ row.edge_feature }}</span>
                </template>
              </el-table-column>
            </el-table>
            <hete-graph id="5"/>
          </el-col>
        </el-row>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import HeteGraph from './HeteGraph'

export default {
  name: 'GraphBalance',
  inject: ['reload'], // 注入依赖
  components: {
    HeteGraph
  },
  data() {
    return {
      tableKey: 0,
      list1: null,
      list2: null,
      listLoading: true,
      label: '',
      timer: null,
    }
  },
  created() {
    this.getList()
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    getList() {
      this.listLoading = true
      axios.get('/balance.json').then(res => {
        this.list1 = res.data.data1
        this.listLoading = false
      })
      axios.get('/balance.json').then(res => {
        this.list2 = res.data.data2
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 10px 10px 10px;
    margin-bottom: 20px;
  }

}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
