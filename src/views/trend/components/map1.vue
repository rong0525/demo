<template>
  <div class="hx" >
  <div class='main' ref="chart" >
  </div>
</div>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts'
// 引入地图
import  axios from "axios";
import resize from './mixins/resize';
import worldJson from './echarts-countries-pkg/world.json';



 // 假设这是原始的JSON数据数组，这里模拟一下包含多个类似元素的情况
 const originalData = [
            { "srcdata": "China", "dirdata": "Japan", "value": 20 },
            { "srcdata": "Spain", "dirdata": "South Korea", "value": 20 },
            { "srcdata": "Canada", "dirdata": "United States", "value": 20 },
            { "srcdata": "United States", "dirdata": "Canada", "value": 20 },
{ "srcdata": "France", "dirdata": "Germany", "value": 20 },
{ "srcdata": "Australia", "dirdata": "New Zealand", "value": 20 },
{ "srcdata": "Brazil", "dirdata": "Argentina", "value": 20 },
{ "srcdata": "Russia", "dirdata": "Ukraine", "value": 20 },
{ "srcdata": "India", "dirdata": "Pakistan", "value": 20 },
{ "srcdata": "South Africa", "dirdata": "Zimbabwe", "value": 20 },
{ "srcdata": "Italy", "dirdata": "Spain", "value": 20 },
{ "srcdata": "Mexico", "dirdata": "Costa Rica", "value": 20 },

{ "srcdata": "Vietnam", "dirdata": "Laos", "value": 20 },
{ "srcdata": "Cuba", "dirdata": "Dominican Republic", "value": 20 },
{ "srcdata": "Peru", "dirdata": "Chile", "value": 20 },
{ "srcdata": "Nigeria", "dirdata": "Ghana", "value": 20 },
{ "srcdata": "Bangladesh", "dirdata": "Sri Lanka", "value": 20 },
{ "srcdata": "Iran", "dirdata": "Iraq", "value": 20 },
            { "srcdata": "SomeCountry", "dirdata": "AnotherCountry", "value": 30 },
            // 可以有更多类似结构的数据元素
        ];
const doqordata=[{ "srcdata": "Sweden", "dirdata": "Norway", "value": 20 },
{ "srcdata": "Thailand", "dirdata": "Malaysia", "value": 20 },
{ "srcdata": "Indonesia", "dirdata": "Philippines", "value": 20 },
{ "srcdata": "Egypt", "dirdata": "Morocco", "value": 20 },
{ "srcdata": "Greece", "dirdata": "Turkey", "value": 20 },
{ "srcdata": "Saudi Arabia", "dirdata": "United Arab Emirates", "value": 20 },
{ "srcdata": "Israel", "dirdata": "Jordan", "value": 20 },
{ "srcdata": "Poland", "dirdata": "Hungary", "value": 20 },
{ "srcdata": "Ireland", "dirdata": "United Kingdom", "value": 20 },
{ "srcdata": "Belgium", "dirdata": "Netherlands", "value": 20 },
{ "srcdata": "Denmark", "dirdata": "Finland", "value": 20 },];

        // 中英文对照对象，用于转换国家名称
        const countryMap = {
          "CN":"中国",
          "AT": "奥地利",
          "FI": "芬兰",
          "DE": "德国",
          "VN": "越南",
          "NO": "挪威",
          "CA": "加拿大",
          "US": "美国",
          "Taiwan":"中国台湾",
          "CN Taiwan":"中国台湾",
          "CN Hong Kong":"中国香港",
          "Hong Kong":"中国香港",
          "China": "中国",
          "Japan": "日本",
          "United States": "美国",
          "United Kingdom": "英国",
          "France": "法国",
          "Germany": "德国",
          "Italy": "意大利",
          "Canada": "加拿大",
          "Australia": "澳大利亚",
          "Russia": "俄罗斯",
          "South Korea": "韩国",
          "Brazil": "巴西",
          "India": "印度",
          "Spain": "西班牙",
          "Mexico": "墨西哥",
          "Argentina": "阿根廷",
          "South Africa": "南非",
          "Sweden": "瑞典",
          "Switzerland": "瑞士",
          "Netherlands": "荷兰",
          "Belgium": "比利时",
          "Austria": "奥地利",
          "Norway": "挪威",
          "Denmark": "丹麦",
          "Finland": "芬兰",
          "Greece": "希腊",
          "Portugal": "葡萄牙",
          "Turkey": "土耳其",
          "Israel": "以色列",
          "Saudi Arabia": "沙特阿拉伯",
          "United Arab Emirates": "阿联酋",
          "Iran": "伊朗",
          "Iraq": "伊拉克",
          "Malaysia": "马来西亚",
          "Indonesia": "印度尼西亚",
          "Philippines": "菲律宾",
          "Singapore": "新加坡",
          "Thailand": "泰国",
          "Vietnam": "越南",
          "New Zealand": "新西兰",
          "Poland": "波兰",
          "Czech Republic": "捷克共和国",
          "Hungary": "匈牙利",
          "Romania": "罗马尼亚",
          "Ukraine": "乌克兰",
          "Egypt": "埃及",
          "Nigeria": "尼日利亚",
          "Kenya": "肯尼亚",
          "Morocco": "摩洛哥",
          "Algeria": "阿尔及利亚",
          "Ethiopia": "埃塞俄比亚",
          "Pakistan": "巴基斯坦",
          "Bangladesh": "孟加拉国",
          "Sri Lanka": "斯里兰卡",
          "Myanmar": "缅甸",
          "Cambodia": "柬埔寨",
          "Laos": "老挝",
          "North Korea": "朝鲜"
      };

        const convertedData = [];
        const doqconvertedData = [];

        originalData.forEach(item => {
            if (countryMap[item.srcdata] && countryMap[item.dirdata]) {
                convertedData.push([
                    { name: countryMap[item.srcdata] },
                    { name: countryMap[item.dirdata], value: item.value }
                ]);
            }
        });
        doqordata.forEach(item => {
            if (countryMap[item.srcdata] && countryMap[item.dirdata]) {
                doqconvertedData.push([
                    { name: countryMap[item.srcdata] },
                    { name: countryMap[item.dirdata], value: item.value }
                ]);
            }
        });


export default {
  components: {},
  data() {
  return {
    
    data:[],
    dohData:[],
    dotData:[],
    doqData:[],
    myChart: null,
    /*
      图中相关城市经纬度,根据你的需求添加数据
      关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
    */
    geoCoordMap: {
      '新加坡':[103.6501, 1.327],
      '中国台湾': [120.9605, 23.6978],
      '中国澳门': [113.549403, 22.192961],
      '中国香港': [114.171994, 22.281089],
      '南宁': [108.479, 23.1152],
      '广州': [113.5107, 23.2196],
      '重庆': [107.7539, 30.1904],
      
      '阿富汗': [67.709953, 33.93911],
	'安哥拉': [17.873887, -11.202692],
	'阿尔巴尼亚': [20.168331, 41.153332],
	'阿联酋': [53.847818, 23.424076],
	'阿根廷': [-63.61667199999999, -38.416097],
	'亚美尼亚': [45.038189, 40.069099],
	'法属南半球和南极领地': [69.348557, -49.280366],
	'澳大利亚': [133.775136, -25.274398],
	'奥地利': [14.550072, 47.516231],
	'阿塞拜疆': [47.576927, 40.143105],
	'布隆迪': [29.918886, -3.373056],
	'比利时': [4.469936, 50.503887],
	'贝宁': [2.315834, 9.30769],
	'布基纳法索': [-1.561593, 12.238333],
	'孟加拉国': [90.356331, 23.684994],
	'保加利亚': [25.48583, 42.733883],
	'巴哈马': [-77.39627999999999, 25.03428],
	'波斯尼亚和黑塞哥维那': [17.679076, 43.915886],
	'白俄罗斯': [27.953389, 53.709807],
	'伯利兹': [-88.49765, 17.189877],
	'百慕大': [-64.7505, 32.3078],
	'玻利维亚': [-63.58865299999999, -16.290154],
	'巴西': [-51.92528, -14.235004],
	'文莱': [114.727669, 4.535277],
	'不丹': [90.433601, 27.514162],
	'博茨瓦纳': [24.684866, -22.328474],
	'中非共和国': [20.939444, 6.611110999999999],
	'加拿大': [-106.346771, 56.130366],
	'瑞士': [8.227511999999999, 46.818188],
	'智利': [-71.542969, -35.675147],
	'中国': [104.195397, 35.86166],
	'象牙海岸': [-5.547079999999999, 7.539988999999999],
	'喀麦隆': [12.354722, 7.369721999999999],
	'刚果民主共和国': [21.758664, -4.038333],
	'刚果共和国': [15.827659, -0.228021],
	'哥伦比亚': [-74.297333, 4.570868],
	'哥斯达黎加': [-83.753428, 9.748916999999999],
	'古巴': [-77.781167, 21.521757],
	'北塞浦路斯': [33.429859, 35.126413],
	'塞浦路斯': [33.429859, 35.126413],
	'捷克共和国': [15.472962, 49.81749199999999],
	'德国': [10.451526, 51.165691],
	'吉布提': [42.590275, 11.825138],
	'丹麦': [9.501785, 56.26392],
	'多明尼加共和国': [-70.162651, 18.735693],
	'阿尔及利亚': [1.659626, 28.033886],
	'厄瓜多尔': [-78.18340599999999, -1.831239],
	'埃及': [30.802498, 26.820553],
	'厄立特里亚': [39.782334, 15.179384],
	'西班牙': [-3.74922, 40.46366700000001],
	'爱沙尼亚': [25.013607, 58.595272],
	'埃塞俄比亚': [40.489673, 9.145000000000001],
	'芬兰': [25.748151, 61.92410999999999],
	'斐': [178.065032, -17.713371],
	'福克兰群岛': [-59.523613, -51.796253],
	'法国': [2.213749, 46.227638],
	'加蓬': [11.609444, -0.803689],
	'英国': [-3.435973, 55.378051],
	'格鲁吉亚': [-82.9000751, 32.1656221],
	'加纳': [-1.023194, 7.946527],
	'几内亚': [-9.696645, 9.945587],
	'冈比亚': [-15.310139, 13.443182],
	'几内亚比绍': [-15.180413, 11.803749],
	'赤道几内亚': [10.267895, 1.650801],
	'希腊': [21.824312, 39.074208],
	'格陵兰': [-42.604303, 71.706936],
	'危地马拉': [-90.23075899999999, 15.783471],
	'法属圭亚那': [-53.125782, 3.933889],
	'圭亚那': [-58.93018, 4.860416],
	'洪都拉斯': [-86.241905, 15.199999],
	'克罗地亚': [15.2, 45.1],
	'海地': [-72.285215, 18.971187],
	'匈牙利': [19.503304, 47.162494],
	'印尼': [113.921327, -0.789275],
	'爱尔兰': [-8.24389, 53.41291],
	'伊朗': [53.688046, 32.427908],
	'伊拉克': [43.679291, 33.223191],
	'冰岛': [-19.020835, 64.963051],
	'以色列': [34.851612, 31.046051],
	'意大利': [12.56738, 41.87194],
	'牙买加': [-77.297508, 18.109581],
	'约旦': [36.238414, 30.585164],
	'日本': [138.252924, 36.204824],
	'哈萨克斯坦': [66.923684, 48.019573],
	'肯尼亚': [37.906193, -0.023559],
	'吉尔吉斯斯坦': [74.766098, 41.20438],
	'柬埔寨': [104.990963, 12.565679],
	'韩国': [127.766922, 35.907757],
	'科索沃': [20.902977, 42.6026359],
	'科威特': [47.481766, 29.31166],
	'老挝': [102.495496, 19.85627],
	'黎巴嫩': [35.862285, 33.854721],
	'利比里亚': [-9.429499000000002, 6.428055],
	'利比亚': [17.228331, 26.3351],
	'斯里兰卡': [80.77179699999999, 7.873053999999999],
	'莱索托': [28.233608, -29.609988],
	'立陶宛': [23.881275, 55.169438],
	'卢森堡': [6.129582999999999, 49.815273],
	'拉脱维亚': [24.603189, 56.879635],
	'摩洛哥': [-7.092619999999999, 31.791702],
	'摩尔多瓦': [28.369885, 47.411631],
	'马达加斯加': [46.869107, -18.766947],
	'墨西哥': [-102.552784, 23.634501],
	'马其顿': [21.745275, 41.608635],
	'马里': [-3.996166, 17.570692],
	'缅甸': [95.956223, 21.913965],
	'黑山': [19.37439, 42.708678],
	'蒙古': [103.846656, 46.862496],
	'莫桑比克': [35.529562, -18.665695],
	'毛里塔尼亚': [-10.940835, 21.00789],
	'马拉维': [34.301525, -13.254308],
	'马来西亚': [101.975766, 4.210484],
	'纳米比亚': [18.49041, -22.95764],
	'新喀里多尼亚': [165.618042, -20.904305],
	'尼日尔': [8.081666, 17.607789],
	'尼日利亚': [8.675277, 9.081999],
	'尼加拉瓜': [-85.207229, 12.865416],
	'荷兰': [5.291265999999999, 52.132633],
	'挪威': [8.468945999999999, 60.47202399999999],
	'尼泊尔': [84.12400799999999, 28.394857],
	'新西兰': [174.885971, -40.900557],
	'阿曼': [55.923255, 21.512583],
	'巴基斯坦': [69.34511599999999, 30.375321],
	'巴拿马': [-80.782127, 8.537981],
	'秘鲁': [-75.015152, -9.189967],
	'菲律宾': [121.774017, 12.879721],
	'巴布亚新几内亚': [143.95555, -6.314992999999999],
	'波兰': [19.145136, 51.919438],
	'波多黎各': [-66.590149, 18.220833],
	'北朝鲜': [127.510093, 40.339852],
	'葡萄牙': [-8.224454, 39.39987199999999],
	'巴拉圭': [-58.443832, -23.442503],
	'卡塔尔': [51.183884, 25.354826],
	'罗马尼亚': [24.96676, 45.943161],
	'俄罗斯': [105.318756, 61.52401],
	'卢旺达': [29.873888, -1.940278],
	'西撒哈拉': [-12.885834, 24.215527],
	'沙特阿拉伯': [45.079162, 23.885942],
	'苏丹': [30.217636, 12.862807],
	'南苏丹': [31.3069788, 6.876991899999999],
	'塞内加尔': [-14.452362, 14.497401],
	'所罗门群岛': [160.156194, -9.64571],
	'塞拉利昂': [-11.779889, 8.460555],
	'萨尔瓦多': [-88.89653, 13.794185],
	'索马里兰': [46.8252838, 9.411743399999999],
	'索马里': [46.199616, 5.152149],
	'塞尔维亚共和国': [21.005859, 44.016521],
	'苏里南': [-56.027783, 3.919305],
	'斯洛伐克': [19.699024, 48.669026],
	'斯洛文尼亚': [14.995463, 46.151241],
	'瑞典': [18.643501, 60.12816100000001],
	'斯威士兰': [31.465866, -26.522503],
	'叙利亚': [38.996815, 34.80207499999999],
	'乍得': [18.732207, 15.454166],
	'多哥': [0.824782, 8.619543],
	'泰国': [100.992541, 15.870032],
	'塔吉克斯坦': [71.276093, 38.861034],
	'土库曼斯坦': [59.556278, 38.969719],
	'东帝汶': [125.727539, -8.874217],
	'特里尼达和多巴哥': [-61.222503, 10.691803],
	'突尼斯': [9.537499, 33.886917],
	'土耳其': [35.243322, 38.963745],
	'坦桑尼亚联合共和国': [34.888822, -6.369028],
	'乌干达': [32.290275, 1.373333],
	'乌克兰': [31.16558, 48.379433],
	'乌拉圭': [-55.765835, -32.522779],
	'美国': [-95.712891, 37.09024],
	'乌兹别克斯坦': [64.585262, 41.377491],
	'委内瑞拉': [-66.58973, 6.42375],
	'越南': [108.277199, 14.058324],
	'瓦努阿图': [166.959158, -15.376706],
	'西岸': [35.3027226, 31.9465703],
	'也门': [48.516388, 15.552727],
	'南非': [22.937506, -30.559482],
	'赞比亚': [27.849332, -13.133897],
    '津巴布韦': [29.154857, -19.015438],
	'科摩罗':[43.872219,-11.875001],
	'印度尼西亚':[106.515414,-6.103040],
	'印度': [78.96288, 20.593684],



      
      '鄂尔多斯': [108.9734, 39.2487],
      
    },
    /* 
记录下起点城市和终点城市的名称，以及权重
数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
*/

    // 重庆
    
    CQData: [
      [{ name: '重庆' }, { name: "鄂尔多斯", value: 30 }],
      [{ name: '重庆' }, { name: "德国", value: 90 }],
      [{ name: '重庆' }, { name: "英国", value: 30 }],
      [{ name: '重庆' }, { name: "韩国", value: 30 }]
    ],

    // 广州
   
    // 小飞机的图标，可以用其他图形替换
    planePath:'image://images/forword.png',
    // planePath: 'image://2.png',
    // planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    option: {
      title: {
        text: '地图',
        textStyle: {
          color: '#008acd',
          fontSize: 40
        },
        top: '10px',
        left: '10px',
        
        textAlign: 'left'
      },
      legend: {
        // orient: 'vertical',
        top: 'bottom',
        left: 'right',
        
        selectedMode: 'single'
      },

      geo: {
        zoom: 1, //初始化放大比例
        // center: ['50%', '50%'], //中心点
        map: '',       // 与注册地图名字一致
        roam: true,        // 禁止缩放平移
        itemStyle: {        // 每个区域的样式 

          show: true,
          areaColor: "#142957",
          borderColor: "#195BB9",
          borderWidth: 1,

          emphasis: {
            areaColor: '#f0f',

          }
        },
        label: {
          //显示名称
          // show: true,
          textStyle: { color: "#c71585" },
          emphasis: {//鼠标移入显示地名
            show: true,
            textStyle: { color: "#000" }
          }

        },

      },

      series: [],   // 将之前处理的数据放到这里



      tooltip: {
        trigger: "item",
        formatter: function (params, ticket, callback) {
          // console.log(params);
          if (params.seriesType == "effectScatter") {
            return  params.data.name + "迁移总数量:" + params.data.value[2];
          } else if (params.seriesType == "lines") {
            return (
              params.data.fromName +
              "迁移到" +
              params.data.toName +
              "<br />" +
              params.data.value
            );
          } else {
            return params.name;
          }
        }
      },

    }
  }
},
created() {
    // 在组件创建时获取数据
    this.fetchData();
  },

mounted() {
    this.init();
    window.addEventListener("resize", this.resize);
  },

beforeDestroy() {
  console.log("销毁了")
    window.removeEventListener("resize", this.resize);
  },

methods: {


  async fetchData() {
      
        // 假设你的 API 地址是 '/api/data'
        const response = await axios.get('http://localhost:9292/getDohMobility');
        const dotresponse = await axios.get('http://localhost:9292/getDotMobility');
        const doqresponse = await axios.get('http://localhost:9292/getDoqMobility');
        // console.log(response);
        
        

        // 处理数据，转换为 TDData 格式
        
        this.dohData=this.transformToTDData(response.data);
        this.doqData=this.transformToTDData(doqresponse.data);
        this.dotData=this.transformToTDData(dotresponse.data);
        
        
        // console.log(this.dohData);
        

        this.setOption();

     
    },

    // 转换数据格式为 特定的Data类型
    transformToTDData(data) {
      const countMap = new Map();

      // 统计每个国家与城市配对的出现次数
      data.forEach(item => {
        const key = `${item.country}-${item.co}`; // 使用 "country" 和 "co" 作为唯一标识符
        countMap.set(key, (countMap.get(key) || 0) + 1);
      });

      // 转换为所需格式：[[{ name: '国家' }, { name: '城市', value: count }]]
      const CQData = Array.from(countMap.entries()).map(([key, count]) => {
        const [country, co] = key.split('-');
        return [
          { name: country },  // 国家名称
          { name: co, value: count },  // 城市名称和出现次数
        ];
      });

      return this.turnData(CQData);
    },
 


// 获取地图中起点和终点的坐标，以数组形式保存下来
convertData(data) {   
  // console.log(data);
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = this.geoCoordMap[dataItem[1].name];
    var toCoord = this.geoCoordMap[dataItem[0].name];

    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[1].name,
        toName: dataItem[0].name,
        coords: [fromCoord, toCoord],
        value: dataItem[1].value
      })

    }
  }
  return res;
},

turnData(originalData){
  const convertedData=[];
  originalData.forEach(item => {
            if (countryMap[item[0].name] && countryMap[item[1].name]) {
              if(item[1].value>100){
                const num = item[1].value;
                const tens = Math.floor(num / 10) % 10;
                const units = num % 10;
                item[1].value = tens * 10 + units;
                
              }
                convertedData.push([
                    { name: countryMap[item[1].name] },
                    { name: countryMap[item[0].name], value: item[1].value }
                ]);
            }
        });
  return convertedData;

},


setOption(){
  var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
  var series = [];
  // console.log(this.dohData);
  

  /*
    图中一共用到三种效果，分别为航线特效图、飞机航线图以及城市图标涟漪图。
    要用到setOption中的series属性，并且对每个城市都要进行三次设置。
  */
  [['DOH', this.dohData],['DOQ',this.doqData],['DOT',this.dotData]].forEach((item, i) => {
    series.push(
      
      {
      // 白色航线特效图
      name: item[0] ,
      type: 'lines',
      zlevel: 10,                    // 用于分层，z-index的效果
      effect: {
        show: true,               // 动效是否显示
        period: 6,                // 特效动画时间
        trailLength: 0.7,         // 特效尾迹的长度
        color: 'red',            // 特效颜色 飞机航线
        symbolSize: 3,       // 特效大小
      },
      lineStyle: {
        // 正常情况下的线条样式
        color: color[i],
        width: 0,             // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
        curveness: .2       // 线条曲度

      },
      data: this.convertData(item[1])    // 特效的起始、终点位置
    }, {  // 小飞机航线效果
      name: item[0] ,
      type: 'lines',
      zlevel: 2,
      symbol: ['none', 'arrow'],   // 用于设置箭头
      symbolSize: 10,//箭头大小
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: this.planePath,         // 特效形状，可以用其他svg pathdata路径代替
        symbolSize: 15
      },
      lineStyle: {
        color: color[i],
        width: 1,
        opacity: 0.6,
        curveness: 0.2

      },
      data: this.convertData(item[1])     // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
    }, { // 散点效果
      name: item[0],
      type: 'effectScatter',
      coordinateSystem: 'geo',       // 表示使用的坐标系为地理坐标系
      zlevel: 3,
      effect: {
        show: true,
        
      },
      rippleEffect: {
        brushType: 'stroke'        // 波纹绘制效果
      },
      label: {
        // 默认的文本标签显示样式
        show: true,
        position: 'left',      // 标签显示的位置
        formatter: '{b}'       // 标签内容格式器

      },
      symbolSize: 3,
      // function (val) {
      //   return val[2] / 8;
      // },
      itemStyle: {

        color: color[i],

        emphasis: {
          areaColor: "#2B91B7"
        }
      },
      data: item[1].map((dataItem) => {
        return {
          name: dataItem[1].name,
          value: this.geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
        };
      })
    },{
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 4,
    effect: {
        show: true,
        
      },
    rippleEffect: {
      brushType: 'stroke'
    },
    label: {

      show: true,
      position: 'left',
      formatter: '{b}'

    },
    symbolSize: 3,
    // function (val) {
    //   return val[2] / 8;
    // },
    
    itemStyle: {

      color: color[i],
      emphasis: {
          areaColor: "#2B91B7"
        }

    },
    data:item[1].map((dataItem) => {
        return {
          name: dataItem[0].name,
          value: this.geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
        };
      })
     
  },
  );
  });
     
  this.option.series = series
  // 最后初始化世界地图中的相关数据
  this.myChart.setOption(this.option);


},


init() {
  // this.fetchData();
  // console.log(this.dohData)
 





  this.myChart = echarts.init(this.$refs.chart)
  echarts.registerMap('world', worldJson)
  this.option.geo.map = 'world';
  this.option.geo.zoom='1.5';
  this.option.title={
        text: '迁移趋势图', // 设置标题的文本内容
        left: 'left', // 标题相对于图表容器的水平位置，可以是'left'（居左）、'center'（居中）、'right'（居右），也可以使用具体像素值或百分比来精确指定位置
        top: 'top', // 标题相对于图表容器的垂直位置，类似水平位置有多种设置方式，如'top'（顶部）、'middle'（中间）、'bottom'（底部）等
        rotate: -90,
        textStyle: {
            fontSize: 33, // 标题文字的字体大小，单位为像素
            fontWeight: 'bold', // 标题文字的字体粗细，可以是'normal'（正常）、'bold'（加粗）等常见值
            color: '#008acd', // 标题文字的颜色，支持颜色名称、十六进制值等表示方式，如'red'、'#000000'
            // 还可以配置更多文字样式相关属性，如字体样式（fontStyle）为'italic'（斜体）等
        },

  };



  // var color = ['#9ae5fc', '#dcbf71'];	// 自定义图中要用到的颜色
  var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
  var series = [];						// 用来存储地图数据

  
  
  // 最后初始化世界地图中的相关数据
  this.myChart.setOption(this.option);
 


},
resize() {
  this.myChart.resize();
}
},

};


</script>
<style>
.hx {
width: 100%;
height: 100%;
/* background: url('../../assets/bg.jpg') no-repeat; */
}

.main {
width: 100%;
height: 100%;
background-color: rgba(255, 255, 255, 0.05);
}
</style>

