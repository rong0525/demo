<script lang="ts">
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '地理测绘数据'
      }, {
        value: '选项2',
        label: '车辆及网联数据'
      }, {
        value: '选项3',
        label: '自动驾驶数据'
      }, {
        value: '选项4',
        label: '车路协同数据'
      }, {
        value: '选项5',
        label: '个人信息数据',
        children: [
          {
            value: '选项5-1',
            label: '身份信息'
          },
          {
            value: '选项5-2',
            label: '行踪轨迹数据'
          },
          {
            value: '选项5-3',
            label: '个人财产信息'
          },
          {
            value: '选项5-4',
            label: '生物特征数据'
          },
          {
            value: '选项5-5',
            label: '其他个人信息'
          }
        ]
      }, {
        value: '选项6',
        label: '平台运营数据'
      }, {
        value: '选项7',
        label: '企业及其他数据'
      }],
      testTableData: [
        {
          'first-class': '地理测绘数据',
          'second-class': '构图类数据',
          'name': '高精度构图数据',
          'level': '核心数据',
          'count': 2000,
          'related-domain-or-ip': 'dev.car-e.com'
        },
        {
          'first-class': '地理测绘数据',
          'second-class': '惯导类数据',
          'name': 'IMU惯导数据',
          'level': '重要数据',
          'count': 5000,
          'related-domain-or-ip': 'secure.car-d.com'
        },
        {
          'first-class': '自动驾驶数据',
          'second-class': '算法训练数据',
          'name': '标注训练数据',
          'level': '重要数据',
          'count': 25000,
          'related-domain-or-ip': 'train.car-e.com'
        },
        {
          'first-class': '车辆及联网数据',
          'second-class': 'OTA数据',
          'name': 'OTA升级包',
          'level': '一般数据',
          'count': 20,
          'related-domain-or-ip': 'ota.car-e.com'
        },
        {
          'first-class': '车辆及联网数据',
          'second-class': '网联通信数据',
          'name': '车联网通信日志',
          'level': '一般数据',
          'count': 1000,
          'related-domain-or-ip': 'connect.car-e.com'
        },
        {
          'first-class': '车路协同数据',
          'second-class': '车辆流量',
          'name': '城市车辆流量统计',
          'level': '重要数据',
          'count': 300,
          'related-domain-or-ip': 'traffic.car-d.com'
        },
        {
          'first-class': '车路协同数据',
          'second-class': '交通流指标数据',
          'name': '交通信号灯状态',
          'level': '一般数据',
          'count': 100,
          'related-domain-or-ip': 'signal.car-d.com'
        },
        {
          'first-class': '平台运营数据',
          'second-class': '充电运行数据',
          'name': '公共充电桩使用记录',
          'level': '一般数据',
          'count': 500,
          'related-domain-or-ip': 'charge.car-c.com'
        },
        {
          'first-class': '个人信息数据',
          'second-class': '生物特征数据',
          'name': '驾驶员面部数据',
          'level': '敏感个人信息',
          'count': 1500,
          'related-domain-or-ip': 'secure.car-d.com'
        },
        {
          'first-class': '企业及其它数据',
          'second-class': '企业经营数据',
          'name': '售后工单数据',
          'level': '一般数据',
          'count': 100,
          'related-domain-or-ip': 'service.car-a.com'
        }
      ]
    }
  }
}
</script>

<template>
  <el-row style="display: flex">
    <!--左边的选择框-->
    <el-col :lg="6">
      <el-cascader :options="options" clearable style="padding-left: 5vh;padding-top: 4vh" />
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
      <el-table border style="margin-top: 1vh" :data="testTableData" :cell-style="{color: '#8A8A8A'}">
        <el-table-column label="数据大类" prop="first-class" sortable />
        <el-table-column label="子类别" prop="second-class" sortable />
        <el-table-column label="数据资产名称" prop="name" sortable />
        <el-table-column v-slot:default="scope" label="敏感等级" prop="level" sortable>
          <template v-if="scope.row.level === '核心数据'">
            <el-tag color="#F7A6A6" style="color: #AF2828" disable-transitions>{{ scope.row.level }}</el-tag>
          </template>
          <template v-if="scope.row.level === '敏感个人信息'">
            <el-tag color="#FFD1BA" style="color: #AF5C28" disable-transitions>{{ scope.row.level }}</el-tag>
          </template>
          <template v-if="scope.row.level === '重要数据'">
            <el-tag color="#FFD98C" style="color: #AD7300" disable-transitions>{{ scope.row.level }}</el-tag>
          </template>
          <template v-if="scope.row.level === '一般数据'">
            <el-tag color="#C4CDF9" style="color: #284DBC" disable-transitions>{{ scope.row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="数据量（万条）" prop="count" sortable />
        <el-table-column label="关联域名/IP" prop="related-domain-or-ip" sortable />
      </el-table>
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
