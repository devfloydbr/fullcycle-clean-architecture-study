import request from 'supertest'

import {
  ICreateProductDtoInput,
  ICreateProductDtoOutput
} from '../../../../use-cases/product/create/dto/create-product.dto'
import { IListProductsDtoOutput } from '../../../../use-cases/product/list/dto/list-product.dto'

import { app, sequelize } from '../express'

describe('Customer E2E test', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should be able to create a product', async () => {
    const product: ICreateProductDtoInput = {
      type: 'A',
      name: 'Product',
      price: 5
    }

    const response = await request(app).post('/products').send(product)

    const output: ICreateProductDtoOutput = {
      id: expect.any(String),
      name: product.name,
      price: product.price
    }

    expect(response.status).toBe(200)
    expect(response.body).toEqual(output)
  })

  it('should throw an error when create a product whitohout valid request body', async () => {
    const product = {
      name: 'Product'
    }

    const response = await request(app).post('/products').send(product)

    expect(response.status).toBe(500)
  })

  it('should be able to list all products', async () => {
    const product1: ICreateProductDtoInput = {
      type: 'A',
      name: 'Product 1',
      price: 5
    }

    const product2: ICreateProductDtoInput = {
      type: 'B',
      name: 'Product 2',
      price: 10
    }

    const createProduct1Response = await request(app)
      .post('/products')
      .send(product1)

    const createProduct2Response = await request(app)
      .post('/products')
      .send(product2)

    expect(createProduct1Response.status).toBe(200)
    expect(createProduct2Response.status).toBe(200)

    const listProductsResponse = await request(app).get('/products').send()

    const output: IListProductsDtoOutput = {
      products: [
        {
          id: createProduct1Response.body.id,
          name: product1.name,
          price: product1.price
        },
        {
          id: createProduct2Response.body.id,
          name: product2.name,
          price: product2.price * 2
        }
      ]
    }

    expect(listProductsResponse.status).toBe(200)
    expect(listProductsResponse.body.products.length).toBe(2)
    expect(listProductsResponse.body).toEqual(output)
  })
})
