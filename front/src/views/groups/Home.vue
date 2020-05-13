<template>
  <div id="home">
    <router-link to="group/add" class="add">
      <app-card>
        <font-awesome-icon class="fa-lg" icon="plus"/>
      </app-card>
    </router-link>
    <div class="text-title title">Найближчі курси</div>
    <div class = "list-group">
      <div v-for="(group) in groups"
        :key="group.id">
        <div v-if="soon(group.start)">
          <app-card-course
            :termin="'Залишилось ' + termin(group.start) + ' днів'"
            :id="group.id"
            :name="group.course.name"
            :type="group.course.type.name"
            :date="group.start"
            :days="group.course.days"
            :teacher="group.teacher.name"
            :free="group.people.length"
            :places="group.course.group"
            :price="group.course.price"
            :router="'/group/'">
          </app-card-course>
        </div>
      </div>
    </div>

    <div class="text-title title">Активні групи</div>
    <div class = "list-group">
      <div v-for="(group, index) in groups"
        :key="index">
        <div v-if="active(group.start, group.course.days)">
          <app-card-course
            :termin="'Залишилось ' + termin(group.start, group.course.days) + ' днів'"
            :id="group.id"
            :name="group.course.name"
            :type="group.course.type.name"
            :date="group.start"
            :days="group.course.days"
            :teacher="group.teacher.name"
            :free="group.people.length"
            :places="group.course.group"
            :price="group.course.price"
            :router="'/group/'">
          </app-card-course>
        </div>
      </div>
    </div>

    <app-modal v-if="showModal">
      <router-view></router-view>
    </app-modal>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AppCardCourse from '../../components/AppCardCourse.vue'
import AppCard from '../../components/AppCard.vue'
import AppModal from '../../components/AppModal.vue'

export default {
  name: 'Home.vue',
  components: {
    AppCardCourse,
    AppModal,
    AppCard,
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
    groups: gql`query {
      groups{
        id
        course{
          name
          type{
            name
          }
          price
          days
          group
        }
        start
        teacher{
          name
        }
        people{
          id
        }
      }
    }`,
  },
  methods: {
    soon: (date) => new Date(date) > Date.now(),
    active: (date, days) => {
      const formated = new Date(date)

      return !(formated > Date.now())
      && ((new Date(formated.setDate(formated.getDate() + days))) > Date.now())
    },
    termin: (date, days = 0) => {
      const formated = new Date(date)

      return Math.ceil(Math.abs(new Date(formated.setDate(formated.getDate() + days))
      - Date.now()) / 86400000)
    },
  },
}
</script>

<style lang="less" scoped>
#home{
  .add{
    float: right;
  }

  .list-group{
    display: grid;
    grid-gap: 10px;
  }
}
</style>
