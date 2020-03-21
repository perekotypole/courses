<template>
  <div class="modal-route">
    <app-card class="modal-content">
      <slot></slot>
    </app-card>
  </div>
</template>

<script>
import AppCard from './AppCard.vue'

export default {
  name: 'Home.vue',
  components: {
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.modal-route {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.397);

  .modal-content {
    width: 50%;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
