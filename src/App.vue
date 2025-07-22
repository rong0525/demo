<template>
  <div id="app">
      <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
  }
}
</script>

<style>
.el-select-dropdown.el-popper.detail_popper{
  z-index :10000 !imporant;
}
</style>
