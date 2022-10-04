import { Sequelize } from 'sequelize-typescript'

import { CustomerSequelizeModel } from '../../../infra/core/customer/sequelize/model/costumer.model'
import { CustomerRepository } from '../../../infra/core/customer/sequelize/repository/customer.repository'

import { CreateCustomerUseCase } from './create-customer.use-case'
import {
  ICreateCustomerDtoInput,
  ICreateCustomerDtoOutput
} from './dto/create-customer.dto'

describe('Create customer use case integration test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerSequelizeModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should be able to create a customer', async () => {
    const customerRepository = new CustomerRepository()

    const useCase = new CreateCustomerUseCase(customerRepository)

    const input: ICreateCustomerDtoInput = {
      name: 'Customer 1',
      address: { street: 'Street 1', number: 1, city: 'City', zip: '00000-000' }
    }

    const createCustomer = await useCase.execute(input)

    const output: ICreateCustomerDtoOutput = {
      id: expect.any(String),
      name: input.name,
      address: input.address
    }

    expect(createCustomer).toEqual(output)
  })
})
