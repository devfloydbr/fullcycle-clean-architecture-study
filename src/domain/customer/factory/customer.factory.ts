import { v4 } from 'uuid'
import { Customer } from '../entity/costumer.entity'
import { Address } from '../object-values/address/address.ov'

export class CustomerFactory {
  public static create(name: string) {
    return new Customer(v4(), name)
  }

  public static createWithAddress(name: string, address: Address) {
    const costumer = new Customer(v4(), name)
    costumer.changeAddress(address)
    return costumer
  }
}
