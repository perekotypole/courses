<template>
  <div id="success">
    <h1>Помилка</h1>
    <div class="close">
      <router-link :to="this.$router.currentRoute.matched[0].path">
        <button>OK</button>
      </router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .close{
    text-align: right;

    .fa-lg{
      margin-bottom: 20px;
    }
  }

  button{
    margin-top: 10px;
    padding: 10px 15px;
    background: var(--color-bg-light);
    color: var(--color-font-main);
    border: 1px solid var(--color-font-main);
    border-radius: 15px;
    font-size: 14px;

    &:hover{
      background: var(--color-bg-main);
    }
  }
</style>
