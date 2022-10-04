import { ProductFactory } from '../../../domain/product/factory/product.factory'

import { IListProductsDtoOutput } from './dto/list-product.dto'
import { ListProductsUseCase } from './list-products.use-case'

describe('List products use case unit test', () => {
  const product1 = ProductFactory.create('A', 'Product 1', 5)

  const product2 = ProductFactory.create('B', 'Product 2', 10)

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
      create: jest.fn(),
      update: jest.fn()
    }
  }

  it('should be able to list products', async () => {
    const productRepository = MockRepository()

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
