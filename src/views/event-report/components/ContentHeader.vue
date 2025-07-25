<template>
  <div class="content-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentHeader'
}
</script>

<style scoped>
.content-header {

    display: inline-flex;
    padding: 0rem 21.9375rem 0rem 1.875rem;
    align-items: center;
}
</style>