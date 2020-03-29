<template>
  <app-screen id="app">
    <app-card class="menu">
      <app-home-link link="home">Головна</app-home-link><hr>
      <app-home-link link="requests">Заявки</app-home-link><hr>
      <app-home-link link="teachers">Викладачі</app-home-link><hr>
      <app-home-link link="courses">Курси</app-home-link><hr>
    </app-card>

    <router-view class="content"></router-view>
  </app-screen>
</template>

<script>
import AppScreen from './components/AppScreen.vue'
import AppCard from './components/AppCard.vue'
import AppHomeLink from './components/AppHomeLink.vue'


export default {
  name: 'App.vue',
  components: {
    AppScreen,
    AppCard,
    AppHomeLink,
  },
}
</script>

<style lang="less">

html,
body {
  height: 100vh;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --color-bg-main: #F8F8F8;
  --color-bg-light: #FFFFFF;

  --color-font-main: #707070;
}

#app {
  height: 100%;
  width: 100%;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  color: var(--color-font-main);
  padding: 20px;

  a {
    color: var(--color-font-main);
    text-decoration: none;
  }

  .text-title{
    font-weight: 1000;
  }

  .title{
    margin: 20px 10px;
  }

  hr{
    border: 0.5px solid;
  }

  display: grid;

  grid-template-rows: 1fr;
  grid-template-columns: 300px 1fr;
  grid-gap: 20px;

  .app-home-link{
    margin-left: 20px;
  }

  .content{
    height: 100%;
    overflow-y: auto;

    .app-card{
      margin: 10px 20px;
    }
  }
}
</style>
