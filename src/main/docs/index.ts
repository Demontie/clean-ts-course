import { loginPath } from './paths/login-path'
import { accountShema } from './schemas/account-schema'
import { loginParamsShema } from './schemas/login-params-schema'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean node API',
    description: 'API do curso do Mango para realizar enquetes',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountShema,
    loginParams: loginParamsShema
  }
}
