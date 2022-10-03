import { CreateProductUseCase } from './create-product.use-case'
import { ICreateProductDtoInput } from './dto/create-product.dto'

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Create product use case unit test', () => {
  it('should be able to create product', async () => {
    const input: ICreateProductDtoInput = {
      type: 'A',
      name: 'Product 1',
      price: 5
    }

    const productRepository = MockRepository()

    const useCase = new CreateProductUseCase(productRepository)

    await productRepository.create(input)

    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it('should throw an error when price is less than 0', async () => {
    const input: ICreateProductDtoInput = {
      type: 'A',
      name: 'Product 1',
      price: -1
    }

    const productRepository = MockRepository()

    const useCase = new CreateProductUseCase(productRepository)

    await expect(useCase.execute(input)).rejects.toThrow(
      'Price must be greater than zero.'
    )
  })

  it('should throw an error when name is missing', async () => {
    const input: ICreateProductDtoInput = {
      type: 'A',
      name: '',
      price: 5
    }

    const productRepository = MockRepository()

    const useCase = new CreateProductUseCase(productRepository)

    await expect(useCase.execute(input)).rejects.toThrow('Name is required.')
  })
})
