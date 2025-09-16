# serverless-ts-template

A minimal **AWS Lambda + TypeScript + Serverless Framework** starter kit.  
This project provides a working baseline for building serverless APIs with:

- **TypeScript** for type safety
- **Serverless Framework** for deployments
- **CORS preflight support**
- **Bearer token authentication**
- **Simple body validation helpers**

---

## Features

- ⚡️ **Hello World Lambda** deployed via API Gateway  
- 🛡 **Authentication** using a Bearer token from `process.env.BEARER_TOKEN`  
- 🌍 **CORS handling** with `OPTIONS` preflight responses  
- ✅ **Body validation** with helper utilities (ready for Zod schemas)  
- 🏗 **Multiple stages**: `develop`, `staging`, `production`  
- 🛠 **Makefile commands** for setup, build, and deployment  
- 🔌 **Local development** with `serverless-offline`

---

## Project structure

```
.
├── src/
│   └── handler.ts         # Lambda handler + helpers
├── dist/                  # Transpiled output (created by build step)
├── serverless.yml.tpl     # Serverless Framework config template
├── Makefile               # Setup and deployment tasks
├── package.json
└── tsconfig.json
```

---

## Getting started

### 1. Install dependencies
```bash
npm install
```

### 2. Build the project
```bash
make transpile
```

### 3. Run locally
Start the API on port **4000**:
```bash
make serverless-offline
```

The endpoint will be available at:
```
POST http://localhost:4000/api/hello-world
```

---

## Authentication

All requests must include a valid **Bearer token** in the `Authorization` header.  
Set your token as an environment variable:

```bash
export BEARER_TOKEN=my-secret-token
```

Example request:
```bash
curl -X POST http://localhost:4000/api/hello-world   -H "Content-Type: application/json"   -H "Authorization: Bearer my-secret-token"   -d '{"example":"data"}'
```

---

## Deployment

This project uses [Serverless Framework](https://www.serverless.com/).

### Configure AWS
```bash
make aws-configure
```

### Deploy to environments
- **Develop**
  ```bash
  make serverless-deploy-develop
  ```
- **Staging**
  ```bash
  make serverless-deploy-staging
  ```
- **Production**
  ```bash
  make serverless-deploy-production
  ```

Deploy to all stages in one go:
```bash
make serverless-deploy-all
```

---

## Environment variables

| Variable       | Description                                      |
|----------------|--------------------------------------------------|
| `BEARER_TOKEN` | Required. Bearer token expected in requests.      |
| `ENVIRONMENT`  | Set automatically by Serverless (`develop`, etc). |

---

## License

MIT
