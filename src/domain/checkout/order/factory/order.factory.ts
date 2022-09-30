import { OrderItem } from '../aggregates/order_item.aggregate'
import { Order } from '../entity/order.entity'

interface OrderFactoryProps {
  id: string
  customerId: string
  items: {
    id: string
    productId: string
    name: string
    quantity: number
    price: number
  }[]
}

export class OrderFactory {
  public static create(orderFactory: OrderFactoryProps) {
    const items = orderFactory.items.map(
      item =>
        new OrderItem(
          item.id,
          item.productId,
          item.name,
          item.price,
          item.quantity
        )
    )

    const order = new Order(orderFactory.id, orderFactory.customerId, items)

    return order
  }
}
