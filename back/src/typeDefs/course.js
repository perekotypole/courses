import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql'
import TypeType from './type'
import Types from '../models/type'

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
  }),
})
