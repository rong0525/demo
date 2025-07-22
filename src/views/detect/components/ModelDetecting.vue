<template>
  <div class="dashboard-editor-container">
        <div class="chart-wrapper">
          <el-table :data="list1" highlight-current-row style="width: 100%;" height="500px">
            <el-table-column label="分类器编号" align="center" prop="label" width="130">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f1" align="center" prop="label" width="120">
              <template slot-scope="{row}">
                <span>{{ row.f1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f2" align="center" prop="label" width="130">
              <template slot-scope="{row}">
                <span>{{ row.f2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f3" align="center" prop="label" width="130">
              <template slot-scope="{row}">
                <span>{{ row.f3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f4" align="center" prop="label" width="130">
              <template slot-scope="{row}">
                <span>{{ row.f4 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f5" align="center" prop="label" width="130">
              <template slot-scope="{row}">
                <span>{{ row.f5 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f6" align="center" prop="label" width="130">
              <template slot-scope="{row}">
                <span>{{ row.f6 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f7" align="center" prop="label" width="130">
              <template slot-scope="{row}">
                <span>{{ row.f7 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="f8" align="center" prop="label" width="120">
              <template slot-scope="{row}">
                <span>{{ row.f8 }}</span>
              </template>
            </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ModelDetecting',
  inject: ['reload'], // 注入依赖
  data() {
    return {
      list1: null,
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
      axios.get('/coding.json').then(res => {
        this.list1 = res.data.data
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
