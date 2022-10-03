import { v4 } from 'uuid'
import { Customer } from '../../../domain/customer/entity/costumer.entity'
import { Address } from '../../../domain/customer/object-values/address/address.ov'
import { FindCustomerUseCase } from './find-customer.use-case'

const customer = {
  id: v4(),
  name: 'Customer 1'
}

const createCustomer = new Customer(customer.id, customer.name)

const customerAddress = {
  street: 'Street 1',
  number: 1,
  city: 'City',
  zip: '00000-000'
}

const address = new Address(
  customerAddress.street,
  customerAddress.number,
  customerAddress.city,
  customerAddress.zip
)

createCustomer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(createCustomer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Find customer use case unit test', () => {
  it('should be able to find customer by id', async () => {
    const customerRepository = MockRepository()

    const useCase = new FindCustomerUseCase(customerRepository)

    await customerRepository.create(createCustomer)

    const input = {
      id: customer.id
    }

    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: address.street,
        number: address.number,
        city: address.city,
        zip: address.zip
      }
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })

  it('should not find a customer by id', async () => {
    const customerRepository = MockRepository()

    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found.')
    })

    const useCase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: customer.id
    }

    expect(() => useCase.execute(input)).rejects.toThrow('Customer not found.')
  })
})
