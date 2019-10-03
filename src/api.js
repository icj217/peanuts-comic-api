/* eslint import/prefer-default-export: "off" */
import serverless from 'serverless-http'
import express from 'express'
import { version } from '../package.json'
import comics from './routes/comics'
import signup from './routes/signup'

const app = express()
app.use((req, res, next) => {
  const {
    query, params, path, method, headers,
  } = req
  console.log({
    method, path, query, params, headers,
  })
  next()
})

/* Routes */
app.get('/version', (req, res) => res.json({ version }))
app.use('/comics', comics)
app.use('/signup', signup)

export const handler = serverless(app, {
  // Remove base path passed from APIG
  basePath: `/${process.env.STAGE}`,
})
