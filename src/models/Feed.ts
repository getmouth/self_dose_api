import { Schema, model, Document } from 'mongoose'
import { FeedType } from '../types'

interface ModelFeedType extends Document {
  _id?: string
  items: {
    _id: string
    url: string
    title: string
    image: string
  }
}

const feedSchema = new Schema<FeedType>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  userId: String,
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
})

feedSchema.set('toJSON', {
  transform: (_document: Document, obj: ModelFeedType) => {
    obj.id = obj._id?.toString()
    delete obj._id
    delete obj.__v
  },
})

const Feed = model<ModelFeedType>('Feed', feedSchema)

export default Feed
