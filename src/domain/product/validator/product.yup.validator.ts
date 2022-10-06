import * as yup from 'yup'

import { IValidator } from '../../@shared/validator/validator.interface'
import { IProduct } from '../interfaces/product.interface'

export class ProductYupValidator implements IValidator<IProduct> {
  validate(entity: IProduct): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required.'),
          name: yup.string().required('Name is required.'),
          price: yup
            .number()
            .min(0, 'Price must be greater than zero.')
            .required('Proce is required.')
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price
          },
          {
            abortEarly: false
          }
        )
    } catch (err) {
      const yupErrors = err as yup.ValidationError

      yupErrors.errors.forEach(error => {
        entity.notification.addError({
          context: 'product',
          message: error
        })
      })
    }
  }
}
