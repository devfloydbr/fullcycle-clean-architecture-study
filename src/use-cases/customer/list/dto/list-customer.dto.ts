type Customer = {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zip: string
  }
}

export interface IListCustomerDtoInput {}

export interface IListCustomerDtoOutput {
  customers: Customer[]
}
