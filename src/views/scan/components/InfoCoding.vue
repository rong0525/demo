<template>
  <div class="dashboard-editor-container">
    <div class="chart-wrapper">
      <el-card>
        <div slot="header">
          <svg-icon icon-class="dataset" class-name="svg-icon" />
          <span style="font-weight:bold">数据集参数</span>
        </div>
        <el-descriptions>
          <el-descriptions-item label="编码维度">128</el-descriptions-item>
          <el-descriptions-item label="分割方法">chronological_temporal</el-descriptions-item>
          <el-descriptions-item label="任务对象">node</el-descriptions-item>
          <el-descriptions-item label="任务类型">classification</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
      <div slot="header">
          <svg-icon icon-class="gnn" class-name="svg-icon" />
          <span style="font-weight:bold">GNN参数</span>
        </div>
        <el-descriptions>
          <el-descriptions-item label="激活函数">prelu</el-descriptions-item>
          <el-descriptions-item label="聚合方法">add</el-descriptions-item>
          <el-descriptions-item label="嵌入更新方法">gru</el-descriptions-item>
          <el-descriptions-item label="GRU内核">linear</el-descriptions-item>
          <el-descriptions-item label="网络层类型">residual_edge_conv</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
      <div slot="header">
          <svg-icon icon-class="metrix" class-name="svg-icon" />
          <span style="font-weight:bold">度量参数</span>
        </div>
        <el-descriptions>
          <el-descriptions-item label="mrr方法">max</el-descriptions-item>
          <el-descriptions-item label="度量优化方法">auto</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
      <div slot="header">
          <svg-icon icon-class="model" class-name="svg-icon" />
          <span style="font-weight:bold">模型参数</span>
        </div>
        <el-descriptions>
          <el-descriptions-item label="边解码">concat</el-descriptions-item>
          <el-descriptions-item label="边预测">label_index</el-descriptions-item>
          <el-descriptions-item label="嵌入更新方法">add</el-descriptions-item>
          <el-descriptions-item label="损失函数">cross_entropy</el-descriptions-item>
          <el-descriptions-item label="阈值">0.5</el-descriptions-item>
          <el-descriptions-item label="类型">gnn_recurrent</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
      <div slot="header">
          <svg-icon icon-class="optim" class-name="svg-icon" />
          <span style="font-weight:bold">优化参数</span>
        </div>
        <el-descriptions>
          <el-descriptions-item label="基础学习率">0.3</el-descriptions-item>
          <el-descriptions-item label="学习率衰减">0.1</el-descriptions-item>
          <el-descriptions-item label="最大迭代轮次">100</el-descriptions-item>
          <el-descriptions-item label="梯度更新权重">adam</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCoding',
  inject: ['reload'], // 注入依赖
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 10px 10px 10px;
    margin-bottom: 20px;
  }

}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
