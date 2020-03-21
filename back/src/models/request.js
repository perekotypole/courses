import mongoose from 'mongoose'

const { Schema } = mongoose

export default mongoose.model('Request', new Schema({
  organisationId: String,
  peopleIds: [String],
  confirm: Boolean,
}))
