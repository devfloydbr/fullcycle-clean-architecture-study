export interface ICreateProductDtoInput {
  type: 'A' | 'B'
  name: string
  price: number
}

export interface ICreateProductDtoOutput {
  id: string
  name: string
  price: number
}
