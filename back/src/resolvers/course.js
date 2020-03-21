import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql'
import CourseType from '../typeDefs/course'
import Courses from '../models/course'

export const courses = {
  type: new GraphQLList(CourseType),
  resolve: () => Courses.find({}),
}

export const course = {
  type: CourseType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Courses.findById(args.id),
}

export const addCourse = {
  type: CourseType,
  args: {
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    typeId: { type: GraphQLString },
    days: { type: GraphQLInt },
    group: { type: GraphQLInt },
    price: { type: GraphQLFloat },
  },
  resolve(_parent, args) {
    return new Courses({
      code: args.code,
      name: args.name,
      typeId: args.typeId,
      days: args.days,
      group: args.group,
      price: args.price,
    }).save()
  },
}

export const deleteCourse = {
  type: CourseType,
  args: { id: { type: GraphQLID } },
  resolve: (_parent, args) => Courses.findByIdAndRemove(args.id),
}

export const updateCourse = {
  type: CourseType,
  args: {
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    typeId: { type: GraphQLString },
    days: { type: GraphQLInt },
    group: { type: GraphQLInt },
    price: { type: GraphQLFloat },
  },
  resolve(_parent, args) {
    return Courses.findByIdAndUpdate(
      args.id,
      {
        $set: {
          code: args.code,
          name: args.name,
          typeId: args.typeId,
          days: args.days,
          group: args.group,
          price: args.price,
        },
      },
      { new: true },
    )
  },
}
