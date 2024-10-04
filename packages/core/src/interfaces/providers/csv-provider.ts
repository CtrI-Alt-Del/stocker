import type { CsvColumn } from '../../types'

export interface ICsvProvider {
  addColumns(columns: CsvColumn[]): void
  addRows(rows: unknown[]): void
  getXlsxFileBuffer(): Promise<Buffer>
}
