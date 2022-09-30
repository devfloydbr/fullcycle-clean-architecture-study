import { Address } from '../object-values/address/address.ov'
import { CustomerFactory } from './customer.factory'

describe('Customer factory unit test', () => {
  it('should create a customer without an address', () => {
    const customer = CustomerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const address = new Address('Street 1', 1, 'City', '00000-000')
    const customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toMatchObject(address)
  })
})
