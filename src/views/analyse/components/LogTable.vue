<template>
  <div class="app-container" style="height: 400px;  padding: 0">
    <el-table v-loading="listLoading" height="90%" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="eventID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + (page-1) * 15 + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="行为" width="260" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="抽象实体" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Sysmon标记" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="图像" width="150" align="center">
        <template slot-scope="scope">
          <el-image style="width: 60px; height: 60px" :src="scope.row.img" fit="fill" />
        </template>
      </el-table-column> -->
      <el-table-column label="描述" width="450" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.sequence }} 
        </template>
      </el-table-column>
      
      <!-- <el-table-column align="center" prop="created_at" label="Display_time" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column> -->
    </el-table>

    <el-pagination
      style="text-align: center"
      :current-page="page"
      layout="prev, pager, next"
      :total="20"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
// import { getList } from '@/api/table'
import axios from 'axios'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        Benign: 'success',
        Malicious: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      alldata: [],
      // count: null,
      listLoading: true,
      search: '',
      page: 1
    }
  },
  created() {
    this.listLoading = false
    axios.get('/test.json').then(res => {
      this.alldata = res.data.list
      this.list = this.alldata.slice(0, 15)
    })
  },
  methods: {
    queryData() {
      // 并没有输入关键字时，就不要再搜索了
      if (this.search === '' || this.search == null) {
        // this.list = JSON.parse(JSON.stringify(this.list))
        return
      }
      // 搜索
      // 符合条件的加入到返回值中，否则丢弃
      // JavaScript Array filter() 方法：
      // Array.filter(function(pars));     filter函数的参数是一个需要参数的函数，该函数传入的参数是Array中的每一项，函数功能就是判断条件
      const list = this.alldata.filter(item => item.family === this.search)
      this.list = list
    },
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      const list = this.alldata.filter((item, index) => index <= this.page * 15 && index > 15 * (this.page - 1))
      this.list = list
    },
    // 当当前页改变
    handleCurrentChange(current) {
      this.page = current
      this.getList()
    }
  }

  // created() {
  //   this.fetchData()
  // },
  // methods: {
  //   fetchData() {
  //     this.listLoading = true
  //     getList().then(response => {
  //       this.list = response.data.items
  //       // this.count = response.data.total
  //       this.listLoading = false
  //     })
  //   }
  // }
}
</script>

<style scoped>
.inline-block {
    display: inline-block;
    margin-right:10px;
    margin-left:10px;
    }
</style>
<style lang="css">
.el-tooltip__popper{
    max-width:50%
    }
</style>

