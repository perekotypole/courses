<template>
  <div id="home">
    <div class="text-title title">Найближчі курси</div>
    <div class = "list-group">
      <app-card-course
        v-for="(group, index) in soonGroups"
        :key="index"
        :termin="group.termin"
        :name="group.name"
        :type="group.type"
        :date="group.date"
        :teacher="group.teacher"
        :free="group.free"
        :places="group.places"
        :price="group.price">
      </app-card-course>
    </div>
    <div class="text-title title">Активні групи</div>
    <div class = "list-group">
      <app-card-course
        v-for="(group, index) in activeGroups"
        :key="index"
        :termin="group.termin"
        :name="group.name"
        :type="group.type"
        :date="group.date"
        :teacher="group.teacher"
        :free="group.free"
        :places="group.places"
        :price="group.price">
      </app-card-course>
    </div>
  </div>
</template>

<script>
import AppCardCourse from '../components/AppCardCourse.vue'

export default {
  name: 'Home.vue',
  components: {
    AppCardCourse,
  },
  data: () => ({
    soonGroups: [
      {
        termin: 'через 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'через 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'через 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'через 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'через 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
    ],
    activeGroups: [
      {
        termin: 'ще 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'ще 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'ще 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'ще 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'ще 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
      {
        termin: 'ще 20 днів',
        name: 'КУРС УСІХ КУРСІВ',
        type: 'курсовий',
        date: '20.20',
        teacher: 'Вчитеть Вчитель Вчительович',
        free: '10',
        places: '20',
        price: '200',
      },
    ],
  }),
}
</script>

<style lang="less" scoped>
#home{

  .list-group{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
}
</style>
