import { Schema, model, Document } from 'mongoose'
import { FeedType } from '../types'

interface ModelFeedType extends Document {
  _id?: string
  deviceId?: string
}

const feedSchema = new Schema<FeedType>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    feedType: {
      type: String,
      required: true,
    },
    mainUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    deviceId: String,
    items: [
      {
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        image: String,
      },
    ],
  },
  { timestamps: true }
)

feedSchema.set('toJSON', {
  transform: (_document: Document, obj: ModelFeedType) => {
    obj.id = obj._id?.toString()
    delete obj._id
    delete obj.__v
    delete obj.deviceId
  },
})

feedSchema.pre('save', function (next) {
  if (!this.deviceId && !this.userId) {
    throw new Error('New Feed cannot be added without user info')
  }
  next()
})

const Feed = model<ModelFeedType>('feed', feedSchema)

export default Feed
