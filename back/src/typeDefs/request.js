import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql'
import OrganisationType from './organisation'
import Organisations from '../models/organisation'

export default new GraphQLObjectType({
  name: 'Request',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    organisation: {
      type: OrganisationType,
      resolve: (parent) => Organisations.findById(parent.organisationId),
    },
    peopleIds: {
      type: GraphQLList(GraphQLString),
      // type: GraphQLList(EmployeeType),
      // resolve: () => (parent) => Employee.find({ commissionId: parent.id }),
    },
    confirm: { type: GraphQLBoolean },
  }),
})
