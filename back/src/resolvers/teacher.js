import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql'
import TeacherType from '../typeDefs/teacher'
import Teachers from '../models/teacher'

export const teachers = {
  type: new GraphQLList(TeacherType),
  resolve: () => Teachers.find({}),
}

export const teacher = {
  type: TeacherType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Teachers.findById(args.id),
}

export const addTeacher = {
  type: TeacherType,
  args: {
    name: { type: GraphQLString },
    sex: { type: GraphQLString },
    education: { type: GraphQLString },
    category: { type: GraphQLString },
    courseId: {type: GraphQLList(GraphQLString)},
  },
  resolve(_parent, args) {
    return new Teachers({
      name: args.name,
      sex: args.sex,
      education: args.education,
      category: args.category,
      courseId: args.courseId,
    }).save()
  },
}

export const deleteTeacher = {
  type: TeacherType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Teachers.findByIdAndRemove(args.id),
}

export const updateTeacher = {
  type: TeacherType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sex: { type: GraphQLString },
    education: { type: GraphQLString },
    category: { type: GraphQLString },
    courseId: {type: GraphQLList(GraphQLString)},
  },
  resolve(_parent, args) {
    return Teachers.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          sex: args.sex,
          education: args.education,
          category: args.category,
          courseId: args.courseId,
        },
      },
      { new: true },
    )
  },
}
