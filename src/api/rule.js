import request from '@/utils/request'

// 后端真实接口：GET http://10.21.147.42:8080/api/v2/table/m2pw08ctw3f2ww9/records
// 备注：分页和筛选参数在前端处理或按后端协议透传
export function fetchRuleList(query) {
  return request({
    url: '/api/v2/tables/m2pw08ctw3f2ww9/records',
    method: 'get',
    params: {
      limit: '100',
      where: '',
      offset: '0',
      viewId: 'vwx818i4nf1h421e'
    }
  })
}

// 以下保留占位，若后端无对应接口则不调用
export function updateRule(data) {
  return Promise.reject(new Error('未对接后端更新接口'))
}

export function deleteRule(id) {
  return Promise.reject(new Error('未对接后端删除接口'))
}

export function createRule(data) {
  return Promise.reject(new Error('未对接后端新增接口'))
}
