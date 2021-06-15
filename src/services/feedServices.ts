import Parser from 'rss-parser'
import { BodyType, FeedType } from '../types'
import { getImg } from '../utils'

const parser = new Parser({
  customFields: {
    item: ['thumbnail', 'media:content'],
  },
})

let id = 0

const feeds: FeedType[] = []

export const getAllFeeds = () => {
  return feeds
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
      : getImg(item.content)
      ? getImg(item.content)
      : '',
  }))
  const parsedFeed = { id: id++, title: body.title, items }
  feeds.push(parsedFeed)
  return parsedFeed
}
