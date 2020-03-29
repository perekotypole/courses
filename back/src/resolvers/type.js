import {
  GraphQLID,
  GraphQLList,
} from 'graphql'
import TypeType from '../typeDefs/type'
import Types from '../models/type'

export const types = {
  type: new GraphQLList(TypeType),
  resolve: () => Types.find({}),
}

export const type = {
  type: TypeType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Types.findById(args.id),
}
