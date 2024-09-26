export class Price {
  private constructor(readonly value: number) {}

  static create(value: number) {
    return new Price(value)
  }

  get brl(): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    return formatter.format(this.value)
  }
}
