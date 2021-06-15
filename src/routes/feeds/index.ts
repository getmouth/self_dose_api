import express from 'express'
import { getAllFeeds, addFeed } from '../../services'

const route = express.Router()

route.get('/', (_req, res) => {
  const feeds = getAllFeeds()
  res.send(feeds)
})

route.post('/',  async (req, res) => {
  try {
    const feed =  await addFeed(req.body)
    return res.send(feed)
  } catch (err) {
    return res.status(404).send({ error: `error while adding new feed: ${err.message}`})
  }
})

export default route
