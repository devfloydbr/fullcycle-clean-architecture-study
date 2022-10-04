import { IRepository } from '../../../@shared/repository/repository.interface'
import { Order } from '../entity/order.entity'

export interface IOrderRepository extends IRepository<Order> {}
