import { loginPath } from './paths'
import { badRequest, serverError, unauthorized, notFound } from './components'
import { accountShema, loginParamsShema, errorShema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean node API',
    description: 'API do curso do Mango para realizar enquetes',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
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
    loginParams: loginParamsShema,
    error: errorShema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
