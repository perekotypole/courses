<template>
  <div class="modal-r">
    <div class="close">
      <router-link to="/requests">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="info">
      <div>
        <div>Організація: <span class="text-title">{{request.organisation.name}}</span></div>
        <div>Кількість людей: <span class="text-title">{{request.people.length}}</span></div>
      </div>
      <div>
        <div
          v-for="(person, index) in request.people"
          :key="index">
          {{person.name}} / {{person.group.course.name}} / {{person.group.start}}
        </div>
      </div>
    </div>
    <app-confirm v-if="request.confirm === null" :id="routeParam" class="close"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AppConfirm from '../../components/AppConfirm.vue'

export default {
  name: 'ModalRequest.vue',
  components: {
    AppConfirm,
  },
  data() {
    return {
      routeParam: this.$route.params.id,
    }
  },
  apollo: {
    request: {
      query: gql`query ($id: ID!) {
        request(id: $id){
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
      variables() {
        return {
          id: this.routeParam,
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.modal-r{

  .close{
    text-align: right;
    margin-bottom: 20px;
  }

  .info{
    display: grid;
    grid-template-columns: 0.75fr 1fr;
    gap: 35px;
  }
}
</style>
