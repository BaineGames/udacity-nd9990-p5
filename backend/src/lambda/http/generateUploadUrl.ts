import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import 'source-map-support/register'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const bucket = process.env.S3_BUCKET
  const url_exp = process.env.SIGNED_URL_EXPIRATION

  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

  const url = await s3.getSignedUrl('putObject',{
    Bucket: bucket,
    Key: todoId,
    Expires: url_exp
  })

  return {
      statusCode: 201,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
          url
      })
  }
}
