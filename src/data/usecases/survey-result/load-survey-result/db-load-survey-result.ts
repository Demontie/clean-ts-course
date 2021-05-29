import {
  LoadSurveyResultRepository,
  SurveyResultModel,
  LoadSurveyResult,
  LoadSurveyByIdRepository
} from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    let surveyResultModel = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResultModel) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResultModel = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => Object.assign({}, answer, {
          count: 0,
          percent: 0
        }))
      }
    }
    return surveyResultModel
  }
}
