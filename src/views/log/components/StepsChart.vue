<template>
  <div>
    <el-steps :active="current" align-center finish-status="success">
      <el-step v-for="item in steps" :key="item.title" :title="item.title" />
    </el-steps>
    <div class="steps-content">{{steps[current].content}}</div>
    <div class="steps-action">
      <el-button v-if="current < steps.length - 1" type="primary" @click="next">
        下一步
      </el-button>
      <el-button v-if="current == steps.length - 1" type="primary" @click="next;$message.success('流程已完成')">
        已完成
      </el-button>
      <el-button v-if="current>0" style="margin-left: 8px" @click="prev">
        上一步
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name:"StepsChart",
    props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
  },
    data() {
      return {
        current: 0,
        steps: [
          {
            title: '审计日志捕获',
            content: 'First-content',
          },
          {
            title: '数据溯源解析',
            content: 'Second-content',
          },
          {
            title: '溯源快照生成',
            content: 'Third-content',
          },
           {
            title: '时空信息编码',
            content: 'Forth-content',
          },
           {
            title: '图少数类平衡',
            content: 'Fifth-content',
          },
           {
            title: '多模型纠错检测',
            content: 'Last-content',
          },
        ],
      };
    },
    methods: {
      next() {
        this.current++;
      },
      prev() {
        this.current--;
      },
    },
  };
</script>

<style scoped>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 450px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
</style>
