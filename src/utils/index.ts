export * from './getImg'

export const assertNever = (value: never): never => {
  throw new Error(`${value} is not supported`)
}
