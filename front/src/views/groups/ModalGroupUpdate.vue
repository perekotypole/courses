<template>
  <div class="modal-g-update">
    <div class="close">
      <router-link to="/">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="form">
      <span>*Викладач</span>
      <div>
        <div
          v-for="(teacher) in teachers"
          :key="teacher.id"
          class="checkbox">
          <input type="radio" name="teacher"
            v-model="teacherId"
            :value="teacher.id">
          <span>{{teacher.name}}</span>
        </div>
      </div>
      <span>*Початок</span>
      <input class="input" type="date" v-model="start" @change="changeDate = true"/>
    </div>
    <h5>* - обов'язові поля</h5>
    <ul v-if="errors.length">
      <h3>Заповніть всі обов'язкові поля</h3>
      <li v-for="(error, index) in errors"
      :key="index">{{error}}</li>
    </ul>
    <div class="close">
      <button @click="checkForm($event) && updateGroup()">Оновити</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ModalGroupUpdate',
  data() {
    return {
      errors: [],
      routeParam: this.$route.params.id,
      teacherId: '',
      start: '',
      changeDate: false,
    }
  },
  apollo: {
    courses: gql`query {
      courses{
        id
        name
        days
      }
    }`,
    teachers: gql`query {
      teachers{
        id
        name
      }
    }`,
    group: {
      query: gql`query ($id: ID!) {
        group(id: $id){
          start
          teacher{
            id
            name
          }
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
    this.teacherId = this.group.teacher.id
    this.start = this.group.start
  },
  methods: {
    async updateGroup() {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $id: ID!
          $teacherId: String!,
          $start: String!,
          ){
            updateGroup(
              id: $id,
              teacherId: $teacherId,
              start: $start,
            ){
              id
            }
          }`,
        variables: {
          id: this.routeParam,
          teacherId: this.teacherId,
          start: this.start,
        },
      }).then((data) => {
        console.log(data)
        this.$router.push('/group/success')
      }).catch((error) => {
        console.error(error)
        this.$router.push('/group/error')
      })
    },
    checkForm(e) {
      if (!this.changeDate || new Date(this.start) > Date.now()) {
        this.errors.push('Курс вже розпочався')
        return false
      }

      if (this.teacherId && this.start) {
        return true
      }

      if (!this.teacherId) {
        this.errors.push('Виберіть викладача')
      }
      if (!this.start) {
        this.errors.push('Виберіть дату початку')
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
