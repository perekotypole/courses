import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('Type', new Schema({
  name: String,
}))
