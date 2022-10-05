import express, { Request, Response } from 'express'

import { CreateProductUseCase } from '../../../../use-cases/product/create/create-product.use-case'
import { ICreateProductDtoInput } from '../../../../use-cases/product/create/dto/create-product.dto'
import { ListProductsUseCase } from '../../../../use-cases/product/list/list-products.use-case'

import { ProductRepository } from '../../../core/product/sequelize/repository/product.repository'

export const productsRouter = express.Router()

productsRouter.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository())

  try {
    const product: ICreateProductDtoInput = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price
    }

    const output = await useCase.execute(product)

    res.status(200).send(output)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

productsRouter.get('/', async (_: Request, res: Response) => {
  const useCase = new ListProductsUseCase(new ProductRepository())

  try {
    const output = await useCase.execute({})

    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
