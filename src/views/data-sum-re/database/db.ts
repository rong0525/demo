import axios from 'axios'

const url = 'http://10.21.147.42:8080/api/v2/tables'
const defaultToken = {
  'xc-token': 'WnJQ2xH9_TFUsjaeUI-sVHWKkDatX7ObFEp8hSVw'
}

// interface tableDataItem {
//   id: string;
//   data_category: string;
//   data_son_category: string;
//   data_assets: string;
//   sensitivity_level: number;
//   volume: number;
//   associated_domain_ip: string;
// }

export function testApi() {
  axios.get(url + '/mz7yry0iw0152yh/records?limit=1000', {
    headers: defaultToken
  }).then(response => {
    // console.log(response.data);
  })
}

// 获取 Category
async function getRawData() {
  let rawData
  await axios.get(url + '/m5qfjeg4e3d3ryw/records?limit=1000', {
    headers: defaultToken
  }).then(async response => {
    rawData = response.data.list
  }).catch(err => {
    console.error(err)
  })
  return rawData
}

// 获取 CategoryData
async function getCategoryData(categoryId) {
  let resData
  await axios.get(url + '/mgnq3de2a1neoip/records/' + categoryId, {
    headers: defaultToken
  }).then(response => {
    resData = response.data
  }).catch(err => {
    resData = {
      'associated_domain_ip': '',
      'volume': 0
    }
    console.log(err)
  })
  return resData
}

// 得到最终的 TableData 数据
export async function getTableData() {
  var rawData = await getRawData()
  const resultData = []
  // filter 函数内部没有调用 await，因此没法同步。直接添加 await 导致返回的对象是 Promise，永远返回 true
  for (const item of rawData) {
    var itemResult = await getCategoryData(item.id)
    item.associated_domain_ip = itemResult.associated_domain_ip
    item.volume = itemResult.volume
    if (item.volume > 0) {
      resultData.push(item)
    }
  }
  return resultData
}

export async function fetchDomainUniqueCount() {
  let result = []
  let count = 0
  await axios.get(url + '/mgorzh4l352voxy/records?limit=1000', {
    headers: defaultToken
  }).then(async response => {
    response.data.list.forEach((item) => {
      result.push(item.domain)
    })
    result = Array.from(new Set(result))
    console.log(result)
    count = result.length
  }).catch(err => {
    console.error(err)
  })
  return count
}

export async function fetchCrossBorderDomainCount() {
  let result = []
  let count = 0
  await axios.get(url + '/mfemcbrwc4tik3r/records?limit=1000', {
    headers: defaultToken
  }).then(async response => {
    response.data.list.forEach((item) => {
      if (item.countries !== '中国') {
        result.push(item.domain)
      }
    })
    result = Array.from(new Set(result))
    console.log(result)
    count = result.length
  }).catch(err => {
    console.error(err)
  })
  return count
}

export async function fetchFlowCount() {
  let inflowCount = 0
  let outflowCount = 0
  await axios.get(url + '/mfemcbrwc4tik3r/records?limit=1000', {
    headers: defaultToken
  }).then(async response => {
    response.data.list.forEach((item) => {
      if (item.countries !== 'China') {
        inflowCount += item.inflow
        outflowCount += item.outflow
      }
    })
  }).catch(err => {
    console.error(err)
  })
  return {
    inflowCount: inflowCount,
    outflowCount: outflowCount
  }
}

export async function fetchRuleCount() {
  let rules = []
  let allRuleCount = 0
  let activatedRuleCount = 0
  await axios.get(url + '/m2pw08ctw3f2ww9/records?limit=1000', {
    headers: defaultToken
  }).then(async response => {
    response.data.list.forEach((item) => {
      if (item.rule_status === 1) {
        activatedRuleCount++
      }
    })
    rules = response.data.list
    allRuleCount = response.data.list.length
  }).catch(err => {
    console.error(err)
  })
  return {
    rules: rules,
    allRuleCount: allRuleCount,
    activatedRuleCount: activatedRuleCount
  }
}
