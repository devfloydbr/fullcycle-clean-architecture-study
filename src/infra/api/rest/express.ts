import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { CustomerSequelizeModel } from '../../customer/sequelize/model/costumer.model'
import { ProductSequelizeModel } from '../../product/sequelize/model/product.model'

export const app: Express = express()

app.use(express.json())

export let sequelize: Sequelize

async function setupSequelize() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
  })

  sequelize.addModels([CustomerSequelizeModel, ProductSequelizeModel])

  await sequelize.sync()
}

setupSequelize()
