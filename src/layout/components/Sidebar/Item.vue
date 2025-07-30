<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // 1. 优先判断是否为 PNG 图片（通过 .png 后缀识别）

      if (icon.endsWith('.png')) {
        const imgPath = require(`./image/${icon}`)
        console.log(`Rendering icon: ${imgPath}`)
        vnodes.push(
          <img
            src={imgPath} // 直接使用 icon 作为图片路径
            class='icon-png' // 自定义 PNG 样式类
            alt='icon' // 可选：添加 alt 文本
          />
        )

      // 2. 处理 element 内置图标（el-icon-xxx）
      } else if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)

      // 3. 处理 SVG 图标（默认逻辑）
      } else {
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
/* PNG 图片图标样式 */
.icon-png {
  width: 1em;  /* 与其他图标保持一致大小 */
  height: 1em;
  vertical-align: middle;  /* 与文字居中对齐 */
  margin-right: 12px;  /* 与标题保持间距 */
  object-fit: contain;  /* 保持图片比例，避免拉伸 */
  filter: grayscale(100%);
}
</style>
