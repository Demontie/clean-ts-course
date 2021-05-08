import { SurveyModel } from '@/data/usecases/load-surveys/db-load-surveys-protocols'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}