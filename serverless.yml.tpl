app: typescript-serverless
service: typescript-serverless

provider:
  name: aws
  runtime: nodejs20.x
  region: eu-central-1

plugins:
  - serverless-offline
  - serverless-ignore

custom:
  serverless-offline:
    httpPort: 4000

functions:
  helloWorld:
    handler: dist/handler.helloWorld
    runtime: nodejs20.x
    timeout: 29
    environment:
      ENVIRONMENT: ${sls:stage}
    events:
      - http:
          path: /api/hello-world
          method: post
          cors: true
