import { Entity } from '../../@shared/entity/entity.abstract'

export interface IProduct extends Entity {
  get id(): string
  get name(): string
  get price(): number
  changeName(name: string): void
  changePrice(price: number): void
}
