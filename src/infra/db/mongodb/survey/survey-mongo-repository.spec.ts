import { SurveyMongoRepository } from './survey-mongo-repository'
import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

const makeFakeAddSurveyModel = (): AddSurveyModel => ({
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

let surveyColletions: Collection

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
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('Should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeAddSurveyModel())
    const survey = await surveyColletions.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
