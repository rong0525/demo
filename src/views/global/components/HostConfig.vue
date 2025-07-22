<template>
  <div class="configform" style="height: 100px;width: 85%;margin-top:30px;margin-left:20px;">
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      label-position="left"
      size="mini"
      style="color:#606266;"
    >
      <el-form-item label="上传Pcap包">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传pcap文件</div>
      </el-upload>
      </el-form-item>
      <el-form-item prop="name" label="监听网段">
        <el-input v-model="form.name" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item prop="interface" label="被监听网卡">
         <el-input v-model="form.interface" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item prop="mode" label="输出模式">
        <el-input v-model="form.mode" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item prop="output" label="输出文件">
        <el-input v-model="form.output" style="width: 50%;"></el-input>
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
        name: '',
        interface:'',
        mode:'',
        output:'',
      },
      connect: false,
      fullscreenLoading: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
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
        name: '',
        interface:'',
        mode:'',
        output:'',
      }
      this.disabled = false
      this.$emit("reset_config", this.form)
    },
    reset() {
      this.form = {
        name: '',
        interface:'',
        mode:'',
        output:'',
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
