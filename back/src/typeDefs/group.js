import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import CourseType from './course'
import Courses from '../models/course'
import TeacherType from './teacher'
import Teachers from '../models/teacher'

export default new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: { type: GraphQLID },
    course: {
      type: CourseType,
      resolve: (parent) => Courses.findById(parent.courseId),
    },
    teacher: {
      type: TeacherType,
      resolve: (parent) => Teachers.findById(parent.teacherId),
    },
    start: { type: GraphQLString },
    people: {
      type: GraphQLList(GraphQLString),
      // type: GraphQLList(EmployeeType),
      // resolve: () => (parent) => Employee.find({ commissionId: parent.id }),
    },
  }),
})
