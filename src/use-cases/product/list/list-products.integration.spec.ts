import { Sequelize } from 'sequelize-typescript'

import { ProductFactory } from '../../../domain/product/factory/product.factory'

import { ProductSequelizeModel } from '../../../infra/core/product/sequelize/model/product.model'
import { ProductRepository } from '../../../infra/core/product/sequelize/repository/product.repository'

import { IListProductsDtoOutput } from './dto/list-product.dto'
import { ListProductsUseCase } from './list-products.use-case'

describe('List products use case integration test', () => {
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

  it('should be able to list products', async () => {
    const productRepository = new ProductRepository()

    const product1 = ProductFactory.create('A', 'Product 1', 5)

    const product2 = ProductFactory.create('B', 'Product 2', 10)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const useCase = new ListProductsUseCase(productRepository)

    const findAllProducts = await useCase.execute({})

    const output: IListProductsDtoOutput = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price
        }
      ]
    }

    expect(findAllProducts.products.length).toBe(2)
    expect(findAllProducts).toEqual(output)
  })
})
