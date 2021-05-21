export type SurveyResultModel = {
  surveyId: string
  question: string
  answers: SurveyAnswersModel[]
  date: Date
}

type SurveyAnswersModel = {
  image?: string
  answer: string
  count: number
  percent: number
}
