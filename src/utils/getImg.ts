export const getImg = (value: string | undefined): string | undefined => {
  const regex: RegExp = /img.*?src=("|')(.*?)\1/i
  const regexVid: RegExp = /video.*?poster=("|')(.*?)\1/i

  const img: RegExpMatchArray | null = value
    ? value.match(regexVid) || value.match(regex)
    : null
  return img ? img[2] : undefined
}
