<template>
  <div style="width: 100%">
    <el-table :key="tableKey" :data="list" highlight-current-row style="width: 100%;" height="500px" border>
      <el-table-column label="源节点ID" align="center" prop="label" width="130">
        <template slot-scope="{row}">
          <span>{{ row.sourceNodeId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="源节点类型" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.sourceNodeType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目的节点ID" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.targetNodeId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目的节点类型" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.targetNodeType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交互关系" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.interactionRelation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间戳" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图ID" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.graphId }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import axios from 'axios'

export default {
  name: 'DataAnalysis',
  directives: { waves },
  props: {
    step: {
      default: 0
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      label: '',
      timer: null,
      isSuccess: false
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
      axios.get('/analysisloglist.json').then(res => {
        // console.log('我在这呢')
        // console.log(res)
        this.list = res.data.data
        // console.log('我是list')
        // console.log(this.list)
        this.listLoading = false
      })
    }
  }
}
</script>
