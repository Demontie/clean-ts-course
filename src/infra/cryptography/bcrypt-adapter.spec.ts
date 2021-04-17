import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Shold call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hasSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hasSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
