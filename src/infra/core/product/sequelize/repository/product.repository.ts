import { ProductA } from '../../../../../domain/product/entity/ProductA/product.entity'
import { IProduct } from '../../../../../domain/product/interfaces/product.interface'
import { IProductRepository } from '../../../../../domain/product/repository/product-repository.interface'

import { ProductSequelizeModel } from '../model/product.model'

export class ProductRepository implements IProductRepository {
  async create(entity: IProduct) {
    await ProductSequelizeModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  async update(entity: IProduct) {
    await ProductSequelizeModel.update(
      {
        name: entity.name,
        price: entity.price
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }

  async find(id: string) {
    const product = await ProductSequelizeModel.findOne({
      where: {
        id
      }
    })

    return new ProductA(product.id, product.name, product.price)
  }

  async findAll() {
    const products = await ProductSequelizeModel.findAll()

    return products.map(
      product => new ProductA(product.id, product.name, product.price)
    )
  }
}
