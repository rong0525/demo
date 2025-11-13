import axios from 'axios'
import request from '@/utils/request'

// NocoDB 配置
const NOCODB_CONFIG = {
  BASE_URL: `${process.env.NOCODB_API_URI}/api/v2`,
  TABLE_ID: 'mbu7yfobioius58',
  API_TOKEN: 'WnJQ2xH9_TFUsjaeUI-sVHWKkDatX7ObFEp8hSVw'
}

// 创建专门用于 NocoDB 的 axios 实例
const nocodbApi = axios.create({
  baseURL: NOCODB_CONFIG.BASE_URL,
  timeout: 30000,
  headers: {
    'xc-token': NOCODB_CONFIG.API_TOKEN,
    'Content-Type': 'application/json'
  }
})

/**
 * 获取合规详情列表 - 直接获取整个表的数据
 * @param {Object} query - { page, limit, ruleSource }
 */
export function fetchHeguiList(query) {
  return nocodbApi.get(`/tables/${NOCODB_CONFIG.TABLE_ID}/records`, {
    params: {
      limit: 1000, // 获取大量数据
      sort: '-updated_at' // 按更新时间降序排序
    }
  }).then(response => {
    console.log('NocoDB 原始数据:', response.data)

    // 数据格式转换
    const mappedItems = (response.data.list || []).map(item => ({
      violationId: item.violation_id || item.Id,
      lawStandard: item.rule_document,
      violationTerm: item.rule_content,
      violationDesc: item.rule_description,
      dataAsset: item.rule_category,
      violatingEntity: item.violating_entity,
      time: item.ts,
      updatedAt: item.updated_at, // 从NocoDB的UpdatedAt字段获取
      sourceIp: item.id_orig_h,
      destIp: item.id_resp_h,
      violationContent: item.violation_content || '[查看详情]',
      originalTraffic: item.pcap_location || '[查看原始流量]',
      title: item.rule_document,
      category: item.category,
      uid: item.uid
    }))

    // 前端进行分页和过滤
    const { page = 1, limit = 10, ruleSource = '' } = query
    let filteredItems = mappedItems

    // 根据 ruleSource 过滤
    if (ruleSource && ruleSource !== 'all') {
      filteredItems = mappedItems.filter(item =>
        item.lawStandard && item.lawStandard.includes(ruleSource.replace(/[《》]/g, ''))
      )
    }

    // 前端分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const pageItems = filteredItems.slice(startIndex, endIndex)

    return {
      code: 20000,
      data: {
        items: pageItems,
        total: filteredItems.length
      }
    }
  }).catch(error => {
    console.error('NocoDB API Error:', error.response?.data || error.message)
    return {
      code: 50000,
      message: error.response?.data?.message || error.message || '获取数据失败',
      data: { items: [], total: 0 }
    }
  })
}

/**
 * 获取原始流量文件
 * @param {string} violationId
 */
export function fetchOriginalTraffic(violationId) {
  return Promise.resolve({
    code: 20000,
    data: {
      value: `#原始流量数据\n\n违规ID: ${violationId}\n时间戳: ${new Date().toISOString()}\n\n这里显示原始的网络流量数据...`
    }
  })
}

/**
 * 创建合规违规记录
 * @param {Object} data - 违规记录数据
 */
export function createHeguiRecord(data) {
  const mappedData = {
    violation_id: data.violationId,
    uid: data.uid,
    rule_document: data.lawStandard,
    rule_content: data.violationTerm,
    rule_description: data.violationDesc,
    rule_category: data.dataAsset,
    violating_entity: data.violatingEntity,
    ts: data.time,
    id_orig_h: data.sourceIp,
    id_resp_h: data.destIp,
    violation_content: data.violationContent,
    pcap_location: data.originalTraffic,
    category: data.category
  }

  return nocodbApi.post(`/tables/${NOCODB_CONFIG.TABLE_ID}/records`, mappedData)
    .then(response => {
      return {
        code: 20000,
        data: response.data,
        message: '创建成功'
      }
    }).catch(error => {
      console.error('Create Error:', error.response?.data || error.message)
      return {
        code: 50000,
        message: error.response?.data?.message || '创建失败'
      }
    })
}

/**
 * 更新合规违规记录
 * @param {Object} data - 包含 violationId 的更新数据
 */
export function updateHeguiRecord(data) {
  const { violationId, ...updateData } = data
  const mappedData = {
    Id: violationId,
    violation_id: updateData.violationId,
    uid: updateData.uid,
    rule_document: updateData.lawStandard,
    rule_content: updateData.violationTerm,
    rule_description: updateData.violationDesc,
    rule_category: updateData.dataAsset,
    violating_entity: updateData.violatingEntity,
    ts: updateData.time,
    id_orig_h: updateData.sourceIp,
    id_resp_h: updateData.destIp,
    violation_content: updateData.violationContent,
    pcap_location: updateData.originalTraffic,
    category: updateData.category
  }

  return nocodbApi.patch(`/tables/${NOCODB_CONFIG.TABLE_ID}/records`, mappedData)
    .then(response => {
      return {
        code: 20000,
        data: response.data,
        message: '更新成功'
      }
    }).catch(error => {
      console.error('Update Error:', error.response?.data || error.message)
      return {
        code: 50000,
        message: error.response?.data?.message || '更新失败'
      }
    })
}

/**
 * 删除合规违规记录
 * @param {string} id - 违规记录ID
 */
export function deleteHeguiRecord(id) {
  return nocodbApi.delete(`/tables/${NOCODB_CONFIG.TABLE_ID}/records`, {
    data: { Id: id }
  }).then(() => {
    return {
      code: 20000,
      message: '删除成功'
    }
  }).catch(error => {
    console.error('Delete Error:', error.response?.data || error.message)
    return {
      code: 50000,
      message: error.response?.data?.message || '删除失败'
    }
  })
}

/**
 * 下载违规内容
 * @param {string} fileUrl - 违规内容的文件链接
 */
export function downloadViolationContent(fileUrl) {
  return request({
    url: '/file/downloadAndSave',
    method: 'post',
    params: { fileUrl }
  }).then(response => {
    console.log('Download response:', response) // 添加日志
    if (response && response.code === 20000 && response.data?.fileName) {
      return response.data.fileName // 返回后端返回的 fileName
    } else {
      throw new Error(response?.message || 'Invalid response format')
    }
  }).catch(error => {
    console.error('Error in downloadViolationContent:', error) // 添加日志
    throw error // 抛出错误以便前端捕获
  })
}

/**
 * 获取违规内容
 * @param {string} fileUrl - 文件 URL
 */
export function getFile(fileName) {
  return request({
    url: '/file/getFile',
    method: 'get',
    params: { fileName }
  })
}

