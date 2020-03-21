<template>
  <div id="home">
    <div class="text-title title">Викладачі</div>
    <div class = "list-teacher">
      <app-card
        v-for="(teacher, index) in teachers"
        :key="index"
        class="teacher">
        <div class="image"></div>
        <div class="info">
          <div class="name">{{teacher.name}}</div>
          <br>
          <div>{{teacher.age}}р. / {{teacher.sex}}.</div>
          <div>{{teacher.educ}}</div>
          <div>{{teacher.categ}} категорія</div>
        </div>
        <div class="info">
          <div
            v-for="(course, index) in teacher.courses"
            :key="index"
            >{{course}}
          </div>
        </div>
      </app-card>
    </div>
  </div>
</template>

<script>
import AppCard from '../components/AppCard.vue'

export default {
  name: 'Home.vue',
  components: {
    AppCard,
  },
  data: () => ({
    teachers: [
      {
        name: 'Вчитель Вчитель Вчительович',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
      {
        name: 'імя',
        age: '30',
        sex: 'м',
        educ: 'диплом має',
        categ: 'вища',
        courses: ['aaaaaaaaaaaaaaaaaaa', 'ssssssssss', 'ffffffffffffffffffff'],
      },
    ],
  }),
}
</script>

<style lang="less" scoped>
#home{

  .list-teacher{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;

    .teacher{
      padding: 0;
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 0.7fr 1fr 1.3fr;

      .name{
        font-size: 18px;
      }

      .info{
        padding: 10px 5px;
      }

      .image{
        background-image: url(https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 20px 0 0 20px;

        img{
          height: 100%;
        }
      }
    }
  }
}
</style>
