import { IRepository } from '../../@shared/repository/repository.interface'
import { ProductA } from '../entity/ProductA/product.entity'
import { ProductB } from '../entity/ProductB/product.entity'
import { IProduct } from '../interfaces/product.interface'

export interface IProductRepository extends IRepository<IProduct> {}
