<template>
  <div class="dashboard-editor-container">
    <el-row v-show="isHome" :gutter="20">
      <el-col :xs="24" :sm="24" :lg="30">
        <div class="chart-wrapper">
          <h4 style="color: #1890ff;margin-top: 5px;margin-bottom: 5px">模型详情</h4>
          <el-descriptions>
            <el-descriptions-item label="ID">9946</el-descriptions-item>
            <el-descriptions-item label="主机名称">测试主机</el-descriptions-item>
            <el-descriptions-item label="操作系统">Windows 10</el-descriptions-item>
            <el-descriptions-item label="创建者">zxy</el-descriptions-item>
            <el-descriptions-item label="创建时间">2023-03-10T06:29:04</el-descriptions-item>
            <el-descriptions-item label="风险">
              <el-tag size="small" type="danger">高危</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
    <el-row v-show="isHome" :gutter="20">
      <el-col :xs="24" :sm="24" :lg="30">
        <div class="chart-wrapper">
          <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 5px">系统工作流程</h5>
          <StepsChart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RaddarChart from './components/RaddarChart'
import FlowChart from './components/FlowChart'
import JobConfig from './components/JobConfig'
import StepsChart from './components/StepsChart'

export default {
  name: 'Job',
  components: {
    JobConfig,
    RaddarChart,
    FlowChart,
    StepsChart
  },
  inject: ['reload'], // 注入依赖
  data() {
    return {
      jobValue: 0,
      myInterval: null,
      change: false,
      disabled: true,
      startTime: null,
      currentTime: null,
      isHome: true,
      jobForm: {}
    }
  },
  beforeDestroy() {
    console.log('destroying')
  },
  methods: {
    jobValueChange() {
      const that = this
      this.disabled = true
      sessionStorage.setItem('jobValue', 0)
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
    jobValueEnd() {
      if (this.myInterval != null) {
        clearInterval(this.myInterval)
        this.disabled = false
      }
    },
    getStartTime(time) {
      // 获取当前时间并打印
      const _this = this
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      _this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
      this.startTime = _this.gettime
    },
    jobConfig(childValue) {
      this.jobForm = childValue
      console.log('index jobForm', this.jobForm)
      this.disabled = false
    },
    resetConfig(childValue) {
      this.jobForm = childValue
      this.jobValueEnd()
      this.startTime = null
      this.jobValue = 0
      this.disabled = true
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('leaving')
    this.$destroy()
    next()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 10px;
    margin-bottom: 20px;
  }

}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
