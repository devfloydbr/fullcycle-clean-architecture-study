import { Notification } from '../notification/notification'

export abstract class Entity {
  protected _id: string
  protected _notification: Notification

  constructor() {
    this._notification = new Notification()
  }

  get notification() {
    return this._notification
  }
}
