import { Address } from '../../../domain/customer/object-values/address/address.ov'
import { ICostumerRepository } from '../../../domain/customer/repository/customer-repository.interface'

import {
  IUpdateCostumerDtoInput,
  IUpdateCostumerDtoOutput
} from './dto/update-costumer.dto'

export class UpdateCustomerUseCase {
  private customerRepository: ICostumerRepository

  constructor(customerRepository: ICostumerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(
    input: IUpdateCostumerDtoInput
  ): Promise<IUpdateCostumerDtoOutput> {
    const customer = await this.customerRepository.find(input.id)

    customer.changeName(input.name)

    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zip
      )
    )

    await this.customerRepository.update(customer)

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
