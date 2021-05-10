import { Hasher } from '@/data/protocols/cryptography/hasher'
import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DcrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new DcrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashCompareStub implements HashComparer {
    async compare (password: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashCompareStub()
}
