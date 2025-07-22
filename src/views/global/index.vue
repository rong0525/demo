<template>
  <div class="app-container">  
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="DoH">
        <DoHList> </DoHList>
        </el-tab-pane>
        
        <el-tab-pane label="DoQ">
        <DoQList> </DoQList>
        </el-tab-pane>
        
        <el-tab-pane label="DoT">
        <DoTList> </DoTList>
        </el-tab-pane>
        
    </el-tabs>
    <dialog-component v-show="Visiable" @cancel="Visiable=false"></dialog-component>
    <dialog-host v-show="Visiable1" @cancel="Visiable1=false"></dialog-host>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import axios from 'axios'
import dialogComponent from './components/Dialog'
import DialogHost from './components/DialogHost'
import DoHList from './components/doh'
import DoTList from './components/dot'
import DoQList from './components/doq'

export default {
  components:{
    dialogComponent,
    DialogHost,
    DoHList,
    DoTList,
    DoQList
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
      Visiable:false,
      Visiable1:false,
    }
  },
  created() {
    this.listLoading = false
  },
  methods: {
    downloadFile(fileName) {
      const fileUrl = '/rules_data.csv'; // 文件的URL地址
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName);
      link.click();
    },
    newmodel() {
      this.Visiable=true;
    },
    newhost() {
      this.Visiable1=true;
    },
    toPage() {
      this.$router.push({ path: '/hostlist/page' })
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
    height:30px;
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

