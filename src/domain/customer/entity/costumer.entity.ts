import { Entity } from '../../@shared/entity/entity.abstract'
import NotificationError from '../../@shared/notification/notification.error'
import { Address } from '../object-values/address/address.ov'

export class Customer extends Entity {
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super()

    this._id = id
    this._name = name

    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'ID is required.'
      })
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'Name is required.'
      })
    }
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer.')
    }

    this._active = true
  }

  deactivate() {
    this._active = false
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
  }

  isActive() {
    return this._active
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get active() {
    return this._active
  }

  get rewardPoints() {
    return this._rewardPoints
  }

  get address() {
    return this._address
  }

  set address(address: Address) {
    this._address = address
  }
}
