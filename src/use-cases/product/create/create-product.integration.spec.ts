import { Sequelize } from 'sequelize-typescript'

import { ProductSequelizeModel } from '../../../infra/product/sequelize/model/product.model'
import { ProductRepository } from '../../../infra/product/sequelize/repository/product.repository'

import { CreateProductUseCase } from './create-product.use-case'
import {
  ICreateProductDtoInput,
  ICreateProductDtoOutput
} from './dto/create-product.dto'

describe('Create product use case integration test', () => {
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

  it('should be able to create a customer', async () => {
    const productRepository = new ProductRepository()

    const useCase = new CreateProductUseCase(productRepository)

    const input: ICreateProductDtoInput = {
      type: 'A',
      name: 'Product 1',
      price: 5
    }

    const createProduct = await useCase.execute(input)

    const output: ICreateProductDtoOutput = {
      id: expect.any(String),
      name: input.name,
      price: input.price
    }

    expect(createProduct).toEqual(output)
  })
})
