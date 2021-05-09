import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'
// import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

let surveyResultColletions: Collection
let surveyColletions: Collection
let accountColletions: Collection

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyColletions.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      },
      {
        answer: 'other_answer'
      }
    ],
    date: new Date()
  })
  return res.ops[0]
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountColletions.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  return res.ops[0]
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyColletions = await MongoHelper.getColletion('surveys')
    await surveyColletions.deleteMany({})
    surveyResultColletions = await MongoHelper.getColletion('surveyResults')
    await surveyResultColletions.deleteMany({})
    accountColletions = await MongoHelper.getColletion('accounts')
    await accountColletions.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      const surveyResult = await sut.save({
        accountId: account.id,
        answer: survey.answers[0].answer,
        surveyId: survey.id,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })
})
