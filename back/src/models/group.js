import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('Group', new Schema({
  courseId: String,
  teacherId: String,
  start: String,
  peopleIds: [String],
}))
