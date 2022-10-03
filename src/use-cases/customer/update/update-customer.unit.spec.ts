import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'
import { UpdateCustomerUseCase } from './update-customer.use-case'

const createCustomer = CustomerFactory.createWithAddress(
  'Customer 1',
  new Address('Street 1', 1, 'City', '00000-000')
)

const input = {
  id: createCustomer.id,
  name: 'Customer 1 - UPDATED',
  address: {
    street: 'Street 1 - UPDATED',
    number: 2,
    city: 'City - UPDATED',
    zip: '00000-000 - UPDATED'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(createCustomer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Update customer use case unit test', () => {
  it('should be able to update a customer', async () => {
    const customerRepository = MockRepository()

    const useCase = new UpdateCustomerUseCase(customerRepository)

    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })
})
