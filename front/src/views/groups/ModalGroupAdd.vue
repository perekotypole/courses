<template>
  <div class="modal-g-add">
    <div class="close">
      <router-link to="/">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="form">
      <span>*Курси</span>
      <div>
        <div
          v-for="(course) in courses"
          :key="course.id"
          class="checkbox">
          <input  type="radio" name="course" v-model="courseM"
            :value="{
              id: course.id,
              days: course.days,
            }">
          <span>{{course.name}}</span>
        </div>
      </div>
      <span v-if="courseM.id">*Викладачі</span>
      <div v-if="courseM.id">
        <div
          v-for="(teacher) in teachers"
          :key="teacher.id"
          class="checkbox">
          <input  type="radio" name="teacher" v-model="teacherId" :value="teacher.id">
          <span>{{teacher.name}}</span>
        </div>
      </div>
      <span v-if="teacherId">* Початок</span>
      <input v-if="teacherId" class="input" type="date" v-model="start"/>
      <span v-if="start && courseM.id">Кінець</span>
      <div v-if="start && courseM.id">{{finish(start, courseM.days)}}</div>
    </div>
    <h5>* - обов'язові поля</h5>
    <ul v-if="errors.length">
      <h3>Заповніть всі обов'язкові поля</h3>
      <li v-for="(error, index) in errors"
      :key="index">{{error}}</li>
    </ul>
    <div class="close">
      <router-link to="/">
        <button fallback="false" @click="checkForm($event) && addGroup()">Добавити</button>
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
    teacherId: '',
    courseM: {
      id: '',
      days: '',
    },
    start: '',
  }),
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
  },
  methods: {
    async addGroup() {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $courseId: String!
          $teacherId: String!
          $start: String!
          ){
            addGroup(
              courseId: $courseId,
              teacherId: $teacherId,
              start: $start,
            ){
              id
            }
          }`,
        variables: {
          courseId: this.courseM.id,
          teacherId: this.teacherId,
          start: this.start,
        },
      }).then((data) => {
        console.log(data)
        this.$router.push('/group/success')
        return true
      }).catch((error) => {
        console.error(error)
        this.$router.push('/group/error')
        return true
      })
    },
    finish: (start, days) => {
      const formated = new Date(start)

      return (new Date(formated.setDate(formated.getDate() + days))).toLocaleDateString()
    },
    checkForm(e) {
      if (this.teacherId && this.courseM.id && this.start) {
        return true
      }

      if (!this.teacherId) {
        this.errors.push('Виберіть викладача')
      }
      if (!this.courseM.id) {
        this.errors.push('Виберіть курс')
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
.modal-g-add{

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
