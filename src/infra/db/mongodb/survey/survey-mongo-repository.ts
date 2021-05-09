import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyModel, AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository, SurveyModel } from '@/data/usecases/add-survey/db-add-survey-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async loadAll (): Promise<SurveyModel[]> {
    const surveysCollection = await MongoHelper.getColletion('surveys')
    const surveys = await surveysCollection.find().toArray()
    return surveys
  }

  async add (data: AddSurveyModel): Promise<void> {
    const surveryCollection = await MongoHelper.getColletion('surveys')
    await surveryCollection.insertOne(data)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveysCollection = await MongoHelper.getColletion('surveys')
    const survey = await surveysCollection.findOne({ _id: id })
    return survey
  }
}
