import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('Course', new Schema({
  code: String,
  name: String,
  typeId: String,
  days: Number,
  group: Number,
  price: Number,
}))
