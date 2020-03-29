import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql'
import RequestType from '../typeDefs/request'
import Requests from '../models/request'
import Groups from '../models/group'
import People from '../models/people'

export const requests = {
  type: new GraphQLList(RequestType),
  resolve: () => Requests.find({}),
}

export const request = {
  type: RequestType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Requests.findById(args.id),
}

export const addRequest = {
  type: RequestType,
  args: {
    name: { type: GraphQLString },
    organisationId: { type: GraphQLString },
    peopleIds: { type: GraphQLList(GraphQLString) },
    confirm: { type: GraphQLBoolean },
  },
  resolve(_parent, args) {
    return new Requests({
      name: args.name,
      organisationId: args.organisationId,
      peopleIds: args.peopleIds,
      confirm: args.confirm,
    }).save()
  },
}

export const deleteRequest = {
  type: RequestType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Requests.findByIdAndRemove(args.id),
}

export const updateRequest = {
  type: RequestType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    organisationId: { type: GraphQLString },
    peopleIds: { type: GraphQLList(GraphQLString) },
    confirm: { type: GraphQLBoolean },
  },
  resolve(_parent, args) {
    return Requests.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          organisationId: args.organisationId,
          peopleIds: args.peopleIds,
          confirm: args.confirm,
        },
      },
      { new: true },
    )
  },
}

export const confirmRequest = {
  type: RequestType,
  args: {
    id: { type: GraphQLID },
    confirm: { type: GraphQLBoolean },
  },
  resolve(_parent, args) {
    if (args.confirm) {
      Requests.findById(args.id)
        .exec((err_, req) => {
          req.peopleIds.forEach((personId) => {
            People.findById(personId)
              .exec((err, person) => {
                if (err) console.log(err)
                else {
                  Groups.findById(person.groupId).exec((error, group) => {
                    if (err) console.log(error)
                    else {
                      group.peopleIds.push(person.id)
                      group.save()
                    }
                  })
                }
              })
          })
        })
    }

    return Requests.findByIdAndUpdate(
      args.id,
      {
        $set: {
          confirm: args.confirm,
        },
      },
      { new: true },
    )
  },
}
