import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
  name: 'Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
})
