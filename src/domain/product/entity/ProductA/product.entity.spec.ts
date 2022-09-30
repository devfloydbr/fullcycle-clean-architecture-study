import { ProductA } from './product.entity'

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new ProductA('', 'Product 1', 5)
    }).toThrowError('ID is required.')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new ProductA('1', '', 5)
    }).toThrowError('Name is required.')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new ProductA('1', 'Product 1', -1)
    }).toThrowError('Price must be greater than zero.')
  })

  it('should change name', () => {
    const product = new ProductA('1', 'Product 1', 5)
    product.changeName('Product 2')

    expect(product.name).toBe('Product 2')
  })

  it('should change price', () => {
    const product = new ProductA('1', 'Product 1', 5)
    product.changePrice(150)

    expect(product.price).toBe(150)
  })
})
