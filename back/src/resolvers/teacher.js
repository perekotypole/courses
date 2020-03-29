import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import TeacherType from '../typeDefs/teacher'
import Teachers from '../models/teacher'
import Images from '../models/image'

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
    birthday: { type: GraphQLString },
    sex: { type: GraphQLString },
    education: { type: GraphQLString },
    category: { type: GraphQLString },
    courseId: { type: GraphQLList(GraphQLString) },
    image: { type: GraphQLString },
  },
  resolve(_parent, args) {
    new Images({
      file: args.image,
    }).save((err_, image) => new Teachers({
      name: args.name,
      birthday: args.birthday,
      sex: args.sex,
      education: args.education,
      category: args.category,
      courseIds: args.courseId,
      imageId: image.id,
    }).save())
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
    birthday: { type: GraphQLString },
    sex: { type: GraphQLString },
    education: { type: GraphQLString },
    category: { type: GraphQLString },
    courseId: { type: GraphQLList(GraphQLString) },
    imageId: { type: GraphQLString },
  },
  resolve(_parent, args) {
    return Teachers.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          birthday: args.birthday,
          sex: args.sex,
          education: args.education,
          category: args.category,
          courseId: args.courseId,
          imageId: args.imageId,
        },
      },
      { new: true },
    )
  },
}
