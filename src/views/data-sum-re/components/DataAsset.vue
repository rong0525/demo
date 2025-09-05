<script lang="ts">
import { getTableData } from '@/views/data-sum-re/database/db.ts'
export default {
  data() {
    return {
      // todo 这里先写死吧，后面有接口了再说
      options: [{
        value: '地理测绘数据',
        label: '地理测绘数据',
        children: [
          {
            value: '位置类数据',
            label: '位置类数据'
          },
          {
            value: '点云类数据',
            label: '点云类数据'
          },
          {
            value: '影像类数据',
            label: '影像类数据'
          },
          {
            value: '惯导类数据',
            label: '惯导类数据'
          },
          {
            value: '构图类数据',
            label: '构图类数据'
          },
          {
            value: '自动驾驶地图数据',
            label: '自动驾驶地图数据'
          }
        ]
      }, {
        value: '车辆及网联数据',
        label: '车辆及网联数据',
        children: [
          {
            value: '算法训练数据',
            label: '算法训练数据'
          },
          {
            value: '算法模型',
            label: '算法模型'
          },
          {
            value: '算法特征数据',
            label: '算法特征数据'
          },
          {
            value: '源代码',
            label: '源代码'
          },
          {
            value: '研发类数据',
            label: '研发类数据'
          }
        ]
      }, {
        value: '自动驾驶数据',
        label: '自动驾驶数据',
        children: [
          {
            value: '车辆数据',
            label: '车辆数据'
          },
          {
            value: 'OTA数据',
            label: 'OTA数据'
          },
          {
            value: '网联通信数据',
            label: '网联通信数据'
          },
          {
            value: '研发类数据',
            label: '研发类数据'
          }
        ]
      }, {
        value: '车路协同数据',
        label: '车路协同数据',
        children: [
          {
            value: '人员流量',
            label: '人员流量'
          },
          {
            value: '车辆流量',
            label: '车辆流量'
          },
          {
            value: '目标物成像数据',
            label: '目标物成像数据'
          },
          {
            value: '交通流指标数据',
            label: '交通流指标数据'
          }
        ]
      }, {
        value: '个人信息数据',
        label: '个人信息数据',
        children: [
          {
            value: '身份信息',
            label: '身份信息'
          },
          {
            value: '行踪轨迹数据',
            label: '行踪轨迹数据'
          },
          {
            value: '个人财产信息',
            label: '个人财产信息'
          },
          {
            value: '生物特征数据',
            label: '生物特征数据'
          },
          {
            value: '其他个人信息',
            label: '其他个人信息'
          }
        ]
      }, {
        value: '平台运营数据',
        label: '平台运营数据',
        children: [
          {
            value: '网络规划数据',
            label: '网络规划数据'
          },
          {
            value: '充电运行数据',
            label: '充电运行数据'
          }
        ]
      }, {
        value: '企业及其他数据',
        label: '企业及其他数据',
        children: [
          {
            value: '企业经营数据',
            label: '企业经营数据'
          },
          {
            value: '其他数据',
            label: '其他数据'
          }
        ]
      }],
      tableData: [],
      allTableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted() {
    getTableData().then(res => {
      this.allTableData = res.concat()
      this.tableData = res.concat()
    })
  },
  methods: {
    // 定义选中的功能
    handleSelector,
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  }
}
// data 返回的数据是 array
function handleSelector(data) {
  let filteredTableData = []
  console.log(data.length)
  if (data.length > 0) {
    filteredTableData = this.allTableData.filter(item => {
      return item.data_category === data[0] && item.data_son_category[1]
    })
    this.tableData = filteredTableData
  } else {
    console.log(this.allTableData)
    this.tableData = this.allTableData.concat()
  }
}
</script>

<template>
  <el-row style="display: flex">
    <!--左边的选择框-->
    <el-col :lg="6">
      <el-cascader :options="options" clearable style="padding-left: 5vh;padding-top: 4vh" @change="handleSelector" />
    </el-col>
    <el-col :lg="1" class="divider-container"><el-divider class="el-divider--vertical" direction="vertical" /></el-col>
    <!--右边的表格-->
    <el-col :lg="17">
      <!--      第一行的表格按钮-->
      <div style="margin-top: 1vh">
        <i class="el-icon-s-fold table-icon" />
        <i class="el-icon-s-operation table-icon" style="float: right;" />
        <i class="el-icon-share table-icon" style="float: right;" />
        <i class="el-icon-printer table-icon" style="float: right;" />
      </div>
      <el-table border style="margin-top: 1vh" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :cell-style="{color: '#8A8A8A'}">
        <el-table-column label="数据大类" prop="data_category" sortable />
        <el-table-column label="子类别" prop="data_son_category" sortable />
        <el-table-column label="数据资产名称" prop="data_assets" sortable />
        <el-table-column v-slot:default="scope" label="敏感等级" prop="sensitivity_level" sortable>
          <template v-if="scope.row.sensitivity_level === 1">
            <el-tag color="#F7A6A6" style="color: #AF2828" disable-transitions>核心数据</el-tag>
          </template>
          <template v-if="scope.row.sensitivity_level === 2">
            <el-tag color="#FFD1BA" style="color: #AF5C28" disable-transitions>敏感个人信息</el-tag>
          </template>
          <template v-if="scope.row.sensitivity_level === 3">
            <el-tag color="#FFD98C" style="color: #AD7300" disable-transitions>重要数据</el-tag>
          </template>
          <template v-if="scope.row.sensitivity_level === 4">
            <el-tag color="#C4CDF9" style="color: #284DBC" disable-transitions>一般数据</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="数据量（万条）" prop="volume" sortable />
        <el-table-column label="关联域名/IP" prop="associated_domain_ip" sortable />
      </el-table>
      <el-pagination
        align="center"
        :current-page="currentPage"
        :page-sizes="[10,20,50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        style="margin-top: 1vh"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

    </el-col>
  </el-row>
</template>

<style scoped>
.table-icon {
  font-size: 3.2vh;
  color: #606266;
  padding-right: 1.3vh;
}
.table-icon:hover {
  color: #5b98ef;
}
.divider-container {
  display: flex;
  justify-content: center
}
.el-divider--vertical{
  display: flex;
  width: 2px;
  height: 100%;
  vertical-align:middle;
  position:relative;
}
</style>
