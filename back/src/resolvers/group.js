import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import GroupType from '../typeDefs/group'
import Groups from '../models/group'

export const groups = {
  type: new GraphQLList(GroupType),
  resolve: () => Groups.find({}),
}

export const group = {
  type: GroupType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Groups.findById(args.id),
}

export const addGroup = {
  type: GroupType,
  args: {
    courseId: { type: GraphQLString },
    teacherId: { type: GraphQLString },
    start: { type: GraphQLString },
    peopleIds: {
      type: GraphQLList(GraphQLString),
    },
  },
  resolve(_parent, args) {
    return new Groups({
      courseId: args.courseId,
      teacherId: args.teacherId,
      start: args.start,
      peopleIds: args.peopleIds,
    }).save()
  },
}

export const deleteGroup = {
  type: GroupType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Groups.findByIdAndRemove(args.id),
}

export const updateGroup = {
  type: GroupType,
  args: {
    id: { type: GraphQLID },
    courseId: { type: GraphQLString },
    teacherId: { type: GraphQLString },
    start: { type: GraphQLString },
    peopleIds: {
      type: GraphQLList(GraphQLString),
    },
  },
  resolve(_parent, args) {
    return Groups.findByIdAndUpdate(
      args.id,
      {
        $set: {
          courseId: args.courseId,
          teacherId: args.teacherId,
          start: args.start,
          peopleIds: args.peopleIds,
        },
      },
      { new: true },
    )
  },
}
