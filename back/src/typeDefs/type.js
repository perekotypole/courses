import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import CourseType from './course'
import Courses from '../models/course'

export default new GraphQLObjectType({
  name: 'Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    courses: {
      type: GraphQLList(CourseType),
      resolve: (parent) => Courses.find({ typeId: parent.id }),
    },
  }),
})
