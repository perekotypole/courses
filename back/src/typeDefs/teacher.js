import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
// import CourseType from './course'
// import Courses from '../models/course'

export default new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sex: { type: GraphQLString },
    education: { type: GraphQLString },
    category: { type: GraphQLString },
    course: {
      type: GraphQLList(GraphQLString),
      // type: GraphQLList(CourseType),
      // resolve: (parent) => Courses.findById(parent.courseIds),
    },
  }),
})
