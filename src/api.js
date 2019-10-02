import serverless from 'serverless-http';
import express from 'express';
import { version } from '../package.json';
import DynamoDB from 'aws-sdk/clients/dynamodb';

const app = express();
const dynamodb = new DynamoDB.DocumentClient();

/* Routes */
app.get('/version', (req, res) => res.json({ version }));
app.get('/comic-today', async (req, res) => {
    // Calculate current date in UTC
    const displayDate = new Date().toISOString().split('T')[0]
    // Query DynamoDB GSI for today's comic
    let params = {
        TableName: '',
        IndexName: '',
        KeyConditionExpression: "display_date = :dd",
        ExpressionAttributeValues: {
            ":dd": {
                S: displayDate
            }
        }
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
/*
app.post('/signup', (req, res) => {})
*/

export const handler = serverless(app);
