import { Workbook, type Worksheet } from 'exceljs'

import type { ICsvProvider } from '@stocker/core/interfaces'
import type { CsvColumn } from '@stocker/core/types'

export class ExcelJsCsvProvider implements ICsvProvider {
  private sheet: Worksheet

  constructor() {
    const workbook = new Workbook()
    this.sheet = workbook.addWorksheet('Aba')
  }

  addColumns(columns: CsvColumn[]): void {
    this.sheet.columns = columns.map((column) => ({
      header: column.header,
      key: column.key,
      fill: {
        bgColor: { argb: '111' },
        fgColor: { argb: '111' },
        type: 'pattern',
        pattern: 'solid',
        center: true,
      },
    }))

    this.sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'FF0000FF' },
    }

    this.sheet.getRow(1).font = {
      bold: true,
      color: { argb: 'FFFFFF00' },
    }
  }

  addRows(rows: unknown[]): void {
    this.sheet.addRows(rows)
  }

  async getXlsxFileBuffer(): Promise<Buffer> {
    return (await this.sheet.workbook.xlsx.writeBuffer()) as Buffer
  }
}
