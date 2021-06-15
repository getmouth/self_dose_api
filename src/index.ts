import express from 'express'
import feedsRoute from './routes/feeds/index'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/feeds', feedsRoute)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('**************************************')
  console.log(`Server is listening on Port: ${PORT}`)
  console.log('**************************************')
})
