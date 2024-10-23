import { Entity } from './entity'

type NotificationProps = {
  createdAt: Date
}

export abstract class Notification<
  Props extends NotificationProps,
> extends Entity<Props> {
  get createdAt() {
    return this.props.createdAt
  }
}
