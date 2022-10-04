import { v4 } from 'uuid'

import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'
import { ICostumerRepository } from '../../../domain/customer/repository/customer-repository.interface'
import { ICreateCustomerDtoInput } from './dto/create-customer.dto'

export class CreateCustomerUseCase {
  private customerRepository: ICostumerRepository

  constructor(customerRepository: ICostumerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(input: ICreateCustomerDtoInput) {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zip
      )
    )

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip
      }
    }
  }
}
