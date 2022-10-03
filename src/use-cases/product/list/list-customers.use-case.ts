import { IProduct } from '../../../domain/product/interfaces/product.interface'
import { IProductRepository } from '../../../domain/product/repository/product-repository.interface'
import {
  IListProductsDtoInput,
  IListProductsDtoOutput
} from './dto/list-product.dto'

export class ListProductsUseCase {
  private productRepository: IProductRepository

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(_: IListProductsDtoInput) {
    const products = await this.productRepository.findAll()

    return OutPutMapper.toOutput(products)
  }
}

class OutPutMapper {
  static toOutput(products: IProduct[]): IListProductsDtoOutput {
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}
