<template>
  <div style="height: 374.09px;width: 100%;">
    <h5 style="color: #1890ff;margin-top: 5px;margin-bottom: 20px">训练设置</h5>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      label-position="left"
      size="mini"
      style="color:#606266;"
    >
      <el-form-item prop="epoch">
        <span slot="label">
             <span class="formLabel">训练轮次</span>
        </span>
        <el-input v-model="form.epoch"></el-input>
      </el-form-item>
      <el-form-item prop="batchSize">
        <span slot="label">
             <span class="formLabel">Batch数量</span>
        </span>
        <el-input v-model="form.batchSize"></el-input>
      </el-form-item>
      <el-form-item prop="learningRate">
        <span slot="label">
             <span class="formLabel">学习率</span>
        </span>
        <el-input v-model="form.learningRate"></el-input>
      </el-form-item>
      <el-form-item prop="sample_1">
        <span slot="label">
             <span class="formLabel">采样邻居数量</span>
        </span>
        <el-input v-model="form.sample_1" style="margin-bottom: 5px"></el-input>
        <el-input v-model="form.sample_2" style="margin-bottom: 5px"></el-input>
        <el-input v-model="form.sample_3" style="margin-bottom: 5px"></el-input>
      </el-form-item>
      <el-form-item label="graphSage模型">
        <span slot="label">
             <span class="formLabel">graphSage</span>
        </span>
        <el-select v-model="form.graphSage" placeholder="请选择模型类型">
          <el-option label="graphsage_mean" value="mean"></el-option>
          <el-option label="graphsage_seq" value="seq"></el-option>
          <el-option label="graphsage_maxpool" value="maxpool"></el-option>
          <el-option label="graphsage_meanpool" value="meanpool"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IDGL框架">
        <span slot="label">
             <span class="formLabel">使用IDGL</span>
        </span>
        <el-radio-group v-model="form.idgl">
          <el-radio   :label="0">是</el-radio>
          <el-radio  :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" size="mini" :disabled="disabled">确 定</el-button>
        <el-button size="mini" @click="reset">重 置</el-button>
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
        epoch: 100,
        batchSize: 512,
        learningRate: 0.01,
        sample_1:10,
        sample_2:5,
        sample_3:0,
        graphSage:'mean',
        idgl:0,
      },
      disabled: false,
    }
  },
  methods: {
    submitForm(formName) {
      this.disabled = true
      this.$emit("job_config",this.form)
    },
    resetForm(){
      this.form = {
        epoch: undefined,
        batchSize: undefined,
        learningRate: undefined,
        sample_1:undefined,
        sample_2:undefined,
        sample_3:undefined,
        graphSage:undefined,
        idgl:0,
      }
      this.disabled = false
      this.$emit("reset_config",this.form)
    },
    reset() {
      this.form = {
        epoch: undefined,
        batchSize: undefined,
        learningRate: undefined,
        sample_1:undefined,
        sample_2:undefined,
        sample_3:undefined,
        graphSage:undefined,
        idgl:0,
      }
      this.disabled = false
      this.$emit("reset_config",this.form)
      this.$bus.$emit("chartRest")
    },
  },
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}


.formLabel {
  font-weight: 450;
}

</style>
