import Parser from 'rss-parser'
import { v4 as uuidv4 } from 'uuid'
import { NewFeedType, TypeOfFeed } from '../types'
import { assertNever, getImg } from '../utils'
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
  switch (body.feedType) {
    case TypeOfFeed.Feed: {
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
        mainUrl: body.url,
        items,
        feedType: body.feedType,
        deviceId,
      }
      const newFeed = new Feed(parsedFeed)
      await newFeed.save()
      return newFeed
    }
    case TypeOfFeed.Blog: {
      const feed = {
        title: body.title,
        feedType: body.feedType,
        mainUrl: body.url,
        deviceId,
        items: [
          {
            id: uuidv4(),
            url: body.url,
            title: body.title,
            image: '',
          },
        ],
      }
      const newFeed = new Feed(feed)
      await newFeed.save()
      return newFeed
    }
    default:
      return assertNever(body.feedType)
  }
}

export const deleteFeed = async (id: string, deviceId: string) => {
  await Feed.findByIdAndDelete(id).where({ deviceId })
}
