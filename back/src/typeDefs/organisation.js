import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
  name: 'Organisation',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    adress: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
})
