import { ProductFactory } from './product.factory'

describe('Product factory unit test', () => {
  it('should create a product type A', () => {
    const product = ProductFactory.create('A', 'Product 1', 5)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(5)
    expect(product.constructor.name).toBe('ProductA')
  })

  it('should create a product type B', () => {
    const product = ProductFactory.create('B', 'Product 1', 5)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(10)
    expect(product.constructor.name).toBe('ProductB')
  })

  it('should throw an error when product type is not supported', () => {
    expect(() => ProductFactory.create('XPTO', 'Product 1', 5)).toThrowError(
      'Product type XPTO not supported.'
    )
  })
})
