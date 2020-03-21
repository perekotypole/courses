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
    <div class = "requests-list requests-list-active">
      <app-card
        v-for="(request, index) in requests"
        :key="index">
        <router-link
          class="request"
          :to="`/requests/1`">
          <div>Організація: <span class="text-title">{{request.organization}}</span></div>
          <div>Кількість людей: <span class="text-title">{{request.people}}</span></div>
          <div>check/cross</div>
        </router-link>
      </app-card>
    </div>
    <br><hr><br>
    <a name="work" class="title text-title">Діючі заявки</a>
    <div class = "requests-list requests-list-active">
      <app-card
        v-for="(request, index) in requests"
        :key="index"
        class="request">
        <div>Організація: <span class="text-title">{{request.organization}}</span></div>
        <div>Кількість людей: <span class="text-title">{{request.people}}</span></div>
        <div>check/cross</div>
      </app-card>
    </div>
    <br><hr><br>
    <a name="close" class="title text-title">Закриті заявки</a>
    <div class = "requests-list requests-list-active">
      <app-card
        v-for="(request, index) in requests"
        :key="index"
        class="request">
        <div>Організація: <span class="text-title">{{request.organization}}</span></div>
        <div>Кількість людей: <span class="text-title">{{request.people}}</span></div>
        <div>check/cross</div>
      </app-card>
    </div>
    <br><hr><br>
    <a name="out" class="title text-title">Відхилені заявки</a>
    <div class = "requests-list requests-list-active">
      <app-card
        v-for="(request, index) in requests"
        :key="index"
        class="request">
        <div>Організація: <span class="text-title">{{request.organization}}</span></div>
        <div>Кількість людей: <span class="text-title">{{request.people}}</span></div>
        <div>check/cross</div>
      </app-card>
    </div>

    <app-modal v-if="showModal">
      <router-view></router-view>
    </app-modal>
  </div>
</template>

<script>
import AppCard from '../components/AppCard.vue'
import AppModal from '../components/AppModal.vue'

export default {
  name: 'Home.vue',
  components: {
    AppCard,
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
    requests: [
      {
        organization: 'курс курс курс курс курс курс',
        people: '30',
      },
      {
        organization: 'курс курс курс курс курс курс',
        people: '30',
      },
      {
        organization: 'курс курс курс курс курс курс',
        people: '30',
      },
    ],
    showModal: false,
  }),
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

  .requests-list{

    .request{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      grid-auto-flow: column;
      cursor: pointer;
    }
  }
}
</style>
