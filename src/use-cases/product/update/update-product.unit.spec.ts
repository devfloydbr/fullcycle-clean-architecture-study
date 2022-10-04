import { ProductFactory } from '../../../domain/product/factory/product.factory'

import {
  IUpdateProductDtoInput,
  IUpdateProductDtoOutput
} from './dto/update-product.dto'
import { UpdateProductUseCase } from './update-product.use-case'

describe('Update product use case unit test', () => {
  const product = ProductFactory.create('A', 'Product 1', 5)

  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  }
  it('should be able to update a product', async () => {
    const productRepository = MockRepository()

    const input: IUpdateProductDtoInput = {
      id: product.id,
      name: 'Product 1 - UPDATED',
      price: 10
    }

    const useCase = new UpdateProductUseCase(productRepository)

    const updateProduct = await useCase.execute(input)

    const output: IUpdateProductDtoOutput = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    expect(updateProduct).toEqual(output)
  })
})
