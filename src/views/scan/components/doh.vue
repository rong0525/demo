<template>
  <div class="app-container"> 
    <el-table v-loading="listLoading" :data="list" height="500" element-loading-text="Loading" border fit highlight-current-row style="width:100%">
      <el-table-column type="expand" width="50px">
	    <template slot-scope="props">
        <el-descriptions class="margin-top" title="Geolocation" :column="3" :size="size" border>
        <el-descriptions-item>
            <template slot="label">
           <i class="el-icon-s-help"></i>
            IP
            </template>
            <span>{{ props.row.ip }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-monitor"></i>
            主机名称
            </template>
            <span>{{ props.row.hostname }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-place"></i>
            所在地区
            </template>
            <span>{{ props.row.city}} {{ props.row.region}} {{props.row.country}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-map-location"></i>
            地理坐标
            </template>
            <span>{{ props.row.loc }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-time"></i>
            时区
            </template>
            <span>{{ props.row.timezone }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-postcard"></i>
            邮编
            </template>
            <span>{{ props.row.postal }}</span>
        </el-descriptions-item>
        </el-descriptions> 

        <el-descriptions class="margin-top" title="ASN" :column="3" :size="size" border>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-s-help"></i>
            ASN
            </template>
            <span>{{ props.row.asn.asn }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-document"></i>
            名称
            </template>
            <span>{{ props.row.asn.name }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-location-outline"></i>
            域名
            </template>
            <span>{{ props.row.asn.domain }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-set-up"></i>
            路由
            </template>
            <span>{{ props.row.asn.route }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-tickets"></i>
            类型
            </template>
            <span>{{ props.row.asn.type }}</span>
        </el-descriptions-item>
        </el-descriptions>  

        <el-descriptions class="margin-top" title="Abuse" :column="3" :size="size" border>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-monitor"></i>
            网络
            </template>
            <span>{{ props.row.abuse.network }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            联系方式
            </template>
            <span>{{ props.row.abuse.phone }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-message"></i>
            邮件地址
            </template>
            <span>{{ props.row.abuse.email }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-location-information"></i>
            地址
            </template>
            <span>{{ props.row.abuse.address }}</span>
        </el-descriptions-item>
        </el-descriptions>

        <el-descriptions class="margin-top" title="Domains" :column="3" :size="size" border>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-s-help"></i>
            IP
            </template>
            <span>{{ props.row.domains.ip }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-finished"></i>
            域名总数
            </template>
            <span>{{ props.row.domains.total }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-tickets"></i>
            具体域名
            </template>
            <span>
          <ul>
            <li v-for="domain in props.row.domains.domains" :key="domain">
                {{ domain }}
            </li>
          </ul>
          </span>
        </el-descriptions-item>
        </el-descriptions>
	    </template>
	  </el-table-column>

      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index + (page-1) * 10 + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="IP" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="主机名称" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hostname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在地区" width="250" align="center">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.country" class-name="card-panel-icon" />
          <span>{{ scope.row.city}} {{ scope.row.region}} {{scope.row.country}}</span>
        </template>
      </el-table-column>
       <el-table-column label="地理位置" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="域名总数" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.domains.total }}</span>
        </template>
      </el-table-column>
      <el-table-column label="域名" width="250" align="center">
        <template slot-scope="scope">
          <span>
          <ul>
            <li v-for="domain in scope.row.domains.domains" :key="domain">
                {{ domain }}
            </li>
          </ul>
          </span>
        </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
      style="text-align: center"
      :current-page="page"
      layout="prev, pager, next"
      :total="500"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import axios from 'axios'

export default {
  name: "DoHList",
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
      list: [],
      alldata: [],
      // count: null,
      listLoading: true,
      search: '',
      page: 1,
    }
  },
  created() {
    this.listLoading = false
    axios.get('/passivedns.json').then(res => {
      this.alldata = res.data.data
      this.list = this.alldata.slice(0, 10)
    })
  },
  methods: {
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

