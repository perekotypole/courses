<template>
  <div class="modal-g-update">
    <div class="close">
      <router-link to="/courses">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="form">
      <span>* Код</span>
      <input class="input" type="text" v-model="code" placeholder="Введи назву">
      <span>* Назва</span>
      <input class="input" type="text" v-model="name" placeholder="Введи назву">
      <span>* Тип</span>
      <select class="input" placeholder="Вибери тип"
        v-model="type">
        <option v-for="(type) in types"
          :key="type.id"
          :value="type.id">{{type.name}}</option>
      </select>
      <span>* Ціна</span>
      <input class="input" type="number" v-model="price" placeholder="Введіть ціну">
      <span>* Дні</span>
      <input class="input" type="number" v-model="days"
        placeholder="Введіть дні, які відводяться на крус">
      <span>* Людей в групі</span>
      <input class="input" type="number" v-model="people"
        placeholder="Введіть число">
    </div>
    <h5>* - обов'язові поля</h5>
    <ul v-if="errors.length">
      <h3>Заповніть всі обов'язкові поля</h3>
      <li v-for="(error, index) in errors"
      :key="index">{{error}}</li>
    </ul>
    <div class="close">
      <router-link to="/courses">
        <button fallback="false" @click="checkForm($event) && updateCourse()">Оновити</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ModalCourseUpdate',
  data() {
    return {
      errors: [],
      routeParam: this.$route.params.id,
      code: '',
      name: '',
      type: '',
      price: '',
      days: '',
      people: '',
    }
  },
  apollo: {
    types: gql`query {
      types{
        id
        name
      }
    }`,
    course: {
      query: gql`query ($id: ID!) {
        course(id: $id){
          type{
            id
            name
          }
          name
          price
          code
          group
          days
        }
      }`,
      variables() {
        return {
          id: this.routeParam,
        }
      },
    },
  },
  created() {
    this.code = this.course.code
    this.name = this.course.name
    this.type = this.course.type.id
    this.days = this.course.days
    this.people = this.course.group
    this.price = this.course.price
  },
  methods: {
    async updateCourse() {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $id: ID
          $code: String
          $name: String
          $typeId: String
          $days: Int
          $group: Int
          $price: Float
          ){
            updateCourse(
              id: $id,
              code: $code,
              name: $name,
              typeId: $typeId,
              days: $days,
              group: $group,
              price: $price,
            ){
              id
            }
          }`,
        variables: {
          id: this.routeParam,
          code: this.code,
          name: this.name,
          typeId: this.type,
          days: Number(this.days),
          group: Number(this.people),
          price: Number(this.price),
        },
      }).then((data) => {
        console.log(data)
        this.$router.push('/courses/success')
        return true
      }).catch((error) => {
        console.error(error)
        this.$router.push('/courses/error')
        return true
      })
    },
    checkForm(e) {
      if (this.code && this.name && this.type && this.days && this.people && this.price) {
        return true
      }

      if (!this.code) {
        this.errors.push('Введіть код')
      }
      if (!this.name) {
        this.errors.push('Введіть ім`я')
      }
      if (!this.type) {
        this.errors.push('Введіть тип')
      }
      if (!this.days) {
        this.errors.push('Введіть кількість днів')
      }
      if (!this.people) {
        this.errors.push('Введіть кількість людей')
      }
      if (!this.price) {
        this.errors.push('Введіть ціну')
      }

      e.preventDefault()
      return false
    },
  },
}
</script>

<style lang="less" scoped>
.modal-g-update{

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
