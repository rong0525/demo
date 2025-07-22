<template>
  <div style="width: 100%">
    <el-result icon="success" v-show="isSuccess" subTitle="特征提取完成">
    </el-result>
    <el-table
      :key="tableKey"
      :data="list"
      highlight-current-row
      style="width: 100%;"
      height="550px"
      v-show="!isSuccess"
    >
      <el-table-column label="标签" align="left" prop="label" width="60">
        <template slot-scope="{row}">
          <span>{{ row.label | labelFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="图像特征" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <img :src="row.imageFeature" width="36px" height="36px">
        </template>
      </el-table-column>

      <el-table-column label="统计特征" align="left" width="10000" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.feature }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import feature from '@/utils/feature'
import DragDialog from "@/views/feature/components/drag-dialog";

const labelOptions = [
  {key: "0", display_name: 'Normal'},
  {key: "1", display_name: 'Abnormal'},
]

export default {
  name: 'FlowItemFeatureRead',
  components: {Pagination, DragDialog},
  directives: {waves},
  filters: {
    labelFilter(label) {
      if (label === 0) {
        return "1 0"
      } else {
        return "0 1"
      }
    },
  },
  props:{
    step:{
      default:0,
    }
  },
  watch:{
    step(newval){
      if (newval === '2'){
        this.getDataTimes = 1
        this.getList(this.getDataTimes, this.getDataTimes * 5)
        this.timer = setInterval(() => {
          if (this.getDataTimes < 13) {
            this.getDataTimes = this.getDataTimes + 1
            console.log(this.getDataTimes)
            this.getList(this.getDataTimes,  this.getDataTimes * 5)
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.isSuccess = true
          }
        }, 600)
      }
    }
  },
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
      },
      labelOptions,

      timer: null,
      getDataTimes: 0,

      isSuccess:false
    }
  },
  created() {
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    getList(pageNum, pageSize) {
      this.listLoading = true
      feature.get('/featureId/all1', {
        params: {
          pageNum: pageNum,
          pageSize: pageSize,
        }
      }).then(res => {
        console.log(res);
        this.list = res.records
        this.total = res.total
        this.listLoading = false
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
    handleSizeChange(pageSize) {
      this.listQuery.pageSize = pageSize;
      this.getList()
    },
    handleCurrentChange(pageNum) {
      this.listQuery.pageNum = pageNum;
      this.getList()
    },
    handleFilter() {
      // this.listQuery.label = 1
      this.getList()
    },
  }
}
</script>
