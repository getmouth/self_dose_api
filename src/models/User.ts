import { Schema, model, Document } from 'mongoose'
import { FeedType } from '../types'

interface ModelFeedType extends Document {
  _id?: string
}

const userSchema = new Schema<FeedType>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isTempUser: Boolean,
  avatar: String,
  deviceId: String,
})

userSchema.set('toJSON', {
  transform: (_document: Document, obj: ModelFeedType) => {
    obj.id = obj._id?.toString()
    delete obj._id
    delete obj.__v
  },
})

const User = model<ModelFeedType>('user', userSchema)

export default User
