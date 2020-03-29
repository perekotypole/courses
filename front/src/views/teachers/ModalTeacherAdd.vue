<template>
  <div class="modal-t-add">
    <div class="close">
      <router-link to="/teachers">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="form">
      <span>Імя</span>
      <input class="input" type="text" v-model="name" placeholder="Введи назву">
      <span>Фото</span>
      <input class="input" type="file" accept="image/png, image/jpeg" @change="processFile($event)">
      <span>Гендер</span>
      <div class="radio">
        <input type="radio" name="gender" checked v-model="sex" value="m">
        <span>м</span>
        <input type="radio" name="gender" v-model="sex" value="f">
        <span>ж</span>
      </div>
      <span>День народження</span>
      <input class="input" type="date" v-model="birthday"/>
      <span>Освіта</span>
      <input class="input" type="text" v-model="education">
      <span>Категорія</span>
      <select class="input" v-model="category">
        <option value="вища">Вища</option>
        <option value="перша">Перша</option>
        <option value="друга">Друга</option>
      </select>
      <span>Курси</span>
      <div>
        <div
          v-for="(course) in courses"
          :key="course.id"
          class="checkbox">
          <input  type="checkbox" v-model="courseId" :value="course.id">
          <span>{{course.name}}</span>
        </div>
      </div>
    </div>
    <div class="close">
      <router-link to="/teachers">
        <button fallback="false" @click="addCourse()">Добавити</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ModalTeacherAdd.vue',
  data: () => ({
    name: '',
    birthday: '',
    sex: '',
    education: '',
    category: '',
    courseId: [],
  }),
  apollo: {
    courses: gql`query {
      courses{
        id
        name
      }
    }`,
  },
  methods: {
    async addCourse() {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $name: String!,
          $birthday: String!,
          $sex: String,
          $education: String,
          $category: String,
          $courseId: [String!],
          ){
            addTeacher(
              name: $name,
              birthday: $birthday,
              sex: $sex,
              education: $education,
              category: $category,
              courseId: $courseId,
            ){
              id
            }
          }`,
        variables: {
          name: this.name,
          birthday: this.birthday,
          sex: this.sex,
          education: this.education,
          category: this.category,
          courseId: this.courseId,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.modal-t-add{

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

  .form{
    display: grid;
    grid-template-columns: 0.25fr minmax(300px, 1fr);
    gap: 20px;
    align-items: center;

    .input{
      padding: 10px 15px;
      background: none;
      border: 1px solid var(--color-font-main);
      border-radius: 15px;
      font-size: 14px;
    }

    .checkbox{

      span{
        margin-left: 10px;
      }
    }
  }
}
</style>
