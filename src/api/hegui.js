import request from '@/utils/request'

/**
 * 获取合规详情列表
 * @param {Object} query - { page, limit, ruleSource }
 */
export function fetchHeguiList(query) {
  return request({
    url: '/api/hegui/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取违规内容详情（如图片或文本链接）
 * @param {string} violationId
 */
export function fetchViolationContent(violationId) {
  return request({
    url: '/api/hegui/violation-content',
    method: 'get',
    params: { violationId }
  })
}

/**
 * 获取原始流量文件（如文件下载或访问链接）
 * @param {string} violationId
 */
export function fetchOriginalTraffic(violationId) {
  return request({
    url: '/api/hegui/original-traffic',
    method: 'get',
    params: { violationId }
  })
}

// 如有新增、编辑、删除接口，可按需添加
