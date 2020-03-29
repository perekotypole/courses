import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import PeopleType from '../typeDefs/people'
import People from '../models/people'


export const people = {
  type: new GraphQLList(PeopleType),
  resolve: () => People.find({}),
}

export const person = {
  type: PeopleType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => People.findById(args.id),
}

export const addPerson = {
  type: PeopleType,
  args: {
    name: { type: GraphQLString },
    post: { type: GraphQLString },
    courseId: { type: GraphQLString },
    period_start: { type: GraphQLString },
    period_finish: { type: GraphQLString },
  },
  resolve(_parent, args) {
    return new People({
      name: args.name,
      post: args.post,
      courseId: args.courseId,
      period: {
        start: args.period_start,
        finish: args.period_finish,
      },
    }).save()
  },
}

export const deletePerson = {
  type: PeopleType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => People.findByIdAndRemove(args.id),
}

export const updatePerson = {
  type: PeopleType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    post: { type: GraphQLString },
    courseId: { type: GraphQLString },
    period_start: { type: GraphQLString },
    period_finish: { type: GraphQLString },
  },
  resolve(_parent, args) {
    return People.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          post: args.post,
          courseId: args.courseId,
          period: {
            start: args.period_start,
            finish: args.period_finish,
          },
        },
      },
      { new: true },
    )
  },
}
