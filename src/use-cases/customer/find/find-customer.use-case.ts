import { ICostumerRepository } from '../../../domain/customer/repository/customer-repository.interface'

import {
  IFindCustomerDtoInput,
  IFindCustomerDtoOutput
} from './dto/find-customer.dto'

export class FindCustomerUseCase {
  private customerRepository: ICostumerRepository

  constructor(customerRepository: ICostumerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(input: IFindCustomerDtoInput): Promise<IFindCustomerDtoOutput> {
    const customer = await this.customerRepository.find(input.id)

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
