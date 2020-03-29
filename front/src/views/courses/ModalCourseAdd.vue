<template>
  <div class="modal-c-add">
    <div class="close">
      <router-link to="/courses">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="form">
      <span>Код</span>
      <input class="input" type="text" v-model="code" placeholder="Введи назву">
      <span>Назва</span>
      <input class="input" type="text" v-model="name" placeholder="Введи назву">
      <span>Тип</span>
      <select class="input" placeholder="Вибери тип"
        v-model="type">
        <option v-for="(type) in types"
          :key="type.id"
          :value="type.id">{{type.name}}</option>
      </select>
      <span>Ціна</span>
      <input class="input" type="number" v-model="price" placeholder="Введіть ціну">
      <span>Дні</span>
      <input class="input" type="number" v-model="days"
        placeholder="Введіть дні, які відводяться на крус">
      <span>Людей в групі</span>
      <input class="input" type="number" v-model="people"
        placeholder="Введіть число">
      <!-- <span>Викладачі</span>
      <div
        v-for="(teacher) in teachers"
        :key="teacher.id"
        class="checkbox">
        <input  type="checkbox" v-model="teachersM" :value="teacher.id">
        <span>{{teacher.name}}</span>
      </div> -->
    </div>
    <div class="close">
      <router-link to="/courses">
        <button fallback="false" @click="addCourse()">Добавити</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ModalCourseAdd.vue',
  data: () => ({
    code: '',
    name: '',
    type: '',
    price: '',
    days: '',
    people: '',
  }),
  apollo: {
    types: gql`query {
      types{
        id
        name
      }
    }`,
  },
  methods: {
    async addCourse() {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $code: String!,
          $name: String!,
          $typeId: String!,
          $days: Int!,
          $group: Int!,
          $price: Float!
          ){
            addCourse(
              code: $code,
              name: $name,
              typeId: $typeId,
              days: $days,
              group: $group,
              price: $price
            ){
              id
            }
          }`,
        variables: {
          code: this.code,
          name: this.name,
          typeId: this.type,
          days: Number(this.days),
          group: Number(this.people),
          price: Number(this.price),
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.modal-c-add{

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
