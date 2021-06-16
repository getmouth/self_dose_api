import express from 'express'
import { getAllFeeds, addFeed, deleteFeed } from '../../services'

const route = express.Router()

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

route.get('/', async (req, res) => {
  try {
    console.log('USERID', req.userId)
    const feeds = await getAllFeeds(req.userId)
    return res.status(200).json(feeds)
  } catch (err) {
    return res
      .status(404)
      .send({ error: 'An error occurred while fetching feeds' })
  }
})

route.post('/', async (req, res) => {
  try {
    const feed = await addFeed(req.body)
    return res.status(200).json(feed)
  } catch (err) {
    return res
      .status(404)
      .send({ error: `error while adding new feed: ${err.message}` })
  }
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await deleteFeed(id, req.userId)
    return res.status(201).send({ message: 'Feed successfully deleted' })
  } catch (err) {
    return res.status(404).send({ error: 'Error deleting feed' })
  }
})

export default route
