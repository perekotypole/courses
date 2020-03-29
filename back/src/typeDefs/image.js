import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'
import TeacherType from './teacher'
import Teachers from '../models/teacher'

export default new GraphQLObjectType({
  name: 'ImageType',
  fields: () => ({
    id: { type: GraphQLID },
    file: { type: GraphQLString },
    teacher: {
      type: TeacherType,
      resolve: (parent) => Teachers.findOne({ imageId: parent.id }),
    },
  }),
})
