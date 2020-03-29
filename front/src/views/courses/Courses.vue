<template>
  <div id="courses">
    <router-link to="courses/add" class="add">
      <app-card>
        <font-awesome-icon class="fa-lg" icon="plus"/>
      </app-card>
    </router-link>
    <div
      v-for="(type, index) in types"
      :key="index">
      <div class="text-title title">{{ type.name }}</div>
      <div class = "list-group">
        <app-card-course
          v-for="(course, index) in type.courses"
          :key="index"
          :name="course.name"
          :code="course.code"
          :price="course.price"
          :teachers="course.teachers"
          :places="course.group"
          :date="course.days">
        </app-card-course>
      </div>
    </div>

    <app-modal v-if="showModal">
      <router-view></router-view>
    </app-modal>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AppCard from '../../components/AppCard.vue'
import AppCardCourse from '../../components/AppCardCourse.vue'
import AppModal from '../../components/AppModal.vue'

export default {
  name: 'Courses.vue',
  components: {
    AppCard,
    AppCardCourse,
    AppModal,
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        this.showModal = newVal.meta && newVal.meta.showModal
      },
    },
  },
  data: () => ({
    showModal: false,
  }),
  apollo: {
    types: gql`query {
      types{
        name
        courses{
          name
          price
          teachers {
            name
          }
          code
          group
          days
        }
      }
    }`,
  },
}
</script>

<style lang="less" scoped>
#courses{

  .add{
    float: right;
  }

  .list-group{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
}
</style>
