import DynamoDB from 'aws-sdk/clients/dynamodb'
import { Router } from 'express'

const routes = new Router()
const dynamodb = new DynamoDB.DocumentClient()

routes.get('/today', async (req, res) => {
  // TODO: Add support for user providing their timezone so user experience is more straightforward?
  // Calculate current date in UTC
  const displayDate = new Date().toISOString().split('T')[0]
  // Query DynamoDB GSI for today's comic
  const params = {
    TableName: process.env.peanutsDDBTable,
    IndexName: process.env.peanutsDDBTableDateGSI,
    KeyConditionExpression: "display_date = :dd",
    ExpressionAttributeValues: {
      ":dd": displayDate,
    },
  }
  try {
    // Get Data
    const data = await dynamodb.query(params).promise()
    return data.Items.length > 0 ? res.json(data.Items[0]) : res.sendStatus(404)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

export default routes
