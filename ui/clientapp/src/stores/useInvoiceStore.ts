import { defineStore } from 'pinia'
import type { IInvoice } from '@/interfaces/IInvoice'
import InvoicesApiService from '@/services/api/InvoicesApiService'
import {
  DefaultInvoices,
  DefaultMonthTotals,
  DefaultComment,
  DefaultMonthlySum,
  DefaultAnnualMonthlyAverage
} from './defaultData'

export interface InvoiceStoreState {
  invoices: Array<IInvoice>
  monthTotals: Array<number>
  comment: string
  monthlySum: number
  annualMonthlyAverage: number
}

// default states filled for github pages because backend doesn't work with github pages
const DefaultInvoiceState: InvoiceStoreState = {
  invoices: DefaultInvoices,
  monthTotals: DefaultMonthTotals,
  comment: DefaultComment,
  monthlySum: DefaultMonthlySum,
  annualMonthlyAverage: DefaultAnnualMonthlyAverage
}

export const useInvoiceStore = defineStore({
  id: 'invoice-store',
  state: (): InvoiceStoreState => ({
    ...DefaultInvoiceState
  }),
  getters: {
    getInvoices: (state): Array<IInvoice> => state.invoices,
    getMonthTotals: (state): Array<number> => state.monthTotals,
    getComment: (state): string => state.comment,
    getMonthlySum: (state): number => state.monthlySum,
    getAnnualMonthlyAverage: (state): number => state.annualMonthlyAverage
  },
  actions: {
    async getInvoicesPerMonthAndYear(month: number, year: string) {
      try {
        const invoices = await InvoicesApiService.getInvoicesPerMonthAndYear(month, year)

        if (invoices) {
          // calculate the monthly sum
          const monthlySum = invoices.reduce((sum, invoice) => sum + invoice.Total, 0)
          const roundedSum = Math.round(monthlySum * 100) / 100

          this.$patch((state) => {
            ;(state.invoices = invoices), (state.monthlySum = roundedSum)
          })
        } else {
          console.error(
            'Could not get invoices per month and year ' +
              month +
              ' ' +
              year +
              '. The response is undefined.'
          )
        }
      } catch (e) {
        console.error('Could not get invoices per month and year ' + month + ' ' + year + '. ' + e)
      }
    },
    async getCommentPerMonthAndYear(month: number, year: string) {
      try {
        const comment = await InvoicesApiService.getCommentPerMonthAndYear(month, year)

        // comment can be a empty string, so check for null or undefined
        if (comment !== null && comment !== undefined) {
          this.$patch((state) => {
            state.comment = comment
          })
        } else {
          console.error(
            'Could not get comment per month and year ' +
              month +
              ' ' +
              year +
              '. The response is undefined.'
          )
        }
      } catch (e) {
        console.error('Could not get comment per month and year ' + month + ' ' + year + '. ' + e)
      }
    },
    async addInvoiceToMonthAndYear(month: number, year: string, invoiceTotal: number) {
      try {
        const response = await InvoicesApiService.addInvoiceToMonthAndYear(
          month,
          year,
          invoiceTotal
        )

        if (response && response >= 200 && response < 300) {
          console.log('addInvoiceToMonthAndYear was successful!')
        } else {
          console.error(
            'Could not add invoice to month and year' +
              month +
              ' ' +
              year +
              ' with total ' +
              invoiceTotal +
              '. Status code: ' +
              response
          )
        }
      } catch (e) {
        console.error(
          'Could not add invoice to month and year ' +
            month +
            ' ' +
            year +
            ' with total ' +
            invoiceTotal +
            '. ' +
            e
        )
      }
    },
    async updateInvoiceById(id: number, invoiceTotal: number) {
      try {
        const response = await InvoicesApiService.updateInvoiceById(id, invoiceTotal)

        if (response && response >= 200 && response < 300) {
          console.log('updateInvoiceById was successful!')
        } else {
          console.error(
            'Could not update invoice by id ' +
              id +
              ' with total ' +
              invoiceTotal +
              '. Status code: ' +
              response
          )
        }
      } catch (e) {
        console.error(
          'Could not update invoice by id ' + id + ' with total ' + invoiceTotal + '. ' + e
        )
      }
    },
    async updateCommentByMonthAndYear(month: number, year: string, comment: string) {
      try {
        const newComment = await InvoicesApiService.updateCommentByMonthAndYear(
          month,
          year,
          comment
        )

        if (newComment) {
          this.$patch((state) => {
            state.comment = newComment
          })
        } else {
          console.error(
            'Could not update comment by month and year ' +
              month +
              ' ' +
              year +
              ' ' +
              comment +
              '. The response is undefined.'
          )
        }
      } catch (e) {
        console.error(
          'Could not update comment by month and year ' +
            month +
            ' ' +
            year +
            ' ' +
            comment +
            '. ' +
            e
        )
      }
    },
    async deleteInvoiceById(id: number) {
      try {
        const response = await InvoicesApiService.deleteInvoiceById(id)

        if (response && response >= 200 && response < 300) {
          console.log('deleteInvoiceById was successful!')
        } else {
          console.error('Could not delete invoice by id ' + id + '. Status code: ' + response)
        }
      } catch (e) {
        console.error('Could not delete invoice with id ' + id + '. ' + e)
      }
    },
    async getMonthTotalsForYear(year: string) {
      try {
        const monthTotals = await InvoicesApiService.getMonthTotalsForYear(year)

        if (monthTotals) {
          // filter the monthly totals for non-zero totals
          const filledTotals = monthTotals.filter((total) => total > 0)
          // calculate the sum of the values from the filledTotals array
          const sum = filledTotals.reduce((acc, curr) => acc + curr, 0)
          // calculate the average total for the filled months
          const monthlyAverage = sum / filledTotals.length

          this.$patch((state) => {
            ;(state.monthTotals = monthTotals), (state.annualMonthlyAverage = monthlyAverage)
          })
        } else {
          console.error(
            'Could not get month totals for year ' + year + '. The response is undefined.'
          )
        }
      } catch (e) {
        console.error('Could not get month totals for year ' + year + '. ' + e)
      }
    }
  }
})
