import axios from 'axios'

const url = 'http://10.21.147.42:8080/api/v2/tables'
const defaultToken = {
  'xc-token': 'WnJQ2xH9_TFUsjaeUI-sVHWKkDatX7ObFEp8hSVw'
}

// 获取所有不合规项
export async function fetchUncomplianceData() {
  let rawData = []
  await axios.get(url + '/mbu7yfobioius58/records', {
    headers: defaultToken
  }).then(async response => {
    rawData = response.data.list
  }).catch(err => {
    console.error(err)
  })
  return rawData
}

// 获取所有规则
export async function fetchRuleDocumentCount() {
  const rawData = []
  await axios.get(url + '/m2pw08ctw3f2ww9/records?limit=1000', {
    headers: defaultToken
  }).then(async response => {
    response.data.list.forEach((item) => {
      rawData.push(item.rule_document)
    })
  }).catch(err => {
    console.error(err)
  })
  return Array.from(new Set(rawData)).length
}
