import { ProductFactory } from '../../../domain/product/factory/product.factory'
import { UpdateProductUseCase } from './update-product.use-case'

const createProduct = ProductFactory.create('A', 'Product 1', 5)

const input = {
  id: createProduct.id,
  name: 'Product 1 - UPDATED',
  price: 10
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(createProduct)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Update product use case unit test', () => {
  it('should be able to update a product', async () => {
    const productRepository = MockRepository()

    const useCase = new UpdateProductUseCase(productRepository)

    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })
})
