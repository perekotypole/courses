import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'
import {
  courses, course, addCourse, deleteCourse, updateCourse,
} from './resolvers/course'
import {
  groups, group, addGroup, deleteGroup, updateGroup,
} from './resolvers/group'
import {
  organisation, organisations, addOrganisation, deleteOrganisation, updateOrganisation,
} from './resolvers/organisation'
import {
  person, people, addPerson, deletePerson, updatePerson,
} from './resolvers/people'
import {
  request, requests, addRequest, deleteRequest, updateRequest,
} from './resolvers/request'
import {
  teacher, teachers, addTeacher, deleteTeacher, updateTeacher,
} from './resolvers/teacher'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      courses,
      course,
      groups,
      group,
      organisation,
      organisations,
      person,
      people,
      request,
      requests,
      teacher, teachers,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addCourse,
      deleteCourse,
      updateCourse,
      addGroup,
      deleteGroup,
      updateGroup,
      addOrganisation,
      deleteOrganisation,
      updateOrganisation,
      addPerson,
      deletePerson,
      updatePerson,
      addRequest,
      deleteRequest,
      updateRequest,
      addTeacher, deleteTeacher, updateTeacher,
    },
  }),
})
