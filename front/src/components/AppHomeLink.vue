<template>
<div @click="go" class="app-home-link">
  <div class="text" :class="[this.$router.currentRoute.name === this.link  ? 'text-title' : '']">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'AppHomeLink',
  methods: {
    go() {
      if (this.$router.currentRoute.name !== this.link) {
        this.$router.push({ name: this.link })
      }
    },
  },
  props: {
    link: {
      type: String,
      require: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-home-link {
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;

  &:hover {
    .text {
      color: black
    }
  }
}
</style>
