<template>
  <div class="app-container"> 
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="DoH">
        <DoHList> </DoHList>
        </el-tab-pane>
        <el-tab-pane label="DoQ">
        DoQ
        </el-tab-pane>
        <el-tab-pane label="DoT">
        <DoTList> </DoTList>
        </el-tab-pane>
    </el-tabs>
    </el-row>
    <dialog-component v-show="Visiable" @cancel="Visiable=false"></dialog-component>
    <dialog-host v-show="Visiable1" @cancel="Visiable1=false"></dialog-host>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import axios from 'axios'
import DoHList from './components/doh_n'
import DoTList from './components/dot'
import dialogComponent from './components/Dialog'
import DialogHost from './components/DialogHost'


export default {
  components:{
    DoHList,
    DoTList,
    dialogComponent,
    DialogHost
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        unknown:'info',
        Benign: '',
        Malicious: 'danger',
        Suspicious:'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tabPosition: 'top',
      yesterday: new Date().toISOString().split('T')[0],
      Visiable:false,
      Visiable1:false,
      list: [],
      alldata: [],
      // count: null,
      listLoading: true,
      search: '',
      page: 1,
    }
  },
  created() {
    this.beforeDay()
    this.listLoading = false
    axios.get('/passivedns.json').then(res => {
      this.alldata = res.data.data
      this.list = this.alldata.slice(0, 10)
    })

  },
  methods: {
    beforeDay() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      this.yesterday = yesterday.toISOString().split('T')[0];
    },

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
      const list = this.alldata.filter((item, index) => index <= this.page * 10 && index > 10 * (this.page - 1))
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
  .svg-icon{
    width:30px;
    height:25px;
    margin-right:5px
  }
  
</style>
<style lang="css">
.dotClass {
  width:10px;
  height:10px;
  border-radius: 50%;
  display: block;
  margin-left: 10px;  
}
  .el-tooltip__popper{
    max-width:50%
    }

  .dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 80%;
}
</style>

