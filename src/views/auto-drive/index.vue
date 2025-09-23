<template>
  <div class="app-container auto-drive-page">
    <div class="page-header">
      <h2 class="page-title">自动驾驶模型安全漏洞</h2>
    </div>
    <el-card class="box-card" shadow="never">
      <div
        v-for="(sec, idx) in sections"
        :key="idx"
        class="section"
      >
        <div class="section-title">{{ sec.title }}</div>
        <div class="section-content">{{ sec.content }}</div>
        <el-divider v-if="idx < sections.length - 1" />
      </div>
    </el-card>
    <div class="building">正在建设中...</div>
  </div>
</template>

<script>
export default {
  name: 'AutoDriveSecurity',
  data() {
    return {
      sections: [
        {
          title: '（一）部分产品存在不当输出处理类漏洞且危害严重',
          content:
            '模型生成内容未经验证、过滤即被用于下游系统，导致恶意内容被直接执行或传递。此类漏洞通常是模型自身缺陷与传统安全问题的结合。例如，某大模型存在全回显SSRF漏洞，攻击者可直接接管大模型服务器，获取内网数据；某大模型可调用Python工具且权限管理存在漏洞，可导致系统崩溃、业务中断、服务器失陷等严重后果。'
        },
        {
          title: '（二）信息泄露类漏洞多发，存在较大安全隐患',
          content:
            '通过输入特定内容诱导模型输出个人身份信息（PII）、凭证等敏感数据，以及模型内部参数、安全规则等内部信息。例如，攻击者利用漏洞可获取某大模型配置文件及架构图，可实现任意用户账号接管，可控制日志云服务。'
        },
        {
          title: '（三）提示注入类漏洞普遍，是大模型最常见漏洞风险',
          content:
            '提示注入主要是通过构造特定输入内容，直接或间接操纵模型行为，诱导其绕过安全限制执行恶意操作。该类漏洞攻击门槛低、成功率高，攻击者无需懂代码和复杂的攻击技术，通过聊天就能发动攻击；且提示注入常作为实现其他类型漏洞攻击的“敲门砖”，被业界视为“头号威胁”。'
        },
        {
          title: '（四）部分大模型产品针对无限制消耗类攻击的防护措施有待加强',
          content:
            '无限制消耗主要指大模型应用在缺乏合理限制的情况下，可能按照攻击者要求进行过度推理，导致资源耗尽、服务中断甚至模型被窃取的安全隐患。例如，某大模型部分功能未对调用次数和速率进行限制，攻击者可利用批量创建会话方式占用系统资源，使其他用户无法使用。'
        },
        {
          title: '（五）传统安全漏洞依然普遍存在，危害不容忽视',
          content:
            '测试发现传统漏洞数量仍然可观，这表明AI系统虽复杂，但对外接口与服务本质仍遵循传统软件逻辑，因而传统漏洞依旧高发。例如，存在任意用户登录漏洞可控制管理员权限；任意文件读取漏洞可获取网站服务器控制权；SQL注入漏洞可对数据库进行增删改查等操作。'
        }
      ]
    }
  }
}
</script>

<style scoped>
.auto-drive-page {
  min-height: 100%;
}
.page-header {
  margin-bottom: 16px;
}
.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}
.box-card {
  border-radius: 6px;
  height: 600px;
  overflow-y: auto;
}
.section {
  padding: 8px 4px;
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 6px;
}
.section-content {
  font-size: 14px;
  line-height: 1.8;
  color: #606266;
}
.building {
  font-size: 30px;
  font-weight: 600;
  color: #303133;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
