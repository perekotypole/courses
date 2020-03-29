import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'

import schema from './schema'

const cors = require('cors')

mongoose
  .connect('mongodb://root:pass@localhost:27017/courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

const app = express()
const port = 4040

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(port)
