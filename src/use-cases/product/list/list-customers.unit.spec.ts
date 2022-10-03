import { ProductFactory } from '../../../domain/product/factory/product.factory'
import { ListProductsUseCase } from './list-customers.use-case'

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

describe('List products use case unit test', () => {
  it('should be able to list products', async () => {
    const productRepository = MockRepository()

    const useCase = new ListProductsUseCase(productRepository)

    const output = await useCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })
})
