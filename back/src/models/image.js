import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('Image', new Schema({
  file: String,
}))
