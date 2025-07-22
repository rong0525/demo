<template>
  <div class="model" v-show="Visiable">
    <div class="mask"></div>
    <div class="model-dialog">
      <div class="model-header">
        <span style="font-weight:bold">新建主机环境</span>
      </div>
      <div class="model-body">
        <job-config v-on="{job_config: jobConfig}"/>
        <el-row>
        <el-col :span="12">
          <el-button class="button4" type="primary" size="mini" @click=close()>确 定</el-button>
        </el-col>
        <el-col :span="5">
          <el-button class="button3" size="mini" @click=close()>取 消</el-button>
        </el-col>
        </el-row>
      </div> 
    </div>
  </div>
</template>


<script>
import JobConfig from './HostConfig'

    export default {
        name: "DialogHost",
        components: {
          JobConfig
         },
        props: {
          Visible: Boolean,
        },
        data(){
          return{
            Visible:false,
            jobForm: {}
          }
        },
        methods: {
        jobConfig(childValue) {
          this.jobForm = childValue
          console.log('index jobForm', this.jobForm)
          this.$emit('cancel')
        },  
          close() {
            this.$emit('cancel');
          },
        }
    }
</script>

<style lang="css">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.model-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  width: 600px;
  height: 500px;
  border: 1px solid #f5f5f5;
  overflow: hidden;
  z-index: 9;
}

.model-header {
  position: relative;
  height: 50px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 15px;
  line-height: 30px;
  background-color: #f5f5f5;
  border-bottom: 1px solid rgb(177, 176, 176);
}
.model-body {
  height: 250px;
  line-height: 200px;
  font-size: 28px;
  text-align: center;
  background-color: #fff;
  z-index: 10000;
}

.button3 {
  position: relative;
  margin-top:280px;
  left: 10px;
}
.button4 {
  position: relative;
  margin-top: 280px;
  margin-left: 200px;
}

.icon-close {
  position: absolute;
  background-color: pink;
  right: 15px;
  top: 16px;
  width: 30px;
  height: 30px;
  z-index: 10;
  background-size: contain;
}
</style>
