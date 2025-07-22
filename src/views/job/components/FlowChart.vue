<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="14" :sm="14" :lg="6">
        <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">训练流程</h5>
        <div style="display:inline;width: 50%; height: 300px">
          <stepview
            class="win-step"
            titleColor="rgb(138, 139, 139)"
            :showTitle="false"
            :noCircle="false"
            cricleBgColor="rgb(46,199,201)"
            cricleColor="white"
            titleSize="16px"
            titleDetailSize="14px"
            :titleWeight="500"
            :dataList="clientList"
            @openDetail="openSolt"
          >
            <template v-slot:step0>
              <p class="myslot">
                准备开始训练
              </p>
            </template>
            <template v-slot:step1>
              <p class="myslot">
                配置训练参数
              </p>
            </template>
            <template v-slot:step2>
              <p class="myslot">
                提取加密流量特征
              </p>
            </template>
            <template v-slot:step3>
              <p class="myslot">
                构建初始KNN加密流量图
              </p>
            </template>
            <template v-slot:step4>
              <p class="myslot">
                GraphSage模型和IDGL模型迭代训练
              </p>
            </template>
            <template v-slot:step5>
              <p class="myslot">
                模型训练结束
              </p>
            </template>
          </stepview>
        </div>
      </el-col>
      <el-col :xs="58" :sm="58" :lg="18">
        <div style="width: 100%;">
          <flow-detail
            :flow-item="flowItem"
            :job-value="jobValue"
            :start-time="startTime"
            :job-form="jobForm"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const updateValue = [0, 4, 9, 25, 45, 100]

import FlowDetail from './FlowDetail'
import JobSummary from './flowItems/JobSummary'

export default {
  components: {
    FlowDetail,
    JobSummary
  },
  name: 'FlowChart',
  props: {
    jobValue: {
      default: 0
    },
    jobForm : {
      default: () => {},
    },
    startTime: {
      default: null,
    },
  },
  data() {
    return {
      dialogVisible: false,
      value: 0,
      clientList: [
        {
          title: '开始训练',
          detail: '',
          showline: false,
          index: '0',
          showDetail: false,
          showSolt: false,  // 是否使用插槽
          soltName: 'step0', // 插槽名称
          // showDialog: false
        },
        {
          title: '参数配置',
          detail: '',
          showline: false,
          index: '1',
          showDetail: false,
          showSolt: false,  // 是否使用插槽
          soltName: 'step1', // 插槽名称
        },
        {
          title: '特征提取',
          detail: '',
          showline: false,
          index: '2',
          showDetail: false,
          showSolt: false,  // 是否使用插槽
          soltName: 'step2'  // 插槽名称
        },
        {
          title: '初始图构建',
          detail: '',
          showline: false,
          index: '3',
          showDetail: false,
          showSolt: false,  // 是否使用插槽
          soltName: 'step3'
        },
        {
          title: '模型训练',
          detail: '',
          showline: false,
          index: '4',
          showDetail: false,
          showSolt: false,
          soltName: 'step4'
        },
        {
          title: '结束训练',
          detail: '',
          showline: false,
          index: '5',
          showDetail: false,
          showSolt: false,  // 是否使用插槽
          soltName: 'step5'
        },
      ],
      flowItem: {'index': 0},
      stepVisible: false,
      stepShow: -1
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    openSolt(item) {
      this.$set(item, 'showSolt', !item.showSolt)
      this.stepShow = item.index
      if (this.stepShow != 7 & this.stepShow != 5){
        this.stepVisible = true
      }
    },
  },
  mounted() {
    this.$bus.$on("chartReset",()=>{
      console.log("chartReset");
      this.$forceUpdate();
    })
  },
  watch: {
    jobValue: {
      immediate: true,
      handler(n){
        let index = updateValue.indexOf(n)
        if (index!=-1){
          if (index != 0){
            this.clientList[index-1].showSolt = false;
          }
          this.clientList[index].showSolt = true;
          if (index != updateValue.length-1){
            this.clientList[index].showline = true;
          }
          console.log("index", index);
          this.flowItem = this.clientList[index];
          console.log("index flowitem", this.flowItem);
        }
      }
    }
  }
}
</script>

<style scoped>
p.myslot {
  font-size: 14px;
  text-align: center;
  display: table-cell;
  align-items: center;
  background-color: rgb(46, 199, 201);
  color: white;
  /* border: 2px solid #FF9B2C; */
  border-radius: 30px;
  /* width: 300px; */
  /* height: 50px; */

  padding: 12px;
}
</style>
