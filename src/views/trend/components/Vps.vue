<template>

<el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :pie-data="pieData.DohVps" id="DohVps" :key="keydata"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :pie-data="pieData.DoqVps" id="DoqVps" :key="keydata"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :pie-data="pieData.DotVps" id="DotVps" :key="keydata"/>
          </div>
        </el-col>
      </el-row>
    
</template>

<script>
import PieChart from './PieChart.vue';
import  axios from "axios";

export default{
    components:{
        PieChart
    },
    data(){
        return{
            keydata:0,


            pieData: {
                "DohVps": {
                    title: "DOH地域统计",
                    // data: DohCountryData,
                    data: [],
                    domId: "DohVps",
                    seriesName: '国家——总数(百分比)',
                },
                "DoqVps": {
                    title: "DOQ地域统计",
                    data: [
                        
                    ],
                    domId: "DoqVps",
                    seriesName: '国家——总数(百分比)',
                },
                "DotVps": {
                    title: "DOT地域统计",
                    data: [
                       
                    ],
                    domId: "DotVps",
                    seriesName: '国家——总数(百分比)',
                }
                
            },

        }
    },
    methods:{
        async getData(){
            const dohresponse = await axios.get('http://localhost:9292/getDohVps');
            const dotresponse = await axios.get('http://localhost:9292/getDotVps');
            const doqresponse = await axios.get('http://localhost:9292/getDoqVps');
            const Dohdata=[]
            const Dotdata=[]
            const Doqdata=[]


            Dohdata.push({value:dohresponse.data.vpskorea+dohresponse.data.both,name:'韩国'})
            Dohdata.push({value:(dohresponse.data.vpschina+dohresponse.data.both),name:'中国'})
            

            Doqdata.push({value:doqresponse.data.vpskorea+doqresponse.data.both,name:'韩国'})
            Doqdata.push({value:doqresponse.data.vpschina+doqresponse.data.both,name:'中国'})
            


            Dotdata.push({value:dotresponse.data.vpskorea+dotresponse.data.both,name:'韩国'})
            Dotdata.push({value:dotresponse.data.vpschina+dotresponse.data.both,name:'中国'})
            
            // console.log(Dohdata)
            // this.$set(this.pieData.DohVps,'data',Dohdata);
            this.pieData.DohVps.data=Dohdata
            this.pieData.DotVps.data=Dotdata
            this.pieData.DoqVps.data=Doqdata
            this.keydata+=1;
        }
    },
    created(){
        this.getData();
    }
}
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}


@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>