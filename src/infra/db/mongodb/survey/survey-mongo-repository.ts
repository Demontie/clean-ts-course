import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (data: AddSurveyModel): Promise<void> {
    const surveryCollection = await MongoHelper.getColletion('surveys')
    await surveryCollection.insertOne(data)
  }
}
