import { LoadSurveyById, SurveyModel } from './db-load-survey-by-id-protocols'
export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyById.loadById(id)
    return survey
  }
}
