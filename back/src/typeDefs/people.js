import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'
import GroupType from './group'
import Groups from '../models/group'


export default new GraphQLObjectType({
  name: 'People',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    post: { type: GraphQLString },
    group: {
      type: GroupType,
      resolve: (parent) => Groups.findById(parent.groupId),
    },
  }),
})
