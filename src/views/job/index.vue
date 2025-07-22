<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20" v-show="isHome">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 5px">训练进度</h5>
            <raddar-chart :job-value="jobValue" />
          <div style="position:center;height: 50px">
            <el-button type="primary" size="mini" :disabled="disabled" @click="jobValueChange">开始训练</el-button>
            <el-button type="danger" size="mini"  :disabled="!disabled" @click="jobValueEnd">停止训练</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
            <job-config v-on="{job_config:jobConfig,reset_config:resetConfig}" />
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;margin-bottom:10px;" v-show="isHome">
      <div class="chart-wrapper">
          <flow-chart :job-value="jobValue" :job-form="jobForm" :start-time="startTime"/>
      </div>
    </el-row>
  </div>

</template>

<script>
import RaddarChart from './components/RaddarChart'
import JobSummary from './components/flowItems/JobSummary'
import FlowChart from './components/FlowChart'
import JobConfig from './components/JobConfig'

export default {
  name: 'Job',
  components: {
    JobConfig,
    RaddarChart,
    JobSummary,
    FlowChart
  },
  inject:['reload'],  //注入依赖
  data() {
    return {
      jobValue: 0,
      myInterval:null,
      change:false,
      disabled: true,
      startTime: null,
      currentTime: null,
      isHome: true,
      jobForm:{},
    }
  },
  methods: {
    jobValueChange(){
      let that = this
      this.disabled = true
      sessionStorage.setItem("jobValue",0)
      this.getStartTime()
      this.myInterval = setInterval(function() {
        if (that.jobValue < 100) {
          that.jobValue = that.jobValue + 1
        } else {
          clearInterval(that.myInterval)
          that.$message({
            message: '模型训练结束',
            type: 'success'
          })
          // setTimeout(()=>{
          //   that.reload();
          // },50000)
        }
      }, 600)
    },
    jobValueEnd(){
      if(this.myInterval !=null){
        clearInterval(this.myInterval)
        this.disabled = false
      }
    },
    getStartTime(time) {
      //获取当前时间并打印
      let _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
      this.startTime = _this.gettime
    },
    jobConfig(childValue){
      this.jobForm = childValue
      console.log("index jobForm", this.jobForm);
      this.disabled = false
    },
    resetConfig(childValue){
      this.jobForm = childValue
      this.jobValueEnd()
      this.startTime = null
      this.jobValue = 0
      this.disabled = true
    }
  },
  beforeDestroy(){
    console.log('destroying');
  },
  beforeRouteLeave(to, from, next) {
    console.log("leaving");
    this.$destroy();
    next()
  },
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 20px;
  }

}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
