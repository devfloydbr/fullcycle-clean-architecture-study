import { Sequelize } from 'sequelize-typescript'

import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/object-values/address/address.ov'

import { CustomerSequelizeModel } from '../../../infra/customer/sequelize/model/costumer.model'
import { CustomerRepository } from '../../../infra/customer/sequelize/repository/customer.repository'
import { IListCustomerDtoOutput } from './dto/list-customer.dto'

import { ListCustomersUseCase } from './list-customers.use-case'

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

  it('should be able to list customers', async () => {
    const customerRepository = new CustomerRepository()

    const customer1 = CustomerFactory.createWithAddress(
      'Customer 1',
      new Address('Street 1', 1, 'City', '10000-001')
    )

    const customer2 = CustomerFactory.createWithAddress(
      'Customer 2',
      new Address('Street 2', 1, 'City', '00000-002')
    )

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const listCustomerUseCase = new ListCustomersUseCase(customerRepository)

    const findAllCustomers = await listCustomerUseCase.execute({})

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
