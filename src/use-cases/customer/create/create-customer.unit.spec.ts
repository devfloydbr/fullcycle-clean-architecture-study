import { CreateCustomerUseCase } from './create-customer.use-case'

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Create customer use case unit test', () => {
  it('should be able to create customer', async () => {
    const input = {
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 1,
        city: 'City',
        zip: '00000-000'
      }
    }

    const customerRepository = MockRepository()

    const useCase = new CreateCustomerUseCase(customerRepository)

    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }
    })
  })

  it('should throw an error when name is missing', async () => {
    const input = {
      name: '',
      address: {
        street: 'Street 1',
        number: 1,
        city: 'City',
        zip: '00000-000'
      }
    }

    const customerRepository = MockRepository()

    const useCase = new CreateCustomerUseCase(customerRepository)

    await expect(useCase.execute(input)).rejects.toThrow('Name is required.')
  })

  it('should throw an error when street is missing', async () => {
    const input = {
      name: 'Customer 1',
      address: {
        street: '',
        number: 1,
        city: 'City',
        zip: '00000-000'
      }
    }

    const customerRepository = MockRepository()

    const useCase = new CreateCustomerUseCase(customerRepository)

    await expect(useCase.execute(input)).rejects.toThrow('Street is required.')
  })
})
