import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'
import { ListCustomersUseCase } from './list-customers.use-case'

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
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('List customers use case unit test', () => {
  it('should be able to list customers', async () => {
    const customerRepository = MockRepository()

    const useCase = new ListCustomersUseCase(customerRepository)

    const output = await useCase.execute({})

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
  })
})
