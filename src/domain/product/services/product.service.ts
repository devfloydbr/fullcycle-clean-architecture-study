import { ProductA } from '../entity/ProductA/product.entity'

export class ProductService {
  static increasePrice(products: ProductA[], percentage: number) {
    products.forEach(product =>
      product.changePrice((product.price * percentage) / 100 + product.price)
    )

    return products
  }
}
