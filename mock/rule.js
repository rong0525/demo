const Mock = require('mockjs')

// 生成初始数据
const List = []
const count = 57
const projectMap = {
  A: '项目A',
  B: '项目B',
  C: '项目C'
}

const engines = ['数据出境控制引擎', '敏感地理位置识别引擎', '其他引擎']
const regulations = ['个人信息保护法', '消费者权益保护法', '汽车数据安全管理条例', '数据安全法']
const statuses = ['启用', '未发布']

const startTime = new Date('2024-01-01 00:00:00').getTime()
const endTime = new Date('2025-07-31 23:59:59').getTime()

for (let i = 0; i < count; i++) {
  const projectKey = Mock.mock({ 'array|1': ['A', 'B', 'C'] }).array
  const randomTimestamp = Mock.Random.integer(startTime, endTime)
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: '规则名称' + (i + 1),
    project: projectMap[projectKey],
    projectKey,
    engine: Mock.Random.pick(engines),
    regulation: Mock.Random.pick(regulations, Mock.Random.integer(1, 3)),
    status: Mock.Random.pick(statuses),
    creator: Mock.Random.cname(),
    createTime: new Date(randomTimestamp).toISOString().slice(0, 19).replace('T', ' '),
    content: Mock.Random.csentence(10, 20),
    desc: Mock.Random.csentence(8, 16)
  }))
}

// 增加网络安全、漏洞检测相关的典型规则
List.unshift(
  {
    id: 'sec-001',
    name: '向第三方保险公司传输驾驶行为数据前，必须获得用户单独同意',
    project: '项目A',
    projectKey: 'A',
    content: '检测输入参数中是否包含SQL注入特征关键字，如select、union、--等',
    desc: '防止黑客通过SQL注入获取数据库敏感信息',
    createTime: '2025-07-09 10:00:00',
    engine: '数据出境控制引擎',
    regulation: ['个人信息保护法', '消费者权益保护法'],
    status: '启用',
    creator: '王同学'
  },
  {
    id: 'sec-002',
    name: '涉及V2X通信的群体匿名化统计数据方可用于城市交通分析',
    project: '项目B',
    projectKey: 'B',
    content: '检测用户输入中是否包含<script>、onerror、javascript:等可疑内容',
    desc: '防止恶意脚本注入页面，危害用户安全',
    createTime: '2025-07-09 10:05:00',
    engine: '数据出境控制引擎',
    regulation: ['汽车数据安全管理条例'],
    status: '启用',
    creator: '张同学'
  },
  {
    id: 'sec-003',
    name: '禁止在军事管理区及周边500米范围内记录并上传街景影像',
    project: '项目C',
    projectKey: 'C',
    content: '检测系统中是否存在弱口令账户，如admin/123456、root/root等',
    desc: '防止弱口令被暴力破解，提升系统安全性',
    createTime: '2025-07-09 10:10:00',
    engine: '敏感地理位置识别引擎',
    regulation: ['数据安全法'],
    status: '未发布',
    creator: '王同学'
  }
)

module.exports = [
  // 获取统计数据
  {
    url: '/api/rule/stats',
    type: 'get',
    response: (req) => {
      const { startTime, endTime } = req.query
      console.log('Mock API 接收到时间参数:', { startTime, endTime })
      const enabledCount = List.filter(item => item.status === '启用').length
      const regulationCount = new Set(List.flatMap(item => Array.isArray(item.regulation) ? item.regulation : [item.regulation])).size
      const unpublishedCount = List.filter(item => item.status === '未发布').length
      const highFrequencyTriggerCount = Mock.Random.integer(0, 100)

      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      const monthlyNewCount = List.filter(item => {
        const createDate = new Date(item.createTime)
        return createDate.getMonth() === currentMonth && createDate.getFullYear() === currentYear
      }).length

      // 生成更完整的月度数据，包含最近2年的数据
      const monthlyData = {}
      List.forEach(item => {
        const createDate = new Date(item.createTime)
        const yearMonth = `${createDate.getFullYear()}-${('0' + (createDate.getMonth() + 1)).slice(-2)}`
        if (!monthlyData[yearMonth]) {
          monthlyData[yearMonth] = 0
        }
        monthlyData[yearMonth]++
      })

      // 为了演示效果，补充一些历史数据
      for (let i = 23; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const yearMonth = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`
        if (!monthlyData[yearMonth]) {
          monthlyData[yearMonth] = Mock.Random.integer(3, 25)
        }
      }

      const chartData = {
        months: [],
        counts: []
      }

      // 处理时间范围参数
      let startDate, endDate
      if (startTime && endTime) {
        try {
          startDate = new Date(startTime)
          endDate = new Date(endTime)
          console.log('解析时间范围:', { startDate, endDate })
        } catch (error) {
          console.log('时间范围参数解析失败，使用默认范围:', { startTime, endTime })
          startDate = null
          endDate = null
        }
      }

      // 如果没有有效的时间范围，使用默认的6个月范围
      if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        endDate = new Date()
        startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 5) // 6个月的数据
      }

      const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      while (currentDate <= endDate) {
        const yearMonth = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}`
        chartData.months.push(yearMonth)
        chartData.counts.push(monthlyData[yearMonth] || 0)
        currentDate.setMonth(currentDate.getMonth() + 1)
      }

      // 确保至少有一些数据显示
      if (chartData.months.length === 0) {
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const yearMonth = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`
          chartData.months.push(yearMonth)
          chartData.counts.push(monthlyData[yearMonth] || 0)
        }
      }

      console.log('返回的图表数据:', chartData)
      
      return {
        code: 20000,
        data: {
          total: List.length,
          enabled: enabledCount,
          monthlyNew: monthlyNewCount,
          regulations: regulationCount,
          unpublished: unpublishedCount,
          highFrequency: highFrequencyTriggerCount,
          chartData
        }
      }
    }
  },
  // 获取规则列表
  {
    url: '/api/rule/list',
    type: 'get',
    response: (req) => {
      const { project, keyword, status, regulation, engine, page = 1, limit = 10, sort, order } = req.query
      const mockList = List.filter(item => {
        let valid = true
        if (project && item.projectKey !== project) valid = false
        if (keyword && !item.name.includes(keyword) && !item.id.includes(keyword)) valid = false
        if (status && item.status !== status) valid = false
        if (engine && item.engine !== engine) valid = false
        if (regulation && !item.regulation.includes(regulation)) valid = false
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