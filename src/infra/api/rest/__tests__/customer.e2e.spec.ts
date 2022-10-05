import request from 'supertest'

import {
  ICreateCustomerDtoInput,
  ICreateCustomerDtoOutput
} from '../../../../use-cases/customer/create/dto/create-customer.dto'
import { IListCustomersDtoOutput } from '../../../../use-cases/customer/list/dto/list-customer.dto'

import { app, sequelize } from '../express'

describe('Customer E2E test', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should be able to create a costumer', async () => {
    const customer: ICreateCustomerDtoInput = {
      name: 'Customer',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zip: '00000-000'
      }
    }

    const response = await request(app).post('/customers').send(customer)

    const output: ICreateCustomerDtoOutput = {
      id: expect.any(String),
      name: customer.name,
      address: customer.address
    }

    expect(response.status).toBe(200)
    expect(response.body).toEqual(output)
  })

  it('should throw an error when create a costumer whitohout valid request body', async () => {
    const customer = {
      name: 'Customer'
    }

    const response = await request(app).post('/customers').send(customer)

    expect(response.status).toBe(500)
  })

  it('should be able to list all customers', async () => {
    const customer1: ICreateCustomerDtoInput = {
      name: 'Customer',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zip: '00000-001'
      }
    }

    const customer2: ICreateCustomerDtoInput = {
      name: 'Customer 2',
      address: {
        street: 'Street 2',
        number: 1,
        city: 'City',
        zip: '00000-002'
      }
    }

    const createCustomer1Response = await request(app)
      .post('/customers')
      .send(customer1)

    expect(createCustomer1Response.status).toBe(200)

    const createCustomer2Response = await request(app)
      .post('/customers')
      .send(customer2)

    expect(createCustomer2Response.status).toBe(200)

    const listCustomersResponse = await request(app).get('/customers').send()

    const output: IListCustomersDtoOutput = {
      customers: [
        {
          id: createCustomer1Response.body.id,
          name: customer1.name,
          address: customer1.address
        },
        {
          id: createCustomer2Response.body.id,
          name: customer2.name,
          address: customer2.address
        }
      ]
    }

    expect(listCustomersResponse.status).toBe(200)
    expect(listCustomersResponse.body.customers.length).toBe(2)
    expect(listCustomersResponse.body).toEqual(output)
  })
})
