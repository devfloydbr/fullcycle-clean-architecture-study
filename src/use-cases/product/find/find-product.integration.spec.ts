import { Sequelize } from 'sequelize-typescript'
import { v4 } from 'uuid'
import { Customer } from '../../../domain/customer/entity/costumer.entity'
import { Address } from '../../../domain/customer/object-values/address/address.ov'
import { ProductFactory } from '../../../domain/product/factory/product.factory'
import { ProductSequelizeModel } from '../../../infra/product/sequelize/model/product.model'
import { ProductRepository } from '../../../infra/product/sequelize/repository/product.repository'
import { FindProductUseCase } from './find-product.use-case'

describe('Find product use case integration test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductSequelizeModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should be able to find product by id', async () => {
    const productRepository = new ProductRepository()

    const useCase = new FindProductUseCase(productRepository)

    const createproduct = ProductFactory.create('A', 'Product 1', 5)

    await productRepository.create(createproduct)

    const input = {
      id: createproduct.id
    }

    const output = {
      id: createproduct.id,
      name: createproduct.name,
      price: createproduct.price
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
})
