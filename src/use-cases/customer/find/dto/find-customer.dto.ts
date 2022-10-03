export interface IFindCustomerDtoInput {
  id: string
}

export interface IFindCustomerDtoOutput {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zip: string
  }
}
