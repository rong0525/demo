<template>
  <div class="main-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MainContent'
}
</script>

<style scoped>
.main-content {
    display: inline-flex;
    height: 1270px;
    padding-right: 0.25rem;
    padding-bottom: 0.25rem;
    flex-shrink: 0;
    background: #EEE;
    border-radius: 4px;
    width: 100%;
}
</style>