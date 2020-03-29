import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('People', new Schema({
  name: String,
  post: String,
  groupId: String,
}))
