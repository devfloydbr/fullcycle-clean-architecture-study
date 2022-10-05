import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'

import { CustomerSequelizeModel } from '../../core/customer/sequelize/model/costumer.model'
import { ProductSequelizeModel } from '../../core/product/sequelize/model/product.model'
import { customersRouter } from './routes/customers.route'
import { productsRouter } from './routes/products.route'

export const app: Express = express()

app.use(express.json())
app.use('/customers', customersRouter)
app.use('/products', productsRouter)

export let sequelize: Sequelize

async function setupSequelize() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  sequelize.addModels([CustomerSequelizeModel, ProductSequelizeModel])

  await sequelize.sync()
}

setupSequelize()
