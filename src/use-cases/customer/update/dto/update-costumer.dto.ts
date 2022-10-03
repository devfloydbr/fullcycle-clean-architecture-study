export interface IUpdateCostumerDtoInput {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zip: string
  }
}

export interface IUpdateCostumerDtoOutput {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zip: string
  }
}
