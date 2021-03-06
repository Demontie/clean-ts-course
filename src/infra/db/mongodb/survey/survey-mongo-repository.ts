import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyParams, AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository, SurveyModel } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async loadAll (): Promise<SurveyModel[]> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveysCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async add (data: AddSurveyParams): Promise<void> {
    const surveryCollection = await MongoHelper.getCollection('surveys')
    await surveryCollection.insertOne(data)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveysCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
