export type NotificationErrorProps = {
  message: string
  context: string
}

export class Notification {
  private _errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this._errors.push(error)
  }

  hasErrors(): boolean {
    return this._errors.length > 0
  }

  messages(context?: string): string {
    return this._errors
      .filter(err => (context ? err.context === context : err))
      .map(err => `${err.context}: ${err.message}`)
      .join(',')
  }

  get errors() {
    return this._errors
  }
}
