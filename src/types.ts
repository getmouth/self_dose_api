export interface FeedType {
  id: string
  userId: string
  deviceId: string
  feedType: TypeOfFeed
  title: string | undefined
  items: {
    title: string | undefined
    url: string | undefined
    image: string | undefined
  }[]
}

export enum TypeOfFeed {
  Blog = 'blog-link',
  Feed = 'rss-feed',
}

export interface NewFeedType {
  title: string
  url: string
  feedType: TypeOfFeed
}
