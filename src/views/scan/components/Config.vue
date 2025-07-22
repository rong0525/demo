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
      <el-form-item prop="id" label="主机ID">
        <el-input v-model="form.id" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item prop="start_time" label="起始时间">
      <el-time-picker placeholder="选择时间" v-model="form.start_time" style="width: 50%;"></el-time-picker>
      </el-form-item>
      <el-form-item prop="region" label="快照粒度">
        <el-select v-model="form.region" placeholder="请选择快照粒度" popper-class="detail_popper">
          <el-option label="1小时" value="1h"></el-option>
          <el-option label="2小时" value="2h"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="GNN算子">
      <el-select v-model="form.graphSage" placeholder="请选择GNN算子">
        <el-option label="GraphSage" value="GraphSage"></el-option>
        <el-option label="graphsage_seq" value="seq"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="聚合方式">
      <el-select v-model="form.aggregation" placeholder="请选择聚合方式">
        <el-option label="MLP" value="MLP"></el-option>
        <el-option label="GRU" value="GRU"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item prop="epoch" label="平衡阈值">
        <el-slider v-model="form.value" :min="0.3" :max="0.9" :step="0.1" show-stops></el-slider>
      </el-form-item>
      <el-form-item label="编码尺度">
        <el-select v-model="form.scale" placeholder="请选择编码尺度">
          <el-option label="1.5" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>  
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
      form: {
        id: '',
        start_time: '',
        region: '1h',
        scale: '1',
        graphSage: 'GraphSage',
        aggregation: 'MLP',
        value: 0.5
      },
      disabled: false,
      fullscreenLoading: false
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
