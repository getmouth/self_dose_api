export interface FeedType {
  id: number
  title: string | undefined
  items: {
    title: string | undefined
    url: string | undefined
    image: string | undefined
  }[]
}

export interface BodyType {
  id: string
  title: string
  url: string
}
