<template>
  <div class="configform" style="height: 100px;width: 85%;margin-top:30px;margin-left:20px;">
   <div class="demo-image__placeholder">
  <div class="block">
    <el-image :src="src"></el-image>
  </div>
  <div class="block">
    <span class="demonstration">自定义</span>
    <el-image :src="src">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
</div>
    <el-button 
    class="button1" 
    type="primary" 
    size="mini" 
    v-loading.fullscreen.lock="fullscreenLoading" 
    @click="openFullScreen1();submitForm('form')">
    确 定
    </el-button>
     
  </div>
</template>

<script>
export default {
  name: 'JobConfig',
  data() {
    return {
        src: '/rule.png'
      }
    },
  methods: {
    openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
            this.fullscreenLoading = false;
            this.$message.success({message: "新建成功！", duration: 4000})
     }, 3000);
    },
    submitForm(formName) {
      this.disabled = true
      this.$emit("job_config", this.form)
    },
    close() {
        this.$emit('cancel')
    },
    resetForm() {
      this.form = {
        id: undefined,
        start_time: '',
        region: undefined,
        scale: '1',
        graphSage: undefined,
        aggregation: undefined,
        value: 0.3
      }
      this.disabled = false
      this.$emit("reset_config", this.form)
    },
    reset() {
      this.form = {
        id: undefined,
        start_time: '',
        region: undefined,
        scale: '1',
        graphSage: undefined,
        aggregation: undefined,
        value: 0.3
      }
      this.disabled = false
      this.$emit("reset_config", this.form)
      this.$bus.$emit("chartRest")
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}

.formLabel {
  font-weight: 450;
}
.configform {
  z-index: 100;
}
.button1 {
  position: relative;
  top: 35px;
}

.el-select-dropdown.el-popper.detail_popper{
  z-index :10000 !imporant;
}
</style>
