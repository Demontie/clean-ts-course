import { InvalidParamError } from '../../presentation/erros'
import { Validation } from '../../presentation/protocols'
export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldTocompareName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldTocompareName]) {
      return new InvalidParamError(this.fieldTocompareName)
    }
  }
}
