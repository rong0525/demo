<template>
  <div class="main-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MainContent'
}
</script>

<style scoped>
.main-content {

    height: 950px;
    padding-right: 0.20rem;
    /* padding-bottom: 0.20rem; */
    flex-shrink: 0;
    background: #EEE;
    border-radius: 4px;
    width: 100%;
}
</style>
