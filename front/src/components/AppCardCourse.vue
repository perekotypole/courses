<template>
  <app-card id="course">
    <router-link :to="router + id"  class="course">
      <div class="first">
        <div>{{termin}}</div>
        <div>{{code}}</div>
        <div class="name">{{name}}</div>
        <div>{{type}}</div>
      </div>
      <div class="second">
        <router-link v-if="!free" to="courses">
          <font-awesome-icon class="fa-sm" icon="trash" @click="deleteCheck(id)"/>
        </router-link>
        <div>
          <div>{{Course}}</div>
          <div
            v-for="(Course, index) in Courses"
            :key="index">{{Course.name}}</div>
        </div>
        <br>
        <div>
          <div v-if="date">{{date}}</div>
          <div><span v-if="free">{{places - free}} вільних з</span> {{places}} місць</div>
          <div>{{days}} днів</div>
          <div>{{price}} грн/особа</div>
        </div>
      </div>
    </router-link>
  </app-card>
</template>

<script>
import gql from 'graphql-tag'
import AppCard from './AppCard.vue'

export default {
  name: 'AppCardCourse.vue',
  components: {
    AppCard,
  },
  props: {
    id: String,
    code: String,
    termin: String,
    name: String,
    type: String,
    date: [String, Number],
    days: [String, Number],
    Course: String,
    Courses: Array,
    free: [String, Number],
    places: [String, Number],
    price: [String, Number],
    router: String,
  },
  apollo: {
    groups: gql`query {
      groups{
        start
        course{
          id
          days
        }
      }
    }`,
  },
  methods: {
    deleteCheck(id) {
      let check = true

      this.groups.forEach((el) => {
        const formated = new Date(el.start)

        if (new Date(formated.setDate(formated.getDate() + el.course.days)) > Date.now()
        && el.course.id === id) {
          check = false
        }
      })

      if (check) this.deleteCourse(id)
    },
    async deleteCourse(param) {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $id: ID!
          ){
            deleteCourse(
              id: $id,
            ){
              id
            }
          }`,
        variables: {
          id: param,
        },
      })
    },
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
