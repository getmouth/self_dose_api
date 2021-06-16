import Parser from 'rss-parser'
import { BodyType } from '../types'
import { getImg } from '../utils'
import Feed from '../models/Feed'

const parser = new Parser({
  customFields: {
    item: ['thumbnail', 'media:content'],
  },
})

export const getAllFeeds = async (userId: string) => {
  const feeds = await Feed.find({ userId: userId })
  return feeds.map((feed) => feed.toJSON())
}

export const addFeed = async (body: BodyType) => {
  const response = parser.parseURL(body.url)
  const feed = await response
  const items = feed.items.map((item) => ({
    id: item.guid,
    url: item.link,
    title: item.title,
    image: item.enclosure
      ? item.enclosure.url
      : item['media:content']['$'].url
      ? (item['media:content']['$'].url as string)
      : getImg(item.content)
      ? getImg(item.content)
      : '',
  }))
  const parsedFeed = {
    title: body.title,
    items,
    userId: body.userId,
  }
  const newFeed = new Feed(parsedFeed)
  await newFeed.save()
  return newFeed
}

export const deleteFeed = async (id: string, userId: string) => {
  await Feed.findByIdAndDelete(id).where({ userId: userId })
}
