import express from 'express'
import setubMiddlewares from './middlewares'

const app = express()
setubMiddlewares(app)

export default app
