<template>
  <div v-if="dialogTableVisible">
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="更新模型" @dragDialog="handleDrag">
      <!-- <el-select ref="select" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> -->
      <div>
        <el-row>
          <el-col>
            <line-chart></line-chart>
          </el-col>
          <el-col>
            <line-chart-f1></line-chart-f1>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import LineChartF1 from "@/views/feature/components/LineChartF1";
import LineChart from "@/views/feature/components/LineChart";
export default {
  name: 'DragDialogDemo',
  inject: ['reload'],
  components: {LineChartF1, LineChart, },
  directives: { elDragDialog, },
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      // options: [
      //   { value: '选项1', label: '黄金糕' },
      //   { value: '选项2', label: '双皮奶' },
      //   { value: '选项3', label: '蚵仔煎' },
      //   { value: '选项4', label: '龙须面' }
      // ],
      value: '',
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }]
    }
  },
  methods: {
    // v-el-drag-dialog onDrag callback function
    handleDrag() {
      this.$refs.select.blur()
    }
  },
  watch: {
    dialogTableVisible: {
      handler(n) {
        console.log("dialogTableVisible change", n);
        if (n === false) {
          this.$bus.$emit("dialogTableVisibleChange", n);
        }
      }
    }
  },
}
</script>
