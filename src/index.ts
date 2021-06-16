/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import feedsRoute from './routes/feeds/index'
import { extractor } from './utils/extractor'

const DBURL = 'mongodb://localhost:27017/feeds'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('common'))

app.use(extractor)
app.use('/feeds', feedsRoute)

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('DB successfully connected'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('**************************************')
  console.log(`Server is listening on Port: ${PORT}`)
  console.log('**************************************')
})
