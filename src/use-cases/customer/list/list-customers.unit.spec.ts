import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'

import { IListCustomerDtoOutput } from './dto/list-customer.dto'
import { ListCustomersUseCase } from './list-customers.use-case'

describe('List customers use case unit test', () => {
  const customer1 = CustomerFactory.createWithAddress(
    'Customer 1',
    new Address('Street 1', 1, 'City', '10000-001')
  )

  const customer2 = CustomerFactory.createWithAddress(
    'Customer 2',
    new Address('Street 2', 1, 'City', '00000-002')
  )

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest
        .fn()
        .mockReturnValue(Promise.resolve([customer1, customer2])),
      create: jest.fn(),
      update: jest.fn()
    }
  }

  it('should be able to list customers', async () => {
    const customerRepository = MockRepository()

    const useCase = new ListCustomersUseCase(customerRepository)

    const findAllCustomers = await useCase.execute({})

    const output: IListCustomerDtoOutput = {
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            city: customer1.address.city,
            zip: customer1.address.zip
          }
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            city: customer2.address.city,
            zip: customer2.address.zip
          }
        }
      ]
    }

    expect(findAllCustomers.customers.length).toBe(2)
    expect(findAllCustomers).toEqual(output)
  })
})
