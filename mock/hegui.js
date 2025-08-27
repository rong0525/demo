const originalTableData = [
    {
        'violationId': 'A001',
        'lawStandard': '《汽车数据安全管理若干规定》',
        'violationTerm': '第十一条：向境外提供重要数据需经安全评估。',
        'violationDesc': '向境外传输高精度地图众包数据。',
        'dataAsset': '高精度地图众包数据',
        'violatingEntity': 'https://www.google.com/search?q=dev.car-e.com',
        'time': '2025-08-18 10:30:15',
        'sourceIp': '10.10.1.5',
        'destIp': '15.2.3.4',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据安全管理若干规定》',
        'category': '法规条例'
    },
    {
        'violationId': 'B002',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第五条：数据出境安全。',
        'violationDesc': '向境外五家服务商传输用户行程轨迹，未进行安全评估和备案。',
        'dataAsset': '用户行程轨迹',
        'violatingEntity': 'https://www.google.com/search?q=drive.car-e.com',
        'time': '2025-08-18 11:25:40',
        'sourceIp': '10.10.1.10',
        'destIp': '123.45.67.89',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'C003',
        'lawStandard': '《汽车数据通用要求》',
        'violationTerm': '3.2.1：数据分类分级。',
        'violationDesc': '未对收集的个人生物识别特征数据进行分类分级。',
        'dataAsset': '驾驶员面部数据',
        'violatingEntity': 'https://www.google.com/search?q=secure.car-d.com',
        'time': '2025-08-18 13:05:22',
        'sourceIp': '10.10.1.15',
        'destIp': '22.33.44.55',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据通用要求》',
        'category': '标准规范'
    },
    {
        'violationId': 'E005',
        'lawStandard': '《智能网联汽车时空数据传感器安全基本要求》',
        'violationTerm': '4.1：数据采集。',
        'violationDesc': '车辆传感器在非授权情况下，持续采集周边重要地理区域的高精度影像。',
        'dataAsset': '重要机关周边测绘数据',
        'violatingEntity': 'https://www.google.com/search?q=research.car-e.com',
        'time': '2025-08-18 14:10:55',
        'sourceIp': '10.10.1.20',
        'destIp': '55.66.77.88',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《智能网联汽车时空数据传感器安全基本要求》',
        'category': '法规条例'
    },
    {
        'violationId': 'F006',
        'lawStandard': '《汽车数据安全管理若干规定》',
        'violationTerm': '第十条：个人信息处理。',
        'violationDesc': '违规收集并向车外单独支付账户信息。',
        'dataAsset': '车载支付账户信息',
        'violatingEntity': 'https://www.google.com/search?q=payment.car-b.com',
        'time': '2025-08-18 15:33:18',
        'sourceIp': '10.10.1.25',
        'destIp': '88.99.11.22',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据安全管理若干规定》',
        'category': '法规条例'
    },
    {
        'violationId': 'H008',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第七条：敏感个人信息处理。',
        'violationDesc': '未取得单独同意，向境外提供包含驾驶员面部识别特征的数据。',
        'dataAsset': '驾驶员面部数据',
        'violatingEntity': 'https://www.google.com/search?q=secure.car-d.com',
        'time': '2025-08-18 16:50:07',
        'sourceIp': '10.10.1.30',
        'destIp': '22.33.44.55',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'B003',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第五条：数据出境安全。',
        'violationDesc': '将中国境内超过10万台车辆的充电运行数据传输至境外。',
        'dataAsset': '充电运行状态数据',
        'violatingEntity': 'https://www.google.com/search?q=charging-analytics.com',
        'time': '2025-08-18 17:00:20',
        'sourceIp': '10.10.1.35',
        'destIp': '99.88.77.66',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'A002',
        'lawStandard': '《汽车数据安全管理若干规定》',
        'violationTerm': '第十条：个人信息处理。',
        'violationDesc': '未经脱敏的车牌信息和人脸信息被传输到云端。',
        'dataAsset': '真实人脸数据, 真实汽车号牌数据',
        'violatingEntity': 'https://www.google.com/search?q=stream.car-e.com',
        'time': '2025-08-18 17:15:30',
        'sourceIp': '10.10.1.40',
        'destIp': '10.20.30.40',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据安全管理若干规定》',
        'category': '法规条例'
    },
    {
        'violationId': 'F007',
        'lawStandard': '《汽车数据通用要求》',
        'violationTerm': '3.2.1：数据分类分级。',
        'violationDesc': '未对车辆诊断数据进行分类分级，并传输至境外。',
        'dataAsset': '车辆诊断数据',
        'violatingEntity': 'https://www.google.com/search?q=diagnostics.us.com',
        'time': '2025-08-18 18:01:05',
        'sourceIp': '10.10.1.45',
        'destIp': '11.22.33.44',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据通用要求》',
        'category': '标准规范'
    },
    {
        'violationId': 'D004',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第六条：数据安全保护措施。',
        'violationDesc': 'OTA升级服务绕过安全审核，从非授权服务器下载更新文件。',
        'dataAsset': 'OTA数据',
        'violatingEntity': 'unauthorized-ota.cdn',
        'time': '2025-08-18 18:30:45',
        'sourceIp': '10.10.1.50',
        'destIp': '77.88.99.00',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'B004',
        'lawStandard': '《个人信息保护法》',
        'violationTerm': '第三十七条：向境外提供个人信息。',
        'violationDesc': '未取得单独同意，向境外传输用户的指纹数据。',
        'dataAsset': '驾驶员生物特征数据',
        'violatingEntity': 'https://www.google.com/search?q=auth.car-f.com',
        'time': '2025-08-18 19:10:20',
        'sourceIp': '10.10.1.55',
        'destIp': '14.25.36.47',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《中华人民共和国个人信息保护法》',
        'category': '法规条例'
    },
    {
        'violationId': 'E006',
        'lawStandard': '《智能网联汽车时空数据传感器安全基本要求》',
        'violationTerm': '4.2：数据存储。',
        'violationDesc': '车辆点云数据在本地存储时未加密，存在泄露风险。',
        'dataAsset': '车辆点云数据',
        'violatingEntity': '10.10.1.60',
        'time': 'N/A',
        'sourceIp': 'N/A',
        'destIp': 'N/A',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《智能网联汽车时空数据传感器安全基本要求》',
        'category': '法规条例'
    },
    {
        'violationId': 'F008',
        'lawStandard': '《汽车数据通用要求》',
        'violationTerm': '3.2.1：数据分类分级。',
        'violationDesc': '研发团队在境外办公时，通过非安全渠道访问并下载包含国家重点研发项目的源代码。',
        'dataAsset': '核心算法源代码',
        'violatingEntity': 'https://www.google.com/search?q=dev-portal.corp-internal.com',
        'time': '2025-08-19 09:00:30',
        'sourceIp': '10.10.1.65',
        'destIp': '98.76.54.32',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据通用要求》',
        'category': '标准规范'
    },
    {
        'violationId': 'G009',
        'lawStandard': '《汽车数据安全管理若干规定》',
        'violationTerm': '第十三条：重要数据。',
        'violationDesc': '车联网平台将包含内网IP地址和网络拓扑信息的文件传输至境外。',
        'dataAsset': '车联网平台网络拓扑图',
        'violatingEntity': 'https://www.google.com/search?q=network-ops.com',
        'time': '2025-08-19 10:15:45',
        'sourceIp': '10.10.1.70',
        'destIp': '87.65.43.21',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据安全管理若干规定》',
        'category': '法规条例'
    },
    {
        'violationId': 'A003',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第十一条：向境外提供重要数据。',
        'violationDesc': '将车辆OTA升级服务与境内运行车辆数量达50万台以上的信息传输至境外。',
        'dataAsset': 'OTA数据、车辆识别码',
        'violatingEntity': 'https://www.google.com/search?q=update.car-h.com',
        'time': '2025-08-19 11:40:10',
        'sourceIp': '10.10.1.75',
        'destIp': '76.54.32.10',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'PII-003',
        'lawStandard': '《个人信息保护法》',
        'violationTerm': '第二十四条：自动化决策。',
        'violationDesc': '对驾驶员行为数据进行自动化分析，并在未告知的情况下用于推送广告。',
        'dataAsset': '驾驶员行为数据',
        'violatingEntity': 'https://www.google.com/search?q=ads.car-ad.com',
        'time': '2025-08-19 13:00:00',
        'sourceIp': '10.10.1.80',
        'destIp': '11.22.33.44',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《中华人民共和国个人信息保护法》',
        'category': '法规条例'
    },
    {
        'violationId': 'CDR-002',
        'lawStandard': '《汽车数据安全管理若干规定》',
        'violationTerm': '第十条：个人信息处理。',
        'violationDesc': '违规收集并向车外单独传输车辆钥匙数据。',
        'dataAsset': '车辆钥匙',
        'violatingEntity': 'https://www.google.com/search?q=key-sync.car-k.com',
        'time': '2025-08-19 14:20:55',
        'sourceIp': '10.10.1.85',
        'destIp': '55.66.77.88',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据安全管理若干规定》',
        'category': '法规条例'
    },
    {
        'violationId': 'SOUR-002',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第五条：数据出境安全。',
        'violationDesc': '研发文件（如BOM）中包含了受限制的物料清单。',
        'dataAsset': '物料清单（BOM）',
        'violatingEntity': 'https://www.google.com/search?q=bom-repo.car-l.com',
        'time': '2025-08-19 15:10:30',
        'sourceIp': '10.10.1.90',
        'destIp': '99.88.77.66',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'GEO-002',
        'lawStandard': '《智能网联汽车时空数据安全处理基本要求》',
        'violationTerm': '4.1：数据采集。',
        'violationDesc': '车辆持续采集的影像数据包含了敏感地区的影像。',
        'dataAsset': '敏感地区影像数据',
        'violatingEntity': 'https://www.google.com/search?q=sensor-data.car-m.com',
        'time': '2025-08-19 16:05:00',
        'sourceIp': '10.10.1.95',
        'destIp': '123.45.67.89',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《智能网联汽车时空数据安全处理基本要求》',
        'category': '法规条例'
    },
    {
        'violationId': 'NET-002',
        'lawStandard': '《汽车整车信息安全技术要求》',
        'violationTerm': '6.2：通信安全。',
        'violationDesc': '车辆通信模块使用弱加密算法，导致数据传输过程中存在被窃听的风险。',
        'dataAsset': '网联通信数据',
        'violatingEntity': '192.168.10.100',
        'time': 'N/A',
        'sourceIp': 'N/A',
        'destIp': 'N/A',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车整车信息安全技术要求》',
        'category': '标准规范'
    },
    {
        'violationId': 'SOUR-003',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第五条：数据出境安全。',
        'violationDesc': '研发团队在境外通过非安全渠道下载了设计方案和图纸。',
        'dataAsset': '研发设计文档',
        'violatingEntity': 'https://www.google.com/search?q=design-portal.car-n.com',
        'time': '2025-08-19 17:30:15',
        'sourceIp': '10.10.1.105',
        'destIp': '15.2.3.4',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'CDR-003',
        'lawStandard': '《汽车数据安全管理若干规定》',
        'violationTerm': '第十条：个人信息处理。',
        'violationDesc': '未经脱敏的虹膜编码被传输至云端。',
        'dataAsset': '驾驶员生物特征数据',
        'violatingEntity': 'https://www.google.com/search?q=stream.car-e.com',
        'time': '2025-08-19 18:00:00',
        'sourceIp': '10.10.1.110',
        'destIp': '10.20.30.40',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据安全管理若干规定》',
        'category': '法规条例'
    },
    {
        'violationId': 'TRAF-002',
        'lawStandard': '《智能网联汽车时空数据安全处理基本要求》',
        'violationTerm': '4.1：数据采集。',
        'violationDesc': '车辆在特定区域持续采集人员流量数据并传输至公网。',
        'dataAsset': '人员流量数据',
        'violatingEntity': 'data-collector.cn',
        'time': '2025-08-19 18:30:45',
        'sourceIp': '10.10.1.115',
        'destIp': '55.66.77.88',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《智能网联汽车时空数据安全处理基本要求》',
        'category': '法规条例'
    },
    {
        'violationId': 'OTA-002',
        'lawStandard': '《汽车数据出境安全指引》',
        'violationTerm': '第五条：数据出境安全。',
        'violationDesc': 'OTA服务将车辆的动力系统固件传输到境外的非授权服务器。',
        'dataAsset': 'OTA数据',
        'violatingEntity': 'unauthorized-ota.cdn',
        'time': '2025-08-19 19:15:20',
        'sourceIp': '10.10.1.120',
        'destIp': '77.88.99.00',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《汽车数据出境安全指引》',
        'category': '法规条例'
    },
    {
        'violationId': 'PII-004',
        'lawStandard': '《个人信息保护法》',
        'violationTerm': '第三十七条：向境外提供个人信息。',
        'violationDesc': '向境外传输用户生物特征数据，但未告知用户其境外接收方身份。',
        'dataAsset': '驾驶员生物特征数据',
        'violatingEntity': 'https://www.google.com/search?q=auth.car-f.com',
        'time': '2025-08-19 20:05:55',
        'sourceIp': '10.10.1.125',
        'destIp': '14.25.36.47',
        'violationContent': '[查看详情]',
        'originalTraffic': '[查看原始流量]',
        'title': '《中华人民共和国个人信息保护法》',
        'category': '法规条例'
    }
]

module.exports = [
  {
    url: '/api/hegui/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10, ruleSource } = config.query
      let list = originalTableData
      if (ruleSource) {
        list = list.filter(item => item.title.replace(/[《》]/g, '') === ruleSource.replace(/[《》]/g, ''))
      }
      const total = list.length
      const start = (page - 1) * limit
      const end = start + Number(limit)
      return {
        code: 20000,
        data: {
          total,
          items: list.slice(start, end)
        }
      }
    }
  },
  // 获取违规内容详情
  {
    url: '/api/hegui/violation-content',
    type: 'get',
    response: config => {
      const { violationId } = config.query
      // 简单模拟：根据 violationId 返回不同内容
      // 实际可根据 violationId 查找 originalTableData
      let content = {
        type: 'text',
        value: '暂无详情'
      }
      if (violationId === 'A001') {
        content = {
          type: 'image',
          value: 'https://n.sinaimg.cn/sinakd10121/744/w1500h844/20210218/17d1-kkciesr3434303.jpg'
        }
      } else if (violationId === 'B002') {
        content = {
          type: 'text',
          value: '该违规内容为文本详情示例。'
        }
      } else {
        // 默认图片
        content = {
          type: 'image',
          value: 'https://via.placeholder.com/600x300?text=违规内容'
        }
      }
      return {
        code: 20000,
        data: content
      }
    }
  },
  // 获取原始流量文件
  {
    url: '/api/hegui/original-traffic',
    type: 'get',
    response: config => {
      const { violationId } = config.query
      // 简单模拟：返回一个文件下载或访问链接
      let file = {
        type: 'link',
        value: 'https://example.com/traffic/' + violationId + '.pcap'
      }
      if (violationId === 'A001') {
        file = {
          type: 'link',
          value: 'https://www.rfc-editor.org/rfc/rfc2544.txt'
        }
      }
      return {
        code: 20000,
        data: file
      }
    }
  }
]

