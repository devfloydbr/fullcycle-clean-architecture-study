import { Sequelize } from 'sequelize-typescript'

import { ProductFactory } from '../../../domain/product/factory/product.factory'

import { ProductSequelizeModel } from '../../../infra/core/product/sequelize/model/product.model'
import { ProductRepository } from '../../../infra/core/product/sequelize/repository/product.repository'

import {
  IFindProductDtoInput,
  IFindProductDtoOutput
} from './dto/find-product.dto'
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

    const product = ProductFactory.create('A', 'Product 1', 5)

    await productRepository.create(product)

    const input: IFindProductDtoInput = {
      id: product.id
    }

    const createProduct = await useCase.execute(input)

    const output: IFindProductDtoOutput = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    expect(createProduct).toEqual(output)
  })
})
