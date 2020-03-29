import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from 'graphql'
import TypeType from './type'
import Types from '../models/type'
import TeacherType from './teacher'
import Teachers from '../models/teacher'

export default new GraphQLObjectType({
  name: 'CourseType',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    type: {
      type: TypeType,
      resolve: (parent) => Types.findById(parent.typeId),
    },
    days: { type: GraphQLInt },
    group: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    teachers: {
      type: GraphQLList(TeacherType),
      resolve: (parent) => Teachers.find({ courseIds: { $all: parent.id } }),
    },
  }),
})
