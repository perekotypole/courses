import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('Teacher', new Schema({
  name: String,
  birthday: String,
  sex: String,
  education: String,
  category: String,
  courseIds: [String],
}))
