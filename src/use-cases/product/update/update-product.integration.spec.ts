import { Sequelize } from 'sequelize-typescript'

import { ProductFactory } from '../../../domain/product/factory/product.factory'

import { ProductSequelizeModel } from '../../../infra/core/product/sequelize/model/product.model'
import { ProductRepository } from '../../../infra/core/product/sequelize/repository/product.repository'

import {
  IUpdateProductDtoInput,
  IUpdateProductDtoOutput
} from './dto/update-product.dto'
import { UpdateProductUseCase } from './update-product.use-case'

describe('Update product use case integration test', () => {
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

  it('should be able to update a product', async () => {
    const productRepository = new ProductRepository()

    const product = ProductFactory.create('A', 'Product 1', 5)

    await productRepository.create(product)

    const useCase = new UpdateProductUseCase(productRepository)

    const input: IUpdateProductDtoInput = {
      id: product.id,
      name: 'Product 1 - UPDATED',
      price: 10
    }

    const updateProduct = await useCase.execute(input)

    const output: IUpdateProductDtoOutput = {
      id: product.id,
      name: input.name,
      price: input.price
    }

    expect(updateProduct).toEqual(output)
  })
})
