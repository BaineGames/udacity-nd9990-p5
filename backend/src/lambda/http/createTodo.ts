import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import 'source-map-support/register'
import * as uuid from 'uuid'
import { parseUserId } from '../../auth/utils'

const docClient = new AWS.DynamoDB.DocumentClient()

const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("EVENT:", event);

    const todoId = uuid.v4()

    const parsedBody = JSON.parse(event.body)

    const authHeader = event.headers.Authorization
    const authSplit = authHeader.split(" ")
    const token = authSplit[1]

    console.log("test",token)

    const item = {
      todoId: todoId,
        userId: parseUserId(token),
        ...parsedBody
    }

    await docClient.put({
        TableName: todosTable,
        Item: item
    }).promise()

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          item
        })
    }
}