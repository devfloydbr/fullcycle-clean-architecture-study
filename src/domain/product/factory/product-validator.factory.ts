import { IValidator } from '../../@shared/validator/validator.interface'
import { IProduct } from '../interfaces/product.interface'
import { ProductYupValidator } from '../validator/product.yup.validator'

export class ProductValidatorFactory {
  static create(): IValidator<IProduct> {
    return new ProductYupValidator()
  }
}
