import express, { Request, Response } from 'express'

import { CreateCustomerUseCase } from '../../../../use-cases/customer/create/create-customer.use-case'
import { ICreateCustomerDtoInput } from '../../../../use-cases/customer/create/dto/create-customer.dto'
import { ListCustomersUseCase } from '../../../../use-cases/customer/list/list-customers.use-case'

import { CustomerRepository } from '../../../core/customer/sequelize/repository/customer.repository'

export const customersRouter = express.Router()

customersRouter.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository())

  try {
    const customer: ICreateCustomerDtoInput = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip
      }
    }

    const output = await useCase.execute(customer)

    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

customersRouter.get('/', async (_: Request, res: Response) => {
  const useCase = new ListCustomersUseCase(new CustomerRepository())

  try {
    const output = await useCase.execute({})

    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
