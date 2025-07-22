<template>
  <div class="app-container"> 
    <el-tabs type="card" :tab-position="tabPosition" style="height: 520px;" @tab-click="handleTabChange">
        <el-tab-pane label="图像" lazy>
          
          <div style="display: flex; gap: 16px;">
            <div style="flex: 1;"><PieChart :pieData="picturePieData"  /></div>
            <div style="flex: 1;"><DayPictureChange /></div>
          </div>  
        </el-tab-pane>
        <el-tab-pane label="视频" lazy>
            <div style="display: flex; gap: 16px;">
            <div style="flex: 1;"><PieChart :pieData="videoPieData" /></div>
            <div style="flex: 1;"><DayPictureChange /></div>
          </div> 
        </el-tab-pane>
        <el-tab-pane label="音频" lazy>
            <div style="display: flex; gap: 16px;">
            <div style="flex: 1;"><PieChart :pieData="audioPieData" /></div>
            <div style="flex: 1;"><DayAudioChange /></div>
          </div> 
        </el-tab-pane>
    </el-tabs>
    
  </div>
</template> 

<script>
// import { getList } from '@/api/table'
import axios from 'axios'


import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';
import DayPictureChange from './DayPictureChange.vue';
import VideoPie from './VideoPie.vue';
import AudioPie from './AudioPie.vue';
import feature from '@/utils/feature';
import DayAudioChange from './DayAudioChange.vue';
export default {
  name: 'FlowCard',
  components:{
    VideoPie,
    AudioPie,
    DayPictureChange,
    LineChart,
    PieChart,
    DayAudioChange,

    
  },
  data() {
    return {
      // keydata:0,
      tabPosition: 'top',
      
      picturePieData:[],
      videoPieData:[],
      audioPieData:[],
    }
  },
  created() {
    this.getData()

  },
  methods: {
    handleTabChange() {
        this.$nextTick(() => {
          this.$refs.pictureChart && this.$refs.pictureChart.resize();
          this.$refs.videoChart && this.$refs.videoChart.resize();
        })
      },
    async getData(){
      const pictureResponse = await feature.get('/compliance/image');
      const videoResponse = await feature.get('/compliance/video');
      const audioResponse =await feature.get('/compliance/audio')
      

      this.picturePieData=this.turnPieData(pictureResponse)
      this.videoPieData=this.turnPieData(videoResponse)
      this.audioPieData=this.turnPieData(audioResponse)
      // this.pieData.video.data=this.turnPieData(videoResponse)
      // this.pieData.audio.data=this.turnPieData(audioResponse)
      
      console.log(this.picturePieData)

      
    },
    turnPieData(response){
      const chartData=[{value: response.compliant, name: '合规' },
            {value: response.nonCompliant, name: '不合规'  }]

      return chartData

    }
   
    
  }

 
}
</script>

<style scoped>
 .inline-block {
    display: inline-block;
    margin-right:10px;
    margin-left:10px;
    }
  .svg-icon{
    width:30px;
    height:25px;
    margin-right:5px
  }
  
</style>
<style lang="css">
.dotClass {
  width:10px;
  height:10px;
  border-radius: 50%;
  display: block;
  margin-left: 10px;  
}
  .el-tooltip__popper{
    max-width:50%
    }

  .dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 80%;
}
</style>

