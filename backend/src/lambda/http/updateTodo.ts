import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import 'source-map-support/register'
import { parseUserId } from '../../auth/utils'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'


const docClient = new AWS.DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const todosTable = process.env.TODOS_TABLE

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object

  const authHeader = event.headers.Authorization
  const authSplit = authHeader.split(" ")
  const token = authSplit[1]

  const newTodo = {
    todoId: todoId,
    userId: parseUserId(token),
    ...updatedTodo
  }

await docClient.put({
    TableName: todosTable,
    Item: newTodo
}).promise()

return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        newTodo
    })
}
}
