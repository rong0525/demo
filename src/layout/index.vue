<template>

  <div :class="classObj" class="app-wrapper">
    <navbar />
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" /> -->

    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <div v-if="needTagsView" class="custom-title">
          <span class="title-text">{{ pageTitle }}</span>
          <!-- <HeaderSearch /> -->
        </div>
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar

  },
  mixins: [ResizeMixin],
  data() {
    return {
      pageTitle: '态势感知大屏'
    }
  },
  watch: {
    // 监听路由变化
    $route: {
      immediate: true,
      handler(to) {
        this.updateTitle(to)
      }
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
        // mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    updateTitle(route) {
      this.pageTitle = route.meta.top || '默认标题'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .sidebar-container{
    margin-top: 50px;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .custom-title {
    color: #4560F7;
    font-family: Inter, Arial, sans-serif;
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 900;
    line-height: 150%;
    letter-spacing: -0.02rem;
    text-align: left;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #eff1f4; /* 与主页主程序框一致，可替换为变量 */
    padding-left: 2rem;

    .title-text {
      padding-top:50px ;
      flex: 1;
      /* 保证标题靠左，搜索框靠右 */
    }
    .header-search {
      margin-left: auto;
      /* 保证搜索框在最右侧 */
    }
  }
</style>
