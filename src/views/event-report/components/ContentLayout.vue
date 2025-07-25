<template>
  <div class="content-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentLayout'
}
</script>

<style scoped>
.content-layout {
    width: 100%;
    height: 100%;
    padding: 0.25rem;
    box-sizing: border-box;
    margin-bottom: 20px;
    
    display: inline-flex;
    padding: 0.8125rem 0rem 1.8125rem 1.0625rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.3125rem;
}
</style>