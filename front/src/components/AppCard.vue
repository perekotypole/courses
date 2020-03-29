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
  box-shadow: 0 0 25px rgba(0, 14, 92, 0.041);
  padding: 20px 30px;
}
</style>
