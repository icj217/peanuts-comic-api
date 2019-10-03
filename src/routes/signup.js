import { Router } from 'express'

const routes = new Router()

routes.post('/', (req, res) => {
  // Validate re:CAPTCHA
  // Add email to SNS/SES/DDB
  res.sendStatus(401)
})

export default routes
