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
        :key="index" class="teacher">
        <router-link :to="`teachers/update/${teacher.id}`"  class="content">
          <div class="image"></div>
          <div class="info">
            <div class="name text-title">{{teacher.name}}</div>
            <div>{{teacher.birthday}} / {{teacher.sex}}.</div>
            <br>
            <div>{{teacher.education}}</div>
            <div v-if="teacher.category">Категорія: {{teacher.category}}</div>
          </div>
          <div class="second info">
            <router-link to="teachers">
              <font-awesome-icon class="fa-sm" icon="trash" @click="deleteCheck(teacher.id)"/>
            </router-link>
            <div
              v-for="(course, index) in teacher.courses"
              :key="index"
              class="text-title"
              >"{{course.name}}"
            </div>
          </div>
        </router-link>
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
        id
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
    groups: gql`query {
      groups{
        start
        teacher{
          id
        }
        course{
          days
        }
      }
    }`,
  },
  methods: {
    deleteCheck(id) {
      let check = true

      this.groups.forEach((el) => {
        const formated = new Date(el.start)

        if (new Date(formated.setDate(formated.getDate() + el.course.days)) > Date.now()
        && el.teacher.id === id) {
          check = false
        }
      })

      if (check) this.deleteTeacher(id)
    },
    async deleteTeacher(param) {
      this.$apollo.mutate({
        mutation: gql`mutation(
          $id: ID!
          ){
            deleteTeacher(
              id: $id,
            ){
              id
            }
          }`,
        variables: {
          id: param,
        },
      })
    },
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

      .content{
        padding: 0;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 0.7fr 1fr 1.3fr;

        .name{
          font-size: 18px;
        }

        .info{
          padding: 10px 20px;
        }

        .second{
          text-align: right;
        }

        .image{
          background-image: url(https://d2hhj3gz5jljkm.cloudfront.net/b97/4b922/f36e/4e7c/859a/aaff52b5ff16/original/51063.jpg);
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
}
</style>
