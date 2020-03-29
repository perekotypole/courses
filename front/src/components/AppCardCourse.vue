<template>
  <app-card class="course">
    <div class="first">
      <div>{{termin}}</div>
      <div>{{code}}</div>
      <div class="name">{{name}}</div>
      <div>{{type}}</div>
    </div>
    <div class="second">
      <div>
        <div>{{teacher}}</div>
        <div
          v-for="(teacher, index) in teachers"
          :key="index">{{teacher.name}}</div>
      </div>
      <br>
      <div>
        <div v-if="date">{{date}}</div>
        <div>{{places - free}} вільних {{places}} місць</div>
        <div>{{days}} днів</div>
        <div>{{price}} грн/особа</div>
      </div>
    </div>
  </app-card>
</template>

<script>
import AppCard from './AppCard.vue'

export default {
  name: 'AppCardCourse.vue',
  components: {
    AppCard,
  },
  props: {
    code: String,
    termin: String,
    name: String,
    type: String,
    date: [String, Number],
    days: [String, Number],
    teacher: String,
    teachers: Array,
    free: [String, Number],
    places: [String, Number],
    price: [String, Number],
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
