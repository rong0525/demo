<template>
  <div style="width: 100%">
    <el-result v-show="isSuccess" icon="success" sub-title="特征提取完成" />
    <el-table v-show="!isSuccess" :key="tableKey" :data="list" highlight-current-row style="width: 100%;" height="400px">
      <el-table-column label="标签" align="left" prop="label" width="60">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="特征" align="left" width="10000" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import axios from 'axios'

export default {
  name: 'FlowItemFeatureRead',
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
      axios.get('/les-miserables.json').then(res => {
        // console.log('我在这呢')
        // console.log(res)
        this.list = res.data.nodes
        // console.log('我是list')
        // console.log(this.list)
        this.listLoading = false
      })
    }
  }
}
</script>
