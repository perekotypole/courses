<template>
  <div id="request">
    <app-card class="request">
      <div>Організація: <span class="text-title">{{organization}}</span></div>
      <div>Кількість людей: <span class="text-title">{{people.length}}</span></div>
      <app-confirm v-if="confirm === null" :id="id"/>
      <div v-else>{{start}}/{{finish}}</div>
    </app-card>
  </div>
</template>

<script>
import AppCard from './AppCard.vue'
import AppConfirm from './AppConfirm.vue'

export default {
  name: 'AppCardRequest.vue',
  components: {
    AppCard,
    AppConfirm,
  },
  props: {
    id: String,
    organization: String,
    people: Array,
    confirm: Boolean,
  },
  computed: {
    start() {
      let min = new Date('2950', '01', '01')
      let date

      this.people.forEach((person) => {
        const year = person.group.start.slice(0, 4)
        const month = person.group.start.slice(5, 7)
        const day = person.group.start.slice(8, 10)

        date = new Date(year, month - 1, Math.abs(-day))

        if (date < min) {
          min = date
        }
      })
      return min.toLocaleDateString()
    },
    finish() {
      let max = new Date('1950', '01', '01')
      let date

      this.people.forEach((person) => {
        const year = person.group.start.slice(0, 4)
        const month = person.group.start.slice(5, 7)
        const day = person.group.start.slice(8, 10)

        date = new Date(year, month - 1, Math.abs(-day - person.group.course.days))

        if (date > max) {
          max = date
        }
      })
      return max.toLocaleDateString()
    },
  },
}
</script>

<style lang="less" scoped>
#request{

  .request{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    grid-auto-flow: column;
    cursor: pointer;
  }
}
</style>
