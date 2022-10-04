import { Sequelize } from 'sequelize-typescript'

import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'

import { CustomerSequelizeModel } from '../../../infra/core/customer/sequelize/model/costumer.model'
import { CustomerRepository } from '../../../infra/core/customer/sequelize/repository/customer.repository'

import {
  IFindCustomerDtoInput,
  IFindCustomerDtoOutput
} from './dto/find-customer.dto'
import { FindCustomerUseCase } from './find-customer.use-case'

describe('Find customer use case integration test', () => {
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

  it('should be able to find customer by id', async () => {
    const customerRepository = new CustomerRepository()

    const customer = CustomerFactory.createWithAddress(
      'Customer 1',
      new Address('Street 1', 1, 'City', '10000-001')
    )

    await customerRepository.create(customer)

    const useCase = new FindCustomerUseCase(customerRepository)

    const input: IFindCustomerDtoInput = {
      id: customer.id
    }

    const findCustomer = await useCase.execute(input)

    const output: IFindCustomerDtoOutput = {
      id: customer.id,
      name: findCustomer.name,
      address: findCustomer.address
    }

    expect(findCustomer).toEqual(output)
  })
})
