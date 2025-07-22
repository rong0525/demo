<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="14" :sm="14" :lg="6">
        <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">训练流程</h5>
        <div style="display:inline;width: 50%; height: 300px">
          <stepview
            class="win-step"
            title-color="rgb(138, 139, 139)"
            :show-title="false"
            :no-circle="false"
            cricle-bg-color="rgb(46,199,201)"
            cricle-color="white"
            title-size="16px"
            title-detail-size="14px"
            :title-weight="500"
            :data-list="clientList"
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
                提取边特征
              </p>
            </template>
            <!-- <template v-slot:step3>
              <p class="myslot">
                构建初始KNN加密流量图
              </p>
            </template> -->
            <template v-slot:step3>
              <p class="myslot">
                GraphSage模型和IDGL模型迭代训练
              </p>
            </template>
            <template v-slot:step4>
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
// import JobSummary from './flowItems/JobSummary'

export default {
  name: 'FlowChart',
  components: {
    FlowDetail
    // JobSummary
  },
  props: {
    jobValue: {
      default: 0
    },
    jobForm: {
      default: () => {}
    },
    startTime: {
      default: null
    }
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
          showSolt: false, // 是否使用插槽
          soltName: 'step0' // 插槽名称
          // showDialog: false
        },
        {
          title: '参数配置',
          detail: '',
          showline: false,
          index: '1',
          showDetail: false,
          showSolt: false, // 是否使用插槽
          soltName: 'step1' // 插槽名称
        },
        {
          title: '特征提取',
          detail: '',
          showline: false,
          index: '2',
          showDetail: false,
          showSolt: false, // 是否使用插槽
          soltName: 'step2' // 插槽名称
        },
        // {
        //   title: '初始图构建',
        //   detail: '',
        //   showline: false,
        //   index: '3',
        //   showDetail: false,
        //   showSolt: false, // 是否使用插槽
        //   soltName: 'step3'
        // },
        {
          title: '模型训练',
          detail: '',
          showline: false,
          index: '3',
          showDetail: false,
          showSolt: false,
          soltName: 'step3'
        },
        {
          title: '结束训练',
          detail: '',
          showline: false,
          index: '4',
          showDetail: false,
          showSolt: false, // 是否使用插槽
          soltName: 'step4'
        }
      ],
      flowItem: { 'index': 0 },
      stepVisible: false,
      stepShow: -1
    }
  },
  watch: {
    jobValue: {
      immediate: true,
      handler(n) {
        const index = updateValue.indexOf(n)
        if (index !== -1) {
          if (index !== 0) {
            this.clientList[index - 1].showSolt = false
          }
          this.clientList[index].showSolt = true
          if (index !== updateValue.length - 2) {
            this.clientList[index].showline = true
          }
          console.log('index', index)
          this.flowItem = this.clientList[index]
          console.log('index flowitem', this.flowItem)
        }
      }
    }
  },
  mounted() {
    this.$bus.$on('chartReset', () => {
      console.log('chartReset')
      this.$forceUpdate()
    })
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
      if (this.stepShow !== 7 & this.stepShow !== 5) {
        this.stepVisible = true
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
