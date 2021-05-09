import { MongoHelper } from '../helpers/mongo-helper'
import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/save-survey-result/db-save-survey-result-protocols'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveryResultCollection = await MongoHelper.getColletion('surveyResults')
    const res = await surveryResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return res.value && MongoHelper.map(res.value)
  }
}
