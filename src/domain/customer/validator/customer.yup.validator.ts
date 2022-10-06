import * as yup from 'yup'

import { IValidator } from '../../@shared/validator/validator.interface'
import { Customer } from '../entity/costumer.entity'

export class CustomerYupValidator implements IValidator<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required.'),
          name: yup.string().required('Name is required.')
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name
          },
          {
            abortEarly: false
          }
        )
    } catch (err) {
      const yupErrors = err as yup.ValidationError

      yupErrors.errors.forEach(error => {
        entity.notification.addError({
          context: 'customer',
          message: error
        })
      })
    }
  }
}
