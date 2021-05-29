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
    const loadResultData = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!loadResultData) {
      await this.loadSurveyByIdRepository.loadById(surveyId)
    }
    return loadResultData
  }
}
