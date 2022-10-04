import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'

import {
  IFindCustomerDtoInput,
  IFindCustomerDtoOutput
} from './dto/find-customer.dto'
import { FindCustomerUseCase } from './find-customer.use-case'

const address = {
  street: 'Street 1',
  number: 1,
  city: 'City',
  zip: '10000-001'
}

const customer = CustomerFactory.createWithAddress(
  'Customer 1',
  new Address(address.street, address.number, address.city, address.zip)
)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Find customer use case unit test', () => {
  it('should be able to find customer by id', async () => {
    const customerRepository = MockRepository()

    const useCase = new FindCustomerUseCase(customerRepository)

    await customerRepository.create(customer)

    const input: IFindCustomerDtoInput = {
      id: customer.id
    }

    const output: IFindCustomerDtoOutput = {
      id: customer.id,
      name: customer.name,
      address: {
        street: address.street,
        number: address.number,
        city: address.city,
        zip: address.zip
      }
    }

    const findCustomer = await useCase.execute(input)

    expect(findCustomer).toEqual(output)
  })

  it('should not find a customer by id', async () => {
    const customerRepository = MockRepository()

    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found.')
    })

    const useCase = new FindCustomerUseCase(customerRepository)

    const input: IFindCustomerDtoInput = {
      id: customer.id
    }

    expect(() => useCase.execute(input)).rejects.toThrow('Customer not found.')
  })
})
