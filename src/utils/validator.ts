import { NewFeedType, TypeOfFeed } from '../types'

const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}
const isFeedType = (value: unknown): value is TypeOfFeed => {
  return Object.values(TypeOfFeed).includes(value as TypeOfFeed)
}

const parseSTitle = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(`Missing value or title is not a string: ${value}`)
  }

  return value
}

const parseUrl = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(`Missing value or url is not a string: ${value}`)
  }

  return value
}

const parseFeedType = (value: unknown): TypeOfFeed => {
  if (!value || !isFeedType(value)) {
    throw new Error(`Missing value or Id is not a string: ${value}`)
  }

  return value
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateBody = (value: any): NewFeedType => {
  return {
    title: parseSTitle(value.title),
    url: parseUrl(value.url),
    feedType: parseFeedType(value.feedType),
  }
}
