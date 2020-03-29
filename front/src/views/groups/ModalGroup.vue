<template>
  <div class="modal-g">
    <div id="close">
      <router-link to="/">
        <font-awesome-icon class="fa-lg" icon="times"/>
      </router-link>
    </div>
    <div class="info">
      <div>
        <div>Курс: <span class="text-title">{{group.course.name}}</span></div>
        <div>Тип: <span class="text-title">{{group.course.type.name}}</span></div>
        <div>Ціна: <span class="text-title">{{group.course.price}}</span> грн/особа</div>
        <div>Дні: <span class="text-title">{{group.course.days}}</span></div>
        <div>Початок: <span class="text-title">{{group.start}}</span></div>
        <div>Викладач: <span class="text-title">{{group.teacher.name}}</span></div>
      </div>
      <div>
        <div
          v-for="(person, index) in group.people"
          :key="index">
          {{person.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ModadGroup',
  data() {
    return {
      routeParam: this.$route.params.id,
    }
  },
  apollo: {
    group: {
      query: gql`query ($id: ID!) {
        group(id: $id){
          id
          course{
            name
            type{
              name
            }
            price
            days
          }
          start
          teacher{
            name
          }
          people{
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
}
</script>

<style lang="less" scoped>
.modal-g{

  #close{
    text-align: right;
    margin-bottom: 20px;
  }

  .info{
    display: grid;
    grid-template-columns: 0.75fr 1fr;
    gap: 35px;
    margin-bottom: 30px;
  }
}
</style>
