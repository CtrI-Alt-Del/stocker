import { v4 as uuid } from 'uuid'

export abstract class Entity<Props> {
  readonly id: string
  protected readonly props: Props

  protected constructor(props: Props, id?: string) {
    this.id = id ?? uuid()
    this.props = props
  }
}
