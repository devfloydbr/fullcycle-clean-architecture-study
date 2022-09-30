import { ProductA } from '../entity/ProductA/product.entity'
import { ProductService } from './product.service'

describe('Product service unit tests', () => {
  it('should change price of all products', () => {
    const product1 = new ProductA('1', 'Product 1', 5)
    const product2 = new ProductA('2', 'Product 2', 20)

    const products = [product1, product2]

    ProductService.increasePrice(products, 100)

    expect(product1.price).toBe(10)
    expect(product2.price).toBe(40)
  })
})
