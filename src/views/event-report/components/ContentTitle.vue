<template>
  <h2 class="content-title">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: 'ContentTitle'
}
</script>

<style scoped>
.content-title {
    font-size: 22px;
    color: #4560F7;
    margin: 0;
    padding: 0;
  
    display: flex;
    height: 6.0625rem;
    padding: 0.0625rem 9.1875rem 0rem 2rem;
    align-items: center;
}
</style>