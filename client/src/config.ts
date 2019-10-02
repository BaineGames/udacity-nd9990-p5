// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'jt4hw65gh8'
export const apiEndpoint = `https://${apiId}.execute-api.us-west-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-rcrwdmsb.auth0.com',            // Auth0 domain
  clientId: 'WLEug2J4NkBpWPE1m8P8WWxan7ZzTYC2',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
