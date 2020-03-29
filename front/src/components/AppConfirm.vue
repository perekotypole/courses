<template>
  <div>
    <router-link to="requests" @click="confirmRequest(true)">
      <font-awesome-icon class="fa-lg" icon="check"/>
    </router-link>
    /
    <router-link to="requests" @click="confirmRequest(false)">
      <font-awesome-icon class="fa-lg" icon="times"/>
    </router-link>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Confirm',
  props: {
    id: String,
  },
  methods: {
    async confirmRequest(conf) {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $id: ID
          $confirm: Boolean
          ){
            confirmRequest(
              id: $id
              confirm: $confirm
            ){
              id
            }
          }`,
        variables: {
          id: this.id,
          confirm: conf,
        },
      })
    },
  },
}
</script>
