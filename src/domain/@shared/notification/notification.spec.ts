import { Notification } from './notification'

describe('Notifications unit test', () => {
  it('should be able to create error', () => {
    const notification = new Notification()

    const error1 = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error1)

    expect(notification.messages('customer')).toBe('customer: error message')

    const error2 = {
      message: 'error message2',
      context: 'customer'
    }

    notification.addError(error2)

    expect(notification.messages('customer')).toBe(
      'customer: error message,customer: error message2'
    )
  })
})
