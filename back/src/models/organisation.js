import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('Organisation', new Schema({
  name: String,
  adress: String,
  phone: String,
  email: String,
}))
