import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import OrganisationType from '../typeDefs/organisation'
import Organisations from '../models/organisation'

export const organisations = {
  type: new GraphQLList(OrganisationType),
  resolve: () => Organisations.find({}),
}

export const organisation = {
  type: OrganisationType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Organisations.findById(args.id),
}

export const addOrganisation = {
  type: OrganisationType,
  args: {
    name: { type: GraphQLString },
    adress: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve(_parent, args) {
    return new Organisations({
      name: args.name,
      adress: args.adress,
      phone: args.phone,
      email: args.email,
    }).save()
  },
}

export const deleteOrganisation = {
  type: OrganisationType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Organisations.findByIdAndRemove(args.id),
}

export const updateOrganisation = {
  type: OrganisationType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    adress: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve(_parent, args) {
    return Organisations.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          adress: args.adress,
          phone: args.phone,
          email: args.email,
        },
      },
      { new: true },
    )
  },
}
