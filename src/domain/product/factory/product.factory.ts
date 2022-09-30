import { v4 } from 'uuid'
import { ProductA } from '../entity/ProductA/product.entity'
import { ProductB } from '../entity/ProductB/product.entity'

export class ProductFactory {
  public static create(type: string, name: string, price: number) {
    switch (type) {
      case 'A':
        return new ProductA(v4(), name, price)
      case 'B':
        return new ProductB(v4(), name, price)
      default:
        throw new Error(`Product type ${type} not supported.`)
    }
  }
}
