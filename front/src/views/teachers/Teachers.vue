<template>
  <div id="teachers">
    <router-link to="teachers/add" class="add">
      <app-card>
        <font-awesome-icon class="fa-lg" icon="plus"/>
      </app-card>
    </router-link>
    <div class="text-title title">Викладачі</div>
    <div class = "list-teacher">
      <app-card
        v-for="(teacher, index) in teachers"
        :key="index"
        class="teacher">
        <div class="image"></div>
        <div class="info">
          <div class="name text-title">{{teacher.name}}</div>
          <div>{{teacher.birthday}} / {{teacher.sex}}.</div>
          <br>
          <div>{{teacher.education}}</div>
          <div v-if="teacher.category">Категорія: {{teacher.category}}</div>
        </div>
        <div class="info">
          <div
            v-for="(course, index) in teacher.courses"
            :key="index"
            class="text-title"
            >"{{course.name}}"
          </div>
        </div>
      </app-card>
    </div>

    <app-modal v-if="showModal">
      <router-view></router-view>
    </app-modal>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AppCard from '../../components/AppCard.vue'
import AppModal from '../../components/AppModal.vue'

export default {
  name: 'Teachers.vue',
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
    showModal: false,
  }),
  apollo: {
    teachers: gql`query {
      teachers{
        name
        birthday
        sex
        education
        category
        courses{
          name
        }
      }
    }`,
  },
}
</script>

<style lang="less" scoped>
#teachers{
  .add{
    float: right;
  }

  .list-teacher{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    .teacher{
      padding: 0;
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 0.7fr 1fr 1.3fr;

      .name{
        font-size: 18px;
      }

      .info{
        padding: 10px 5px;
      }

      .image{
        background-image: url(https://d3qdvvkm3r2z1i.cloudfront.net/media/catalog/product/cache/1/image/1800x/6b9ffbf72458f4fd2d3cb995d92e8889/t/e/tearex-newthumb.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 20px 0 0 20px;

        img{
          height: 100%;
        }
      }
    }
  }
}
</style>
