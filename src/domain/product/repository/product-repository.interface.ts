import { IRepository } from '../../@shared/repository/repository.interface'
import { ProductA } from '../entity/ProductA/product.entity'

export interface IProductRepository extends IRepository<ProductA> {}
