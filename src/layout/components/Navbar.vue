<template>
  <div class="navbar">
    <div class="left-info">
        

        <div class="logo" @click="toggleSideBar" style="cursor: pointer;">
          <img
            class="image-logo"
            alt="Image logo"
            src="https://c.animaapp.com/NexYLUTl/img/image-logo@2x.png"
          />
        </div>
        <div class="title">
          <div class="div">数据可信审计与安全合规平台（车企端）</div>
        </div>
      </div>

    <div class="current-time">
          <div class="text-wrapper">{{ currentTime }}</div>
        </div>
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" size="medium" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  data() {
    return {
      currentTime: ''
    }
  },
  mounted() {
  this.$store.commit('errorLog/ADD_ERROR_LOG', {
    err: { message: 'Test error', stack: 'test stack' },
    vm: { $vnode: { tag: '<App>' }},
    info: 'render',
    url: window.location.href
  })
},
  created() {
    this.updateTime()
    this.timer = setInterval(this.updateTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    updateTime() {
      const now = new Date()
      const yyyy = now.getFullYear()
      const mm = String(now.getMonth() + 1).padStart(2, '0')
      const dd = String(now.getDate()).padStart(2, '0')
      const hh = String(now.getHours()).padStart(2, '0')
      const min = String(now.getMinutes()).padStart(2, '0')
      const ss = String(now.getSeconds()).padStart(2, '0')
      let ampm = hh >= 12 ? 'PM' : 'AM'
      this.currentTime = `${yyyy}-${mm}-${dd} ${hh}:${min} ${ampm}`
      // this.currentTime = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .left-info {
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding-left: 24px;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .image-logo {
    height: 32px;
    width: auto;
    object-fit: contain;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    white-space: nowrap;
  }

  .div {
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
  }

  .current-time {
  float: left;
  height: 50px; /* 适配 navbar 高度 */
  line-height: 50px; /* 垂直居中 */
  margin-left: 80px; /* 你想要它从左边空多少就调这个 */
  }
  .text-wrapper {
  color: #828282;
  font-family: "Inter", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.24px;
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }




    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
