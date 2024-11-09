import { Entity } from './entity'

type NotificationProps = {
  sentAt: Date
}

export abstract class Notification<
  Props extends NotificationProps,
> extends Entity<Props> {
  get sentAt() {
    return this.props.sentAt
  }
}
