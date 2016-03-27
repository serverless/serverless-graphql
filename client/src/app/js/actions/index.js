// TODO: Set `API_URL` to your api/stage endpoint eg. https://{{API_ID}}.execute-api.us-east-1.amazonaws.com/{{STAGE_NAME}}
// run `aws apigateway get-rest-apis` to get a list of your apis and their ids, and use the stage name you specified when setting up the project
// alternatively, use your custom domain if you have set one up
export const API_URL = '';

if (!API_URL) {
    console.error('Set `API_URL` in `client/src/app/js/actions/index.js` to your stage endpoint')
}