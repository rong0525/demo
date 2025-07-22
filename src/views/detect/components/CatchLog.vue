<template>
  <div style="width: 100%">
    <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" height="500px">
      <el-table-column label="日志生成时间" align="center" prop="label" width="180">
        <template slot-scope="{row}">
          <span>{{ row.TimeGenerated }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日志源" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.SourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主机名称" align="center" width="220" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.ComputerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SID" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.SID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日志类别" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.EventID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日志内容" align="left" width="500" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.Strings }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import axios from 'axios'

export default {
  name: 'CatchLog',
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
      axios.get('/sourcelog.json').then(res => {
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
