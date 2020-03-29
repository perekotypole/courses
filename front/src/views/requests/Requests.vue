<template>
  <div id="requests">
    <app-card class="links">
      <a href="#active" class="text-title link">Активні заявки</a>
      <a href="#work" class="text-title link">Діючі заявки</a>
      <a href="#close" class="text-title link">Закриті заявки</a>
      <a href="#out" class="text-title link">Відхилені заявки</a>
    </app-card>
    <br>

    <a name="active" class="title text-title">Активні заявки</a>
    <div class = "requests-list">
      <div
        v-for="(request) in requests"
        :key="request.id">
        <router-link class="request" :to="`/requests/${request.id}`"
          v-if="request.confirm === null">
          <app-card-request
          :id="request.id"
          :organization="request.organisation.name"
          :people="request.people"
          :confirm="request.confirm"></app-card-request>
        </router-link>
      </div>
    </div>
    <br>

    <a name="work" class="title text-title">Діючі заявки</a>
    <div class = "requests-list">
      <div
        v-for="(request) in requests"
        :key="request.id">
        <router-link class="request" :to="`/requests/${request.id}`"
          v-if="request.confirm && checkDate(request.people)">
          <app-card-request
          :organization="request.organisation.name"
          :people="request.people"
          :confirm="request.confirm"></app-card-request>
        </router-link>
      </div>
    </div>
    <br>

    <a name="close" class="title text-title">Закриті заявки</a>
    <div class = "requests-list">
      <div
        v-for="(request) in requests"
        :key="request.id">
        <router-link class="request" :to="`/requests/${request.id}`"
          v-if="request.confirm && !checkDate(request.people)">
          <app-card-request
          :organization="request.organisation.name"
          :people="request.people"
          :confirm="request.confirm"></app-card-request>
        </router-link>
      </div>
    </div>
    <br>

    <a name="out" class="title text-title">Відхилені заявки</a>
    <div class = "requests-list">
      <div
        v-for="(request) in requests"
        :key="request.id">
        <router-link class="request" :to="`/requests/${request.id}`"
          v-if="request.confirm === false">
          <app-card-request
          :organization="request.organisation.name"
          :people="request.people"
          :confirm="request.confirm"></app-card-request>
        </router-link>
      </div>
    </div>
    <br>

    <app-modal v-if="showModal">
      <router-view></router-view>
    </app-modal>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AppCardRequest from '../../components/AppCardRequest.vue'
import AppModal from '../../components/AppModal.vue'
import AppCard from '../../components/AppCard.vue'

export default {
  name: 'Requests.vue',
  components: {
    AppCardRequest,
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
    requests: gql`query {
      requests{
        id
        organisation{
          name
        }
        people{
          name
          post
          group{
            course{
              name
              days
            }
            start
          }
        }
        confirm
      }
    }`,
  },
  methods: {
    checkDate: (people) => {
      let max = new Date('1950', '01', '01')
      let date

      people.forEach((person) => {
        const year = person.group.start.slice(0, 4)
        const month = person.group.start.slice(5, 7)
        const day = person.group.start.slice(8, 10)

        date = new Date(year, month - 1, Math.abs(-day - person.group.course.days))

        if (date > max) {
          max = date
        }
      })
      return max >= Date.now()
    },
  },
}
</script>

<style lang="less" scoped>
#requests{

  .links{
    display: flex;
    justify-content: space-between;
    .link{
      cursor: pointer;
    }
  }
}
</style>
