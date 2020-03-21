<template>
  <app-card class="course">
    <div class="first">
      <div>{{termin}}</div>
      <div class="name">{{name}}</div>
      <div>{{type}}</div>
    </div>
    <div class="second">
      <div>
        <div>{{date}}</div>
        <div>{{teacher}}</div>
      </div>
      <br>
      <div>
        <div>{{places}}</div>
        <div>{{price}}грн/особа</div>
      </div>
    </div>
  </app-card>
</template>

<script>
import AppCard from './AppCard.vue'

export default {
  name: 'Home.vue',
  components: {
    AppCard,
  },
  props: {
    termin: String,
    name: String,
    type: String,
    date: String,
    teacher: String,
    free: String,
    places: String,
    price: String,
  },
}
</script>

<style lang="less" scoped>
.course{
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 10px;

  .first{
    .name{
      font-size: 25px;
      margin-top: 20px;
    }
  }

  .second{
    .first;
    text-align: right;
  }
}
</style>
