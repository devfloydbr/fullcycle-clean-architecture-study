import { CreateCustomerUseCase } from './create-customer.use-case'
import {
  ICreateCustomerDtoInput,
  ICreateCustomerDtoOutput
} from './dto/create-customer.dto'

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
    const input: ICreateCustomerDtoInput = {
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

    const createCustomer = await useCase.execute(input)

    const output: ICreateCustomerDtoOutput = {
      id: expect.any(String),
      name: input.name,
      address: input.address
    }

    expect(createCustomer).toEqual(output)
  })

  it('should throw an error when name is missing', async () => {
    const input: ICreateCustomerDtoInput = {
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
    const input: ICreateCustomerDtoInput = {
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
