/* eslint-disable @typescript-eslint/no-unsafe-call */
export const extractor = (req: any, _res: any, next: any) => {
  const id = req.get('userId') as string
  req.userId = id
  next()
}
