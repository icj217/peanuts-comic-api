import { Router } from 'express'
import DynamoDB from 'aws-sdk/clients/dynamodb'
import isValid from '../utils/recaptcha'

const routes = new Router()
const dynamodb = new DynamoDB.DocumentClient()
const params = {
  TableName: process.env.peanutsSubscribersDDBTable,
}

routes.post('/', async (req, res) => {
  const { captcha } = req.body
  params.item = {
    email: req.body.email,
    confirmed: false,
  }
  try {
    // Validate re:CAPTCHA
    const valid = await isValid(captcha)
    if (!valid) return res.sendStatus(403)
    // Add email to SNS/SES/DDB
    const result = await dynamodb.put(params).promise()
    return res.sendStatus(200)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

export default routes
