import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql'
import OrganisationType from './organisation'
import Organisations from '../models/organisation'
import PeopleType from './people'
import People from '../models/people'

export default new GraphQLObjectType({
  name: 'Request',
  fields: () => ({
    id: { type: GraphQLID },
    organisation: {
      type: OrganisationType,
      resolve: (parent) => Organisations.findById(parent.organisationId),
    },
    people: {
      type: GraphQLList(PeopleType),
      resolve: (parent) => People.find({ _id: { $in: parent.peopleIds } }),
    },
    confirm: { type: GraphQLBoolean },
  }),
})
