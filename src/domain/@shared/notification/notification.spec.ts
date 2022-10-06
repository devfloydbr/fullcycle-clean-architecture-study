import { Notification } from './notification'

describe('Notifications unit test', () => {
  it('should be able to create error', () => {
    const notification = new Notification()

    const error1 = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error1)

    expect(notification.messages('customer')).toBe(
      `${error1.context}: ${error1.message}`
    )

    const error2 = {
      message: 'error message2',
      context: 'customer'
    }

    notification.addError(error2)

    expect(notification.messages('customer')).toBe(
      `${error1.context}: ${error1.message},${error2.context}: ${error2.message}`
    )

    const error3 = {
      message: 'error message3',
      context: 'order'
    }

    notification.addError(error3)

    expect(notification.messages()).toBe(
      `${error1.context}: ${error1.message},${error2.context}: ${error2.message},${error3.context}: ${error3.message}`
    )
  })

  it('should check if notification has at least one error', () => {
    const notification = new Notification()

    const error1 = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error1)

    expect(notification.hasErrors()).toBe(true)
  })

  it('should be able to get all error props', () => {
    const notification = new Notification()

    const error = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error)

    expect(notification.errors).toEqual([error])
  })
})
