export type NotificationError = {
  message: string
  context: string
}

export class Notification {
  private errors: NotificationError[] = []

  addError(error: NotificationError) {
    this.errors.push(error)
  }

  messages(context?: string): string {
    return this.errors
      .filter(err => (context ? err.context === context : err))
      .map(err => `${err.context}: ${err.message}`)
      .join(',')
  }
}
