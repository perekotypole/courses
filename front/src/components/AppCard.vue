<template>
<div class="app-card">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'AppCard',
}
</script>

<style lang="less" scoped>
.app-card {
  background: var(--color-bg-light);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
}
</style>
