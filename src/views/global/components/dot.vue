<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <drag-dialog :dialog-table-visible="dialogTableVisible"></drag-dialog>
    </div>
    <el-tag type="success"  style="font-style:bold; margin-bottom: 10px; font-size: 14px">{{placetext}}</el-tag>
    <div style="margin-bottom: 10px">
      <el-input size="small" v-model="listQuery.ip" placeholder="请输入IP" style="height: 40px; width: 400px; margin-right: 10px" clearable class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      ref="multipleTable"
      :header-cell-style="{background:'#eef1f6'}"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      height="450"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >

      <el-table-column label="Ip" width="200px" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>

      <el-table-column label="域名" width="350px" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.domain }}</span>
        </template>
      </el-table-column>

      <el-table-column label="国家" width="200px" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.country }}</span>
        </template>
      </el-table-column>

      <el-table-column label="组织" width="300px" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.org }}</span>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      style="margin-top: 5px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :pager-count="10"
      :page-sizes="[50, 100, 200, 300]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>


  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import feature from '@/utils/feature'
import DragDialog from "@/views/feature/components/drag-dialog";
import axios from "axios";


export default {
  name: 'DoTList',
  components: {Pagination, DragDialog},
  directives: {waves},
  
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      downloadLoading: false,
      label: "",
      total: 0,
      pageNum: 1,
      pageSize: 50,
      featureVisible: false,
      tempType: null,
      tempFeature: null,
      tempImageFeature: null,
      listQuery: {
        label: "",
        pageNum: 1,
        pageSize: 50,
        ip: "",
      },
      currentPageTotal: 0,

      addVisible: false,
      fileList:[],

      multipleSelection: [],
      pcapLabelValue: "",
      dialogTableVisible: false,
      placetext: "   ",
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = {
        "params": {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
        }
      }
      console.log("params", params);
      feature.get('/tglobal/all', params).then(res => {
        console.log("get all res", res);
        this.list = res.records
        console.log("total", this.total);
        this.total = res.total
        this.currentPageTotal = res.records.length
        this.listLoading = false
        console.log("this.currentPageTotal", this.currentPageTotal);
      })
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },

    handleSizeChange(pageSize){
      this.listQuery.pageSize = pageSize;
      this.getList()
    },
    handleCurrentChange(pageNum){
      this.listQuery.pageNum = pageNum;
      this.getList()
    },
    handleFilter(){
      const params = {
        "params": {
          ip: this.listQuery.ip
        }
      }
      feature.get('/tglobal/search',params).then(res => {
          this.list = res.data
          console.log("total", this.total);
          this.total = res.total
          this.listLoading = false
          console.log("this.currentPageTotal", this.currentPageTotal);
        })
    },
    getRowId(id) {
      // console.log("tlsChartId" + id.toString());
      return "tlsChartId" + id.toString();
    },
    
    handleDrag() {
      this.$refs.select.blur()
    }
  },

  mounted() {
    this.$bus.$on("dialogTableVisibleChange", data=>{
      this.dialogTableVisible = data;
    })
  },
  beforeDestroy(){
    console.log('destroying');
  },
  beforeRouteLeave(to, from, next) {
    console.log("leaving");
    this.$destroy();
    next()
  },
  watch: {
    total: {
      handler(n) {
        this.placetext = "一共查询到" + n + "条数据";
      }
    }
  }
  
}
</script>