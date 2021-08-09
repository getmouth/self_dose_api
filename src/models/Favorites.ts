import { Schema, model, Document } from 'mongoose'

interface FavoriteType extends Document {
  _id?: string
  title: string
  url: string
  image?: string
  deviceId?: string
  userId?: string
}

const favoriteSchema = new Schema<FavoriteType>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  deviceId: String,
},{timestamps: true})

favoriteSchema.pre('save', function (next) {
  if (!this.deviceId && !this.userId) {
    throw new Error('Favourite cannot be added without user info')
  }
  next()
})

favoriteSchema.set('toJSON', {
  transform: (_document: Document, obj: FavoriteType) => {
    obj.id = obj._id?.toString()
    delete obj._id
    delete obj.__v
    delete obj.deviceId
  },
})

const Favorite = model<FavoriteType>('favorite', favoriteSchema)

export default Favorite
