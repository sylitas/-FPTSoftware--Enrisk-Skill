# Deployment Guideline

## Description

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)
ShoppingTime is a web application, created by [sylitas](https://sylitas.herokuapp.com/), hosted at AWS Cloud Services. Google Chrome (Version 106.0.5249.119) compatible.

## Libraries

### 1 - Dependencies

- [_serverless-http_](https://www.npmjs.com/package/serverless-http) - The framework for building AWS Cloudformation.
- [_express_](https://www.npmjs.com/package/express) - The framework for receiving RESTful API from API Gateway.
- [_webpack_](https://www.npmjs.com/package/webpack) - For bundling the code (ES6 to CJS).
- [_ajv_,_ajv-errors_](https://www.npmjs.com/package/ajv) - For validating request using schema.
- [_apidoc_](https://www.npmjs.com/package/apidoc) - For generating api documentation.
- [_aws-sdk_](https://www.npmjs.com/package/aws-sdk) - using AWS's features.
- [_babel-loader_](https://www.npmjs.com/package/babel-loader) - transpiling JavaScript.
- [_cors_](https://www.npmjs.com/package/cors) - providing a Connect/Express middleware that can be used to enable CORS.
- [_uuid_](https://www.npmjs.com/package/uuid) - generating randomly string.
- [_yaml-cfn_](https://www.npmjs.com/package/yaml-cfn) - parsing .yaml files.

### 2 - Development Dependencies

- [_@babel/eslint-parser_,_babel-eslint_]() format transpiling code with rules
- [_eslint-config-airbnb_]() rule for formating code
- [_nodemon_]() automatically rebuild code when something change
- [_serverless-offline_]() run code locally using serverless
- [_webpack-cli_]() CLI for webpack

## Features

### 1 - Management accounts

- Register for users (Email welcome when created)
- Login for user
- Forgot password (Email with code to confirm the new password)
- Get user account detail
- Change user account password

### 2 - Management products

- Create new product
- Update product information
- Delete a product
- Get product information

### 3 - Management orders

- Create new order
- Update product information
- Delete a product
- Get product information
  > :warning: WARNING: Each customer has only one pending order at the current time, after paid the order, customer can create a new one.

## Technique

The ShoppingTime uses several open-source projects and some services of AWS to work completely:

- [_Cognito_]() - Verify users in/out the application
- [_DynamoDB_]() - Dynamo NoSQL Database for storing data
- [_Cloudformation_]() - Build all the usage services at AWS
- [_SES_]() - Sending Email
- [_IAM_]() - Manage roles of services
- [_CloudWatch_]() - Logging for debugging
- [_Lambda_]() - Run the code
- [_S3_]() - Store the code as a zip file
- [_APIGateway_]() - Defined routers for triggering

## Installation

> If you want to own this web application, you need a serverless account to access it, Please contact me ([_Sylitas_](https://sylitas.herokuapp.com/)) for more detail.
> ShoppingTime requires [Node.js](https://nodejs.org/) v12+ to run. Make sure you install Node first.
> First thing first, you need to clone the repository,

```properties
$ git clone https://github.com/sylitas/-FPTSoftware--Enrisk-Skill.git
```

After that, you will have to install all libraries (dependencies) by running this command below,

```properties
$ cd ./-FPTSoftware--Enrisk-Skill/project03
$ npm install #or npm i
```

## Run

Run the command below to start application locally

```properties
$ npm run start
```

Run the command below for generating documentation

```properties
$ npm run build:docs
```

You can access locally documentation at

```properties
$ ./documentation/index.html
```

## Deployment

An application needs an AWS account credential for deployment, please contact [_Sylitas_](https://sylitas.herokuapp.com/) for more detail.
For setting up your configuration at C:/users/<YOUR-COMPUTER-NAME>/.aws/credential or use

```properties
$ aws configure
```

After that for deploying source code

```properties
$ npm run deploy
```

For deploying the API documentation

```properties
$ npm run deploy:docs
```

## Contributor

### Nguyễn Tuấn Duy ([_Sylitas_](https://sylitas.herokuapp.com/) )

## License

MIT
