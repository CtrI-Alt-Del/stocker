import type { StockLevelReportDto } from '../../dtos'

type StockLevelReportProps = {
  safe: number
  danger: number
  average: number
}

export class StockLevelReport {
  readonly safe: number
  readonly danger: number
  readonly average: number

  private constructor({ safe, average, danger }: StockLevelReportProps) {
    this.safe = safe
    this.danger = danger
    this.average = average
  }

  static create(dto: StockLevelReportDto) {
    return new StockLevelReport(dto)
  }

  get total() {
    return this.safe + this.average + this.danger
  }

  get safePercentage() {
    return Math.ceil((this.safe / this.total) * 100)
  }

  get averagePercentage() {
    return Math.ceil((this.average / this.total) * 100)
  }

  get dangerPercentage() {
    return Math.ceil((this.danger / this.total) * 100)
  }
}
