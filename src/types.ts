export interface FeedType {
  id: string
  userId: string
  title: string | undefined
  items: {
    title: string | undefined
    url: string | undefined
    image: string | undefined
  }[]
}

export interface NewFeedType {
  title: string
  url: string
  feedType: string
}
