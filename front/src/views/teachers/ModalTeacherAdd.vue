<template>
  <div class="modal-t-add">
    <div class="close">
      <router-link to="/teachers">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="form">
      <span>*Імя</span>
      <input class="input" type="text" v-model="name" placeholder="Введи назву">
      <span>*Гендер</span>
      <div class="radio">
        <input type="radio" name="gender" checked v-model="sex" value="m">
        <span>м</span>
        <input type="radio" name="gender" v-model="sex" value="f">
        <span>ж</span>
      </div>
      <span>*День народження</span>
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
    <h5>* - обов'язові поля</h5>
    <ul v-if="errors.length">
      <h3>Заповніть всі обов'язкові поля</h3>
      <li v-for="(error, index) in errors"
      :key="index">{{error}}</li>
    </ul>
    <div class="close">
      <router-link to="/teachers">
        <button fallback="false" @click="checkForm($event) && addCourse()">Добавити</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ModalTeacherAdd.vue',
  data: () => ({
    errors: [],
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
      }).then((data) => {
        console.log(data)
        this.$router.push('/teachers/success')
      }).catch((error) => {
        console.error(error)
        this.$router.push('/teachers/error')
      })
    },
    checkForm(e) {
      if (this.name && this.birthday && this.sex) {
        return true
      }

      if (!this.name) {
        this.errors.push('Введіть ім`я')
      }
      if (!this.birthday) {
        this.errors.push('Виберіть дату народження')
      }
      if (!this.sex) {
        this.errors.push('Виберіть стать')
      }

      e.preventDefault()
      return false
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
