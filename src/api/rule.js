import request from '@/utils/request'

export function fetchRuleList(query) {
  return request({
    url: '/api/rule/list',
    method: 'get',
    params: query
  })
}

export function updateRule(data) {
  return request({
    url: '/api/rule/update',
    method: 'post',
    data
  })
}

export function deleteRule(id) {
  return request({
    url: '/api/rule/delete',
    method: 'post',
    data: { id }
  })
}

export function createRule(data) {
  return request({
    url: '/api/rule/create',
    method: 'post',
    data
  })
}
