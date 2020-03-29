import {
  GraphQLID,
  GraphQLList,
} from 'graphql'
import ImageType from '../typeDefs/image'
import Images from '../models/image'

export const images = {
  type: new GraphQLList(ImageType),
  resolve: () => Images.find({}),
}

export const image = {
  type: ImageType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Images.findById(args.id),
}
