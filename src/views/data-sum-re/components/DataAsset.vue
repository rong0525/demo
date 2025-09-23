<script lang="ts">
import { getTableData } from '@/views/data-sum-re/database/db.ts'
export default {
  data() {
    return {
      props: {
        expandTrigger: 'click'
      },
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
      pageSize: 10,
      // 自定义二级下拉：开关与尺寸、定位
      useCustomCascader: true,
      activeLeftIndex: -1,
      submenuOptions: [],
      submenuTop: 0,
      leftWidth: 0,
      panelMaxHeight: 300,
      containerWidth: 0,
      // 可配置：每列固定宽度（>0 时优先生效），用于缩小下拉框宽度
      fixedLeftWidth: 180,
      // 顶部触发器开关
      isOpen: false,
      selectedLabel: ''
    }
  },
  mounted() {
    getTableData().then(res => {
      this.allTableData = res.concat()
      this.tableData = res.concat()
    })
    this.$nextTick(() => {
      this.updateCascaderLayout()
      window.addEventListener('resize', this.updateCascaderLayout)
      document.addEventListener('click', this.onDocumentClick)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateCascaderLayout)
    document.removeEventListener('click', this.onDocumentClick)
  },
  methods: {
    // 定义选中的功能
    handleSelector,
    toggleOpen(e) {
      e && e.stopPropagation()
      this.isOpen = !this.isOpen
    },
    onDocumentClick() {
      // 点击空白关闭，仅保留上方触发框
      if (this.isOpen) {
        this.isOpen = false
        this.activeLeftIndex = -1
      }
    },
    onLeftClick(idx, item) {
      this.activeLeftIndex = idx
      this.submenuOptions = Array.isArray(item.children) ? item.children : []
      this.$nextTick(() => {
        const menus = this.$refs.menus
        const left = this.$refs.leftList
        const items = this.$refs.leftItem
        if (!menus || !left || !items) return
        const itemEl = Array.isArray(items) ? items[idx] : items
        if (!itemEl) return
        const menusRect = menus.getBoundingClientRect()
        const itemRect = itemEl.getBoundingClientRect()
        const scrollTop = left.scrollTop || 0
        // 顶部与被选一级项对齐；允许下面溢出
        const top = (itemRect.top - menusRect.top) - scrollTop
        this.submenuTop = Math.max(top, 0)
      })
    },
    onRightClick(parent, child) {
      const valuePath = [parent && parent.value, child && child.value].filter(Boolean)
      if (valuePath.length) {
        this.selectedLabel = [parent && parent.label, child && child.label].filter(Boolean).join(' / ')
        this.isOpen = false
        this.activeLeftIndex = -1
        handleSelector.call(this, valuePath)
      }
    },
    updateCascaderLayout() {
      const box = this.$refs.cascaderBox
      if (!box) return
      const width = box.clientWidth || 0
      this.containerWidth = width
      // 优先固定列宽
      if (this.fixedLeftWidth && this.fixedLeftWidth > 0) {
        this.leftWidth = this.fixedLeftWidth
      } else {
        const half = Math.floor(width / 2)
        this.leftWidth = Math.max(120, half)
      }
    },
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
    },
    clearSelection() {
      this.selectedLabel = ''
      this.isOpen = false
      this.activeLeftIndex = -1
      // 重置表格为全部数据
      handleSelector.call(this, [])
    }
  }
}
// data 返回的数据是 array
function handleSelector(data) {
  let filteredTableData = []
  if (data.length > 0) {
    filteredTableData = this.allTableData.filter(item => {
      return item.data_category === data[0] && item.data_son_category === data[1]
    })
    this.tableData = filteredTableData
  } else {
    console.log(this.allTableData)
    this.tableData = this.allTableData.concat()
  }
}
</script>

<template>
  <el-row class="dataasset-row" style="display: flex">
    <!--左边的选择框-->
    <!-- <el-col :lg="6" style="text-align: center;">
      <div class="data_assets_title">汽车分类分级</div>
      <el-cascader
        :options="options"
        clearable
        :props="props"
        style="padding-top: 3vh"
        @change="handleSelector"
      /> -->
    <el-col :lg="6">
      <div class="data_assets_title">汽车分类分级</div>
      <!-- 顶部触发器 -->
      <div class="el-select custom-select" @click.stop="toggleOpen">
        <div class="el-input el-input--suffix">
          <input class="el-input__inner" readonly :placeholder="'Select'" :value="selectedLabel">
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i v-if="selectedLabel" class="el-input__icon el-icon-circle-close clear-icon" @click.stop="clearSelection" />
              <i class="el-select__caret el-input__icon el-icon-arrow-up" :class="{ 'is-reverse': isOpen }" />
            </span>
          </span>
        </div>
      </div>
      <!-- 自定义二级下拉 -->
      <div v-if="useCustomCascader" ref="cascaderBox" class="custom-cascader" :style="{ paddingLeft: '1vh', paddingTop: '1vh' }">
        <div v-show="isOpen" ref="menus" class="el-cascader-menus" :style="{ width: (leftWidth*2) + 'px' }">
          <div ref="leftList" class="el-cascader-menu" :style="{ width: leftWidth + 'px', maxHeight: panelMaxHeight + 'px' }">
            <div
              v-for="(item, idx) in options"
              :key="item.value"
              ref="leftItem"
              class="el-cascader-node"
              :class="{ 'is-active': idx===activeLeftIndex }"
              @click.stop="onLeftClick(idx, item)"
            >
              <span class="el-cascader-node__label">{{ item.label }}</span>
              <i class="el-icon-arrow-right el-cascader-node__postfix" />
            </div>
          </div>
          <div
            v-show="isOpen && activeLeftIndex>-1"
            class="el-cascader-menu right"
            :style="{ top: submenuTop + 'px', left: leftWidth + 'px', width: leftWidth + 'px', maxHeight: panelMaxHeight + 'px' }"
          >
            <div
              v-for="child in submenuOptions"
              :key="child.value"
              class="el-cascader-node"
              @click.stop="onRightClick(options[activeLeftIndex], child)"
            >
              <span class="el-cascader-node__label">{{ child.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <el-cascader v-else :options="options" clearable style="padding-left: 1vh;padding-top: 2vh" @change="handleSelector" />
    </el-col>
    <el-col :lg="1" class="divider-container"><el-divider class="el-divider--vertical" direction="vertical" /></el-col>
    <!--右边的表格-->
    <el-col :lg="17">
      <!--      第一行的表格按钮-->
      <!--      <div style="margin-top: 1vh">-->
      <!--        <i class="el-icon-s-fold table-icon" />-->
      <!--        <i class="el-icon-s-operation table-icon" style="float: right;" />-->
      <!--        <i class="el-icon-share table-icon" style="float: right;" />-->
      <!--        <i class="el-icon-printer table-icon" style="float: right;" />-->
      <!--      </div>-->
      <div class="data_assets_title">汽车重要数据识别结果</div>
      <el-table border style="margin-top: 1.5vh" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :cell-style="{color: '#8A8A8A'}">
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
        <el-table-column label="数据量（条）" prop="volume" sortable />
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
.data_assets_title {
  text-align: center;
  margin-top: 1.5vh;
  color: #4560F7;
  letter-spacing: 0.05vh;
  font-size: 2.2vh;
  font-weight: 550;
}
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
<style lang="scss">
.my_cascader .el-cascader-menu{
  //padding-top: 2vh;
}
.custom-cascader { position: relative; overflow: visible; }
.el-cascader-menus { position: relative; }
.el-cascader-menu { position: relative; display: inline-block; vertical-align: top; border: 1px solid #e4e7ed; border-radius: 4px; background: #fff; overflow: auto; max-height: 300px; }
.el-cascader-menu + .el-cascader-menu { margin-left: 0; }
.el-cascader-menu.right { position: absolute; box-shadow: 0 2px 12px rgba(0,0,0,.1); }
.el-cascader-node { display: flex; align-items: center; justify-content: space-between; line-height: 34px; height: 34px; padding: 0 10px; color: #606266; cursor: pointer; }
.el-cascader-node:hover { background: #f5f7fa; }
.el-cascader-node.is-active { color: #409EFF; background: #ecf5ff; }
.el-cascader-node__label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.el-cascader-node__postfix { color: #c0c4cc; }
.table-icon { font-size: 3.2vh; color: #606266; padding-right: 1.3vh; }
.table-icon:hover { color: #5b98ef; }
.divider-container { display: flex; justify-content: center }
.el-divider--vertical{ display: flex; width: 2px; height: 100%; vertical-align:middle; position:relative; }
.custom-cascader, .el-cascader-menus { z-index: 3000; }
.el-cascader-menu.right { z-index: 3001; }
.el-cascader-node { font-size: 14px; height: 34px; line-height: 34px; }
.el-cascader-node__label { font-size: 14px; }
.custom-cascader .el-cascader-menu { min-width: auto !important; }
.dataasset-row { min-height: 420px; }
.select-trigger { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; user-select: none; padding: 4px 10px; border: 1px solid #dcdfe6; border-radius: 4px; background: #fff; color: #606266; }
.select-trigger:hover { border-color: #c0c4cc; }
.select-trigger .el-icon-arrow-down { transition: transform .2s; }
.select-trigger .el-icon-arrow-down.is-open { transform: rotate(180deg); }
.custom-select { width: 100%; max-width: 450px; margin: 1.5vh 1vh 1vh 1vh; }
.custom-select .el-input__inner { cursor: pointer; }
.el-select__caret.is-reverse { transform: rotate(180deg); transition: transform .2s; }
</style>
