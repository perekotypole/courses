import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'
import CourseType from './course'
import Courses from '../models/course'

export default new GraphQLObjectType({
  name: 'People',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    post: { type: GraphQLString },
    course: {
      type: CourseType,
      resolve: (parent) => Courses.findById(parent.courseId),
    },
    period: {
      type: new GraphQLObjectType({
        name: 'Period',
        fields: () => ({
          start: { type: GraphQLString },
          finish: { type: GraphQLString },
        }),
      }),
    },
  }),
})
