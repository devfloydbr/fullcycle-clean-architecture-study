import request from 'supertest'
import { app, sequelize } from '../express'

describe('Customer e2e test', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should be able to create a costumer', async () => {
    const response = await request(app).post('/customers').send({})
  })
})
