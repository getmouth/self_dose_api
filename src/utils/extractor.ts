/* eslint-disable @typescript-eslint/no-unsafe-call */
export const extractor = (req: any, _res: any, next: any) => {
  const id = req.get('deviceId') as string
  req.deviceId = id
  next()
}
