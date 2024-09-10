type PaginationResponseProps<Item> = {
  items: Item[]
  totalItems: number
}

export class PaginationResponse<Item> {
  readonly items: Item[]
  readonly totalItems: number

  constructor({ items, totalItems }: PaginationResponseProps<Item>) {
    this.items = items
    this.totalItems = totalItems
  }
}
