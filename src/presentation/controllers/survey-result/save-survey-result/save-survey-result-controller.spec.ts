import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest } from './save-survey-result-controller-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/erros'
import { throwError } from '@/domain/test'
import { SaveSurveyResultSpy, LoadSurveyByIdSpy } from '@/presentation/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (answer: string = null): HttpRequest => ({
  params: {
    surveyId: faker.datatype.uuid()
  },
  body: {
    answer
  },
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const sut = new SaveSurveyResultController(loadSurveyByIdSpy, saveSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
    saveSurveyResultSpy
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveyByIdSpy.id).toBe(httpRequest.params.surveyId)
  })

  test('Should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    loadSurveyByIdSpy.surveyModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    await sut.handle(httpRequest)
    expect(saveSurveyResultSpy.saveSurveyResultParams).toEqual({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.accountId,
      date: new Date(),
      answer: httpRequest.body.answer
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockImplementationOnce(throwError)
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(saveSurveyResultSpy.surveyResultModel))
  })
})
