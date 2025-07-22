<template>
  <el-row :gutter="40" class="panel-group" type="flex" justify="space-between">
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="normalflow" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总数据量</div>
          <count-to :start-val="0" :end-val="totalpcap" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="normalflow" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">车辆总数</div>
          <count-to :start-val="0" :end-val="totalv" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="normalflow" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">整体合规率</div>
          <count-to :start-val="0" :end-val="totalc" :duration="3200" class="card-panel-num" :decimals="2"
        suffix="%"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="normalflow" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">近七天数据量</div>
          <count-to :start-val="0" :end-val="totals" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import feature from '@/utils/feature'
import axios from 'axios'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      totalpcap: 0, 
      totalv: 0, 
      totals: 0, 
      totalc:0
    };
  },
  mounted() {
    this.fetchTotal(); // 组件加载时调用后端接口获取 total 值
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    calculateComplianceRate(data) {
        const { totalCompliant, totalItems } = Object.values(data).reduce(
          (acc, typeData) => {
            acc.totalCompliant += typeData.compliant;
            acc.totalItems += typeData.total;
            return acc;
          },
          { totalCompliant: 0, totalItems: 0 }
        );
        
        return totalItems === 0 
          ? 0 
          : Math.round((totalCompliant / totalItems) * 100 * 100) / 100;
      },
    fetchTotal() {
      feature.get('/vehicles/count').then(res => {
        console.log(res)
        this.totalv = res
      })
      feature.get('/pcap/count').then(res => {
        // console.log('total', this.total)
        this.totalpcap = res
      })
      feature.get('/pcap/getSeven').then(res => {
        // console.log('total', this.total)
        this.totals = res
      })
      feature.get('/compliance').then(res =>{
        console.log(res)
        this.totalc=this.calculateComplianceRate(res)
      })
        
      
    },

  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #EBEEF5;
      }

      .icon-message {
        background:	#87CEFA;
      }

      .icon-money {
        background: #90EE90;
      }

      .icon-shopping {
        background: #FFDEAD
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #E6A23C
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 55px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 15px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 25px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
