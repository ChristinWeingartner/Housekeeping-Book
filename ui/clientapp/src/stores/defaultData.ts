import type { IInvoice } from '@/interfaces/IInvoice'

export const DefaultInvoices: Array<IInvoice> = [
  {
    InvoiceId: 1,
    CreateTimestamp: '23.02.2023',
    UpdateTimestamp: '23.02.2023',
    MonthlyInvoiceSummaryId: 1,
    Store: null,
    Total: 98.43
  },
  {
    InvoiceId: 2,
    CreateTimestamp: '27.02.2023',
    UpdateTimestamp: '27.02.2023',
    MonthlyInvoiceSummaryId: 1,
    Store: null,
    Total: 68.39
  },
  {
    InvoiceId: 3,
    CreateTimestamp: '29.02.2023',
    UpdateTimestamp: '29.02.2023',
    MonthlyInvoiceSummaryId: 1,
    Store: null,
    Total: 78.25
  }
]

export const DefaultMonthTotals: Array<number> = [
  234.65, 304.23, 250.65, 285.54, 292.43, 302.45, 277.54, 267.98, 308.54, 299.54, 245.65, 234.71
]

export const DefaultComment: string = "2 weeks vacation in Italy, weekend in the mountains"

export const DefaultMonthlySum: number = 245.07

export const DefaultAnnualMonthlyAverage: number = 275.32