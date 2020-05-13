import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import CourseType from './course'
import Courses from '../models/course'
import ImageType from './image'
import Images from '../models/image'

export default new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birthday: { type: GraphQLString },
    sex: { type: GraphQLString },
    education: { type: GraphQLString },
    category: { type: GraphQLString },
    courseIds: { type: GraphQLList(GraphQLString)}, 
    courses: {
      type: GraphQLList(CourseType),
      resolve: (parent) => Courses.find({ _id: { $in: parent.courseIds } }),
    },
    image: {
      type: ImageType,
      resolve: (parent) => Images.findById(parent.imageId),
    },
  }),
})
