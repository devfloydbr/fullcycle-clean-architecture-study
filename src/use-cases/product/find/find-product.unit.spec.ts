import { ProductFactory } from '../../../domain/product/factory/product.factory'
import { FindProductUseCase } from './find-product.use-case'

const createproduct = ProductFactory.create('A', 'Product 1', 5)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(createproduct)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Find product use case unit test', () => {
  it('should be able to find product by id', async () => {
    const productRepository = MockRepository()

    const useCase = new FindProductUseCase(productRepository)

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

  it('should not find a product by id', async () => {
    const productRepository = MockRepository()

    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found.')
    })

    const useCase = new FindProductUseCase(productRepository)

    const input = {
      id: createproduct.id
    }

    expect(() => useCase.execute(input)).rejects.toThrow('Product not found.')
  })
})
