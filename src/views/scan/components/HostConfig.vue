<template>
  <div class="configform" style="height: 100px;width: 85%;margin-top:30px;margin-left:20px;">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      label-position="left"
      size="mini"
      style="color:#606266;"
    >
      <el-form-item prop="ip" label="主机IP">
        <el-input v-model="form.ip" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="用户名">
        <el-input v-model="form.name" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item prop="pwd" label="密码">
        <el-input v-model="form.pwd" style="width: 50%;"></el-input>
      </el-form-item>
        </el-form>  
     
  </div>
</template>

<script>
export default {
  name: 'JobConfig',
  data() {
    return {
      form: {
        ip: '',
        name: '',
        pwd: ''
      },
      connect: false,
      fullscreenLoading: false
    }
  },
  methods: {
    openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
            this.fullscreenLoading = false;
            this.$message.success({message: "已成功连接！", duration: 4000})
     }, 3000);
        this.connect=true;
    },
    submitForm(formName) {
      this.disabled = true
      this.$emit("job_config", this.form)
    },
    resetForm() {
      this.form = {
        ip: undefined,
        name: '',
        pwd: ''
      }
      this.disabled = false
      this.$emit("reset_config", this.form)
    },
    reset() {
      this.form = {
        ip: undefined,
        name: '',
        pwd: ''
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
.button2 {
  position: relative;
  top: 180px;
  right: 0px;
}

.el-select-dropdown.el-popper.detail_popper{
  z-index :10000 !imporant;
}
</style>
