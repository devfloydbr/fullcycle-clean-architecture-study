import { IValidator } from '../../@shared/validator/validator.interface'
import { Customer } from '../entity/costumer.entity'
import { CustomerYupValidator } from '../validator/customer.yup.validator'

export class CustomerValidatorFactory {
  static create(): IValidator<Customer> {
    return new CustomerYupValidator()
  }
}
