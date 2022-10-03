import { Sequelize } from 'sequelize-typescript'
import { v4 } from 'uuid'
import { Customer } from '../../../domain/customer/entity/costumer.entity'
import { Address } from '../../../domain/customer/object-values/address/address.ov'
import { CustomerSequelizeModel } from '../../../infra/customer/sequelize/model/costumer.model'
import { CustomerRepository } from '../../../infra/customer/sequelize/repository/customer.repository'
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

    const useCase = new FindCustomerUseCase(customerRepository)

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

    createCustomer.address = address

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
})
