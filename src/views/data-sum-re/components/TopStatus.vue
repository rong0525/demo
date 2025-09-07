<script lang="ts">
import { fetchCrossBorderDomainCount, fetchDomainUniqueCount, fetchFlowCount } from '@/views/data-sum-re/database/db.ts'

export default {
  data() {
    return {
      allDomainCount: 0,
      crossBorderDomainCount: 0,
      crossBorderDomainPercent: 0,
      inFlowCount: 0,
      outFlowCount: 0,
      timer: null
    }
  },
  created() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    } else {
      this.timer = setInterval(() => {
        this.updateData()
        console.log(this.lineChartData.actualData)
      }, 3000)
    }
  },
  mounted() {
    this.updateData()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    updateData() {
      fetchDomainUniqueCount().then(res => {
        this.allDomainCount = res
        // 通过嵌套保证串行
        fetchCrossBorderDomainCount().then(res => {
          this.crossBorderDomainCount = res
          this.crossBorderDomainPercent = ((this.crossBorderDomainCount / this.allDomainCount) * 100.00).toFixed(2)
        })
      })
      fetchFlowCount().then(res => {
        this.inFlowCount = res.inflowCount
        this.outFlowCount = res.outflowCount
      })
    }
  }
}
</script>

<template>
  <el-card>
    <el-row style="margin-left: 7vh">
      <!--第一块-->
      <el-col :span="4">
        <el-row>
          <el-col style="text-align: center" :span="5">
            <img class="top-status-pic" src="./image/status1.png" alt="">
          </el-col>
          <el-col :span="15">
            <div class="top-status-title">数据流入总量</div>
            <div class="top-status-data">{{ inFlowCount }} 条</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="top-status-description" :span="22">
            截止到今日00:00时的数据流入总量
          </el-col>
        </el-row>
      </el-col>
      <!--第二块-->
      <el-col :span="4" style="margin-left: 3vh;">
        <el-row>
          <el-col style="text-align: center" :span="5">
            <img class="top-status-pic" src="./image/status2.png" alt="">
          </el-col>
          <el-col :span="15">
            <div class="top-status-title">数据流出总量</div>
            <div class="top-status-data">{{ outFlowCount }} 条</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="top-status-description" :span="22">
            截止到今日00:00时的数据流出总量
          </el-col>
        </el-row>
      </el-col>
      <!--第三块-->
      <el-col :span="4" style="margin-left: 3vh;">
        <el-row>
          <el-col style="text-align: center" :span="5">
            <img class="top-status-pic" src="./image/status3.png" alt="">
          </el-col>
          <el-col :span="15">
            <div class="top-status-title">域名资产总数</div>
            <div class="top-status-data"> {{ allDomainCount }} 个</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="top-status-description" :span="22">
            已关联车企域名总数
          </el-col>
        </el-row>
      </el-col>
      <!--第四块-->
      <el-col :span="4" style="margin-left: 3vh;">
        <el-row>
          <el-col style="text-align: center" :span="5">
            <img class="top-status-pic" src="./image/status4.png" alt="">
          </el-col>
          <el-col :span="15">
            <div class="top-status-title">高风险域名数</div>
            <div class="top-status-data"> {{ crossBorderDomainCount }} 个</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="top-status-description" :span="22">
            存在高风险流转行为的域名
          </el-col>
        </el-row>
      </el-col>
      <!--第五块-->
      <el-col :span="4" style="margin-left: 3vh;">
        <el-row>
          <el-col style="text-align: center" :span="5">
            <img class="top-status-pic" src="./image/status5.png" alt="">
          </el-col>
          <el-col :span="15">
            <div class="top-status-title">跨境流量占比</div>
            <div class="top-status-data">{{ crossBorderDomainPercent }} %</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="top-status-description" :span="22">
            总流量中跨境部分占比
          </el-col>
        </el-row>
      </el-col>
      <el-col style="text-align: center" :span="2">
        <img style="width: 6.7vh;height: 6.7vh;" src="./image/decorator.png" alt="">
      </el-col>
    </el-row>
  </el-card>

</template>

<style scoped>
.top-status-title {
  font-size: 2.2vh;
  text-align:  center;
  overflow: hidden;
  color: #828282;
}
.top-status-data {
  font-size: 3.5vh;
  color: #4560F7;
  text-align: center;
}
.top-status-description {
  font-size: 1.5vh;
  text-align: center;
  color: #828282;
}
.top-status-pic {
  height: 95%;
  width: 95%;
}
</style>
