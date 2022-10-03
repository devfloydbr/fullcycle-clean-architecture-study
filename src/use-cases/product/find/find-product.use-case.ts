import { IProductRepository } from '../../../domain/product/repository/product-repository.interface'
import { IFindProductDtoInput } from './dto/find-product.dto'

export class FindProductUseCase {
  private productRepository: IProductRepository

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(input: IFindProductDtoInput) {
    const product = await this.productRepository.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
