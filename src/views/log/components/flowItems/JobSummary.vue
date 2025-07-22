<template>
  <el-descriptions class="margin-top" title="训练详情" :column="1" :size="size" style="height: auto">
    <el-descriptions-item label="开始时间">{{ startTime }}</el-descriptions-item>
    <el-descriptions-item label="状态">{{ state }}</el-descriptions-item>
  </el-descriptions>
</template>

<script>
import resize from '../mixins/resize'
export default {
  name: 'JobDetail',
  mixins: [resize],
  props: {
    jobValue: {
      default: 0
    },
    startTime: {
      default: null
    },
    isHome: {
      default: null
    }
  },
  data() {
    return {
      size: '',
      state: '等待开始'
    }
  },
  watch: {
    jobValue(newval) {
      if (newval > 0) {
        this.state = '进行中'
      } else {
        this.state = '等待开始'
      }
    }
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    sentIsHome() {
      this.isHome(false)
    },
    emitToParent() {
      this.$emit('child-event', 'true')
    }
  }
}
</script>

<style scoped></style>
