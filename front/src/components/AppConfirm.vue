<template>
  <div>
    <span @click="confirmRequest(true)">
      <font-awesome-icon class="fa-lg" icon="check"/>
    </span>
    /
    <span @click="confirmRequest(false)">
      <font-awesome-icon class="fa-lg" icon="times"/>
    </span>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Confirm',
  data: () => ({
    confirm: '',
  }),
  props: {
    id: String,
  },
  methods: {
    async confirmRequest(bool) {
      this.confirm = bool
      console.log('this.confirm')
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
          confirm: this.confirm,
        },
      }).then((data) => {
        console.log(data)
        this.$router.push('/requests/success')
      }).catch((error) => {
        console.error(error)
        this.$router.push('/requests/error')
      })
    },
  },
}
</script>
