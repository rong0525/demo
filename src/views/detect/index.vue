<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <drag-dialog :dialog-table-visible="dialogTableVisible"></drag-dialog>
    </div>
    <el-tag type="success"  style="font-style:italic; margin-bottom: 10px">{{placetext}}</el-tag>
    <div style="margin-bottom: 10px">
      <el-input size="small" v-model="listQuery.ip" placeholder="Search" style="height: 30px; width: 130px; margin-right: 5px" clearable class="filter-item" @keyup.enter.native="handleFilter" />
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
      height="500"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >

      <el-table-column label="Ip" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Domain" width="500px" >
        <template slot-scope="{row}">
          <span>{{ row.domain }}</span>
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
  name: 'Feature',
  // inject:['reload'],
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
      feature.get('/featureId/all', params).then(res => {
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

    handleViewFeature(row, type) {
      if (type === "feature") {
        this.tempType = "统计特征"
        this.tempFeature = row.feature
      } else if (type === "imageFeature") {
        this.tempType = "图像特征"
        this.tempFeature = row.imageFeature
      } else {
        this.tempType = null
        this.tempFeature = null
      }
      this.featureVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
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
      feature.get('/featureId/search',params).then(res => {
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
    addPcap(){
      this.addVisible = true
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    submitUpload() {
      console.log(this.pcapLabelValue)
      const loading = this.$loading({
        lock: true,
        text: '文件上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      let formData = new FormData();
      this.fileList.forEach(item =>{
        formData.append("files",item.raw)
      })
      formData.append("label", this.pcapLabelValue)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:9292/featureId/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8;boundary=----WebKitFormBoundary123456654321',
        }
      }).then((res) =>{
        loading.close();
          console.log("upload res", res);
        if (res.data.status ==="200"){
          this.$message({
            showClose: true,
            message: '数据添加成功',
            type: 'success'
          });
          this.$refs.upload.clearFiles();
          this.addVisible = false
          this.refresh();
        } else {
          this.$message({
            showClose: true,
            message: '数据添加失败',
            type: 'error'
          });
        }
      }).catch((err) => {
        loading.close();
        console.log("upload err", err);
        this.$message({
          showClose: true,
          message: '网络错误',
          type: 'error'
        });
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleUploadChange(file, fileList){
      this.fileList = fileList
      // console.log(fileList);
    },

    delPcap() {
      const loading = this.$loading({
        lock: true,
        text: '数据删除中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      let ids = []
      this.multipleSelection.forEach(item => {
        ids.push(item.id)
      })
      // console.log("ids.length", ids);
      // if (this.currentPageTotal <= ids.length) {
      //   if (this.pageNum != 1){
      //     this.pageNum -= 1
      //     console.log("this.pageNum", this.pageNum);
      //   }
      // }
      feature.post("/featureId/del",ids).then(res => {
        loading.close();
        console.log("delete res", res);
        if (res.status === "200"){
          this.$message({
            showClose: true,
            message: '数据删除成功',
            type: 'success'
          })
          this.refresh()
        } else {
          this.$message({
            showClose: true,
            message: '数据删除失败',
            type: 'error'
          });
          this.$refs.multipleTable.clearSelection();
        }
      }).catch(err => {
        console.log("delete err", err);
        loading.close();
        this.$message({
          showClose: true,
          message: '网络错误',
          type: 'error'
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    refresh() {
      this.getList()
    },
    goToJob() {
      this.$router.push({path: '/job/index'})
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
        this.placetext = "一共查询到" + n + "条会话数据";
      }
    }
  }
  
}
</script>