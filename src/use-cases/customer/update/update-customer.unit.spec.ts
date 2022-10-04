import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'

import {
  IUpdateCostumerDtoInput,
  IUpdateCostumerDtoOutput
} from './dto/update-costumer.dto'
import { UpdateCustomerUseCase } from './update-customer.use-case'

describe('Update customer use case unit test', () => {
  const customer = CustomerFactory.createWithAddress(
    'Customer 1',
    new Address('Street 1', 1, 'City', '00000-000')
  )

  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  }

  it('should be able to update a customer', async () => {
    const customerRepository = MockRepository()

    const useCase = new UpdateCustomerUseCase(customerRepository)

    const input: IUpdateCostumerDtoInput = {
      id: customer.id,
      name: 'Customer 1 - UPDATED',
      address: {
        street: 'Street 1 - UPDATED',
        number: 2,
        city: 'City - UPDATED',
        zip: '00000-000 - UPDATED'
      }
    }

    const updateCustomer = await useCase.execute(input)

    const output: IUpdateCostumerDtoOutput = {
      id: customer.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }
    }

    expect(updateCustomer).toEqual(output)
  })
})
