type PaginationResponseProps<Item> = {
  items: Item[]
  itemsCount: number
}

export class PaginationResponse<Item> {
  readonly items: Item[]
  readonly itemsCount: number

  constructor({ items, itemsCount }: PaginationResponseProps<Item>) {
    this.items = items
    this.itemsCount = itemsCount
  }
}
