import Parser from 'rss-parser'
// import { v4 as uuidv4 } from 'uuid'
import { NewFeedType } from '../types'
import { getImg } from '../utils'
import Feed from '../models/Feed'

const parser = new Parser({
  customFields: {
    feed: ['media:thumbnail'],
    item: ['media:thumbnail', 'media:content'],
  },
})

export const getAllFeeds = async (deviceId: string) => {
  const feeds = await Feed.find({ deviceId })
  return feeds.map((feed) => feed.toJSON())
}

export const addFeed = async (body: NewFeedType, deviceId: string) => {
  const response = parser.parseURL(body.url)
  const feed = await response

  const items = feed.items.map((item) => ({
    id: item.guid,
    url: item.link,
    title: item.title,
    image: item.enclosure
      ? item.enclosure.url
      : item['media:thumbnail'] && item['media:thumbnail']['$'].url
      ? (item['media:thumbnail'] as string) &&
        (item['media:thumbnail'] as string) &&
        (item['media:thumbnail']['$'].url as string)
      : item['media:content'] && item['media:content']['$']?.url
      ? (item['media:content'] as string) &&
        (item['media:content']['$'].url as string)
      : getImg(item.content)
      ? getImg(item.content)
      : '',
  }))
  const parsedFeed = {
    title: body.title,
    items,
    deviceId: deviceId,
  }
  const newFeed = new Feed(parsedFeed)
  await newFeed.save()
  return newFeed
}

export const deleteFeed = async (id: string, deviceId: string) => {
  await Feed.findByIdAndDelete(id).where({ deviceId })
}
