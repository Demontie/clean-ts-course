import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountColletions: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountColletions = await MongoHelper.getColletion('accounts')
    await accountColletions.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Demontie',
          email: 'demontiecosta17@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123456', 12)
      await accountColletions.insertOne({
        name: 'Demontie',
        email: 'demontiecosta17@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'demontiecosta17@gmail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'demontiecosta17@gmail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
