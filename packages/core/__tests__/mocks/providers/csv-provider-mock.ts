import type { ICsvProvider } from '../../../src/interfaces'
import type { CsvColumn } from '../../../src/types'

export class CsvProviderMock implements ICsvProvider {
  columns: CsvColumn[] = []
  rows: unknown[] = []

  async addColumns(columns: CsvColumn[]) {
    this.columns = columns
  }

  async addRows(rows: unknown[]) {
    this.rows = rows
  }

  async getXlsxFileBuffer() {
    return Buffer.from([this.columns, this.rows].toString())
  }
}
