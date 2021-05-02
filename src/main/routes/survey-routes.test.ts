import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let surveyColletions: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyColletions = await MongoHelper.getColletion('surveys')
    await surveyColletions.deleteMany({})
    accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'https://criticalhits.b-cdn.net/wp-content/uploads/2021/04/20210329-demon-slayer-mugen-train-movie-910x512.jpeg.webp'
          },
          {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Demontie',
        email: 'demontiecosta17@gmail.com',
        password: '123456',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'https://criticalhits.b-cdn.net/wp-content/uploads/2021/04/20210329-demon-slayer-mugen-train-movie-910x512.jpeg.webp'
          },
          {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
  })
})
