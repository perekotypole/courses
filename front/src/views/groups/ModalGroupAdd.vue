<template>
  <div class="modal-g-add">
    <div class="close">
      <router-link to="/">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="form">
      <span>Курси</span>
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
      <span>Викладачі</span>
      <div>
        <div
          v-for="(teacher) in teachers"
          :key="teacher.id"
          class="checkbox">
          <input  type="radio" name="teacher" v-model="teacherId" :value="teacher.id">
          <span>{{teacher.name}}</span>
        </div>
      </div>
      <span>Початок</span>
      <input class="input" type="date" v-model="start"/>
      <span v-if="start && courseM.id">Кінець</span>
      <div v-if="start && courseM.id">{{finish(start, courseM.days)}}</div>
    </div>
    {{start}}
    <div class="close">
      <router-link to="/">
        <button fallback="false" @click="addGroup()">Добавити</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ModalTeacherAdd.vue',
  data: () => ({
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
      })
    },
    finish: (start, days) => {
      const year = start.slice(0, 4)
      const month = start.slice(5, 7)
      const day = (Number(start.slice(8, 10)) + days).toString()

      const finish = new Date(year, month - 1, day)

      return finish.toLocaleDateString()
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
