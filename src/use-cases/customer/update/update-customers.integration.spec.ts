import { Sequelize } from 'sequelize-typescript'

import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'

import { CustomerSequelizeModel } from '../../../infra/core/customer/sequelize/model/costumer.model'
import { CustomerRepository } from '../../../infra/core/customer/sequelize/repository/customer.repository'

import {
  IUpdateCostumerDtoInput,
  IUpdateCostumerDtoOutput
} from './dto/update-costumer.dto'
import { UpdateCustomerUseCase } from './update-customer.use-case'

describe('List customers use case integration test', () => {
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

  it('should be able to update a customer', async () => {
    const customerRepository = new CustomerRepository()

    const customer = CustomerFactory.createWithAddress(
      'Customer 1',
      new Address('Street 1', 1, 'City', '00000-000')
    )

    await customerRepository.create(customer)

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
