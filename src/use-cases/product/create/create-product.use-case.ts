import { ProductFactory } from '../../../domain/product/factory/product.factory'
import { IProductRepository } from '../../../domain/product/repository/product-repository.interface'
import { ICreateProductDtoInput } from './dto/create-product.dto'

export class CreateProductUseCase {
  private productRepository: IProductRepository

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(input: ICreateProductDtoInput) {
    const product = ProductFactory.create(input.type, input.name, input.price)

    await this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
