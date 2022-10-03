export interface ICreateCustomerDtoInput {
  name: string
  address: {
    street: string
    number: number
    city: string
    zip: string
  }
}

export interface ICreateCustomerDtoOutput {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zip: string
  }
}
