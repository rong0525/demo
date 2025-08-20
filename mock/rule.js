const Mock = require('mockjs')

// 生成初始数据
const List = []
const count = 200

const ruleSources = ['汽车数据出境安全指引', '汽车数据安全管理若干规定']
const ruleTypes = ['文本关键词', '文本关键词/数据特征分析', '文本关键词/图像特征/点云数据分析', '图像特征识别']
const statuses = ['启用', '未发布']

const startTime = new Date('2024-01-01 00:00:00').getTime()
const endTime = new Date('2025-07-31 23:59:59').getTime()

// 增加图片中的典型规则数据
List.unshift(
  {
    id: 'sec-001',
    sequence: 1,
    ruleId: '1-1-00-1',
    ruleSource: '汽车数据出境安全指引',
    ruleDescription: '是否包含国家重大专项,重点研发相关内容',
    ruleType: '文本关键词',
    dataAssetName: '研发测试数据',
    status: '启用',
    createTime: '2025-07-09 10:00:00'
  },
  {
    id: 'sec-002',
    sequence: 2,
    ruleId: '1-1-00-3',
    ruleSource: '汽车数据出境安全指引',
    ruleDescription: '是否军事管理区、国防科工单位以及县级以上党政机关,涉密、敏感地理信息数据,真实车辆流量、人员流量、物流等反映地级及以上行政区经济运行情况,公共安全行政执法活动相关内容',
    ruleType: '文本关键词/数据特征分析',
    dataAssetName: '高精度地图数据/城市车辆流量',
    status: '启用',
    createTime: '2025-07-09 10:05:00'
  },
  {
    id: 'sec-003',
    sequence: 3,
    ruleId: '1-1-5-21',
    ruleSource: '汽车数据出境安全指引',
    ruleDescription: '针对车联网平台的网络拓扑图文件(包含网络边界出口设备信息、网络区域划分以及内网IP地址),判断其是否符合以下任意一项条件:该平台涉及的服务境内车辆数量达到100万台以上;同时满足提供在线升级服务,境内运行车辆数量达50万台以上,升级内容涉及汽车动力系统、底盘系统、安全驾驶功能中的一种或多种',
    ruleType: '文本关键词/数据特征分析',
    dataAssetName: '车联网平台网络拓扑图/OTA升级数据',
    status: '启用',
    createTime: '2025-07-09 10:10:00'
  },
  {
    "id": "sec-004",
    "sequence": 4,
    "ruleId": "1-1-1-5",
    "ruleSource": "汽车数据出境安全指引",
    "ruleDescription": "对军事管理区、国防科工单位以及县级以上党政机关,涉密、敏感地理信息数据,真实车辆流量、人员流量、物流等反映地级及以上行政区经济运行情况,公共安全行政执法活动,真实人脸,真实汽车号牌,车辆收集的相关点云数据进行检测和统计。",
    "ruleType": "文本关键词/图像特征/点云数据分析",
    "dataAssetName": "涉密地理数据/车辆流量数据/真实人脸数据/真实汽车号牌数据/车辆点云数据",
    "status": "启用",
    "createTime": "2025-07-09 10:15:00"
  },
  {
    "id": "sec-005",
    "sequence": 5,
    "ruleId": "1-1-5-23",
    "ruleSource": "汽车数据出境安全指引",
    "ruleDescription": "针对车辆充电状态监测数据(包括车辆充电功率、充电电流、充电电压、当前电池温度、电池健康状态),判断境内数据数量是否超过10万台",
    "ruleType": "文本关键词/数据特征分析",
    "dataAssetName": "充电运行状态数据",
    "status": "启用",
    "createTime": "2025-07-09 10:20:00"
  },
  {
    "id": "sec-006",
    "sequence": 6,
    "ruleId": "2-1-1-5",
    "ruleSource": "汽车数据安全管理若干规定",
    "ruleDescription": "检测是否包含未脱敏的指纹或虹膜编码",
    "ruleType": "文本关键词",
    "dataAssetName": "驾驶员生物特征数据",
    "status": "启用",
    "createTime": "2025-07-09 10:25:00"
  },
  {
    "id": "sec-007",
    "sequence": 7,
    "ruleId": "2-1-1-1",
    "ruleSource": "汽车数据安全管理若干规定",
    "ruleDescription": "检测是否包含未脱敏的GPS坐标或时间戳且位置数据精度是否超过允许范围(如10米)",
    "ruleType": "数据特征分析",
    "dataAssetName": "用户行程轨迹数据",
    "status": "启用",
    "createTime": "2025-07-09 10:30:00"
  },
  {
    "id": "sec-008",
    "sequence": 8,
    "ruleId": "2-1-1-4",
    "ruleSource": "汽车数据安全管理若干规定",
    "ruleDescription": "检测是否保留车牌信息",
    "ruleType": "图像特征识别",
    "dataAssetName": "车牌信息",
    "status": "启用",
    "createTime": "2025-07-09 10:35:00"
  }
)

// 生成后续数据，确保序号连续性
for (let i = 0; i < count; i++) {
  const randomTimestamp = Mock.Random.integer(startTime, endTime)
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    sequence: i + 9, // 从9开始，确保序号连续
    ruleId: Mock.mock('@string("number", 1, 1)-@string("number", 1, 1)-@string("number", 1, 1)-@string("number", 1, 1)'),
    ruleSource: Mock.Random.pick(ruleSources),
    ruleDescription: '规则描述' + (i + 9),
    ruleType: Mock.Random.pick(ruleTypes),
    dataAssetName: '数据资产' + (i + 9),
    status: Mock.Random.pick(statuses),
    createTime: new Date(randomTimestamp).toISOString().slice(0, 19).replace('T', ' ')
  }))
}

module.exports = [
  // 获取规则列表
  {
    url: '/api/rule/list',
    type: 'get',
    response: (req) => {
      const { ruleSource, keyword, status, ruleType, page = 1, limit = 10, sort, order } = req.query
      const mockList = List.filter(item => {
        let valid = true
        if (ruleSource && item.ruleSource !== ruleSource) valid = false
        if (keyword && !item.ruleId.includes(keyword) && !item.ruleDescription.includes(keyword) && !item.dataAssetName.includes(keyword)) valid = false
        if (status && item.status !== status) valid = false
        if (ruleType && item.ruleType !== ruleType) valid = false
        return valid
      })

      if (sort) {
        mockList.sort((a, b) => {
          const valA = a[sort]
          const valB = b[sort]
          if (order === 'asc') {
            return valA > valB ? 1 : -1
          } else {
            return valA < valB ? 1 : -1
          }
        })
      }

      const pageList = mockList.slice((page - 1) * limit, page * limit)
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  // 新增规则
  {
    url: '/api/rule/create',
    type: 'post',
    response: (req) => {
      const data = req.body
      data.id = Mock.Random.guid()
      data.createTime = Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
      List.unshift(data)
      return { code: 20000, data: 'success' }
    }
  },
  // 编辑规则
  {
    url: '/api/rule/update',
    type: 'post',
    response: (req) => {
      const data = req.body
      const idx = List.findIndex(item => item.id === data.id)
      if (idx > -1) {
        List[idx] = { ...List[idx], ...data }
        return { code: 20000, data: 'success' }
      }
      return { code: 50008, message: '未找到记录' }
    }
  },
  // 删除规则
  {
    url: '/api/rule/delete',
    type: 'post',
    response: (req) => {
      const { id } = req.body
      const idx = List.findIndex(item => item.id === id)
      if (idx > -1) {
        List.splice(idx, 1)
        return { code: 20000, data: 'success' }
      }
      return { code: 50008, message: '未找到记录' }
    }
  }
]