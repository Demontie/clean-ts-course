import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from './db-load-account-by-token-protocols'
const makeDecrypter = (): Decrypter => {
  class DcrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DcrypterStub()
}
interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}
const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}
describe('DbLoadAccountByToken Usecase', () => {
  test('Shoul call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decrypterSpy).toHaveBeenLastCalledWith('any_token')
  })
})
