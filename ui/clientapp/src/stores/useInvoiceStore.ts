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
import { ref } from 'vue'

export const useInvoiceStore = defineStore('invoice-store', () => {
  // filled for github pages because backend doesn't work with github pages
  const invoices = ref<IInvoice[]>(DefaultInvoices)
  const monthTotals = ref<number[]>(DefaultMonthTotals)
  const comment = ref<string>(DefaultComment)
  const monthlySum = ref<number>(DefaultMonthlySum)
  const annualMonthlyAverage = ref<number>(DefaultAnnualMonthlyAverage)

  async function getInvoicesPerMonthAndYear(month: number, year: string) {
    try {
      const fetchedInvoices = await InvoicesApiService.getInvoicesPerMonthAndYear(month, year)

      if (fetchedInvoices) {
        // calculate the monthly sum
        const calculatedMonthlySum = fetchedInvoices.reduce(
          (sum, invoice) => sum + invoice.Total,
          0
        )
        const roundedSum = Math.round(calculatedMonthlySum * 100) / 100

        invoices.value = fetchedInvoices
        monthlySum.value = roundedSum
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
  }
  async function getCommentPerMonthAndYear(month: number, year: string) {
    try {
      const fetchedComment = await InvoicesApiService.getCommentPerMonthAndYear(month, year)

      // comment can be a empty string, so check for null or undefined
      if (fetchedComment !== null && fetchedComment !== undefined) {
        comment.value = fetchedComment
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
  }
  async function addInvoiceToMonthAndYear(month: number, year: string, invoiceTotal: number) {
    try {
      const response = await InvoicesApiService.addInvoiceToMonthAndYear(month, year, invoiceTotal)

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
  }
  async function updateInvoiceById(id: number, invoiceTotal: number) {
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
  }
  async function updateCommentByMonthAndYear(month: number, year: string, updatedComment: string) {
    try {
      const newComment = await InvoicesApiService.updateCommentByMonthAndYear(
        month,
        year,
        updatedComment
      )

      if (newComment) {
        comment.value = newComment
      } else {
        console.error(
          'Could not update comment by month and year ' +
            month +
            ' ' +
            year +
            ' ' +
            updatedComment +
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
          comment.value +
          '. ' +
          e
      )
    }
  }
  async function deleteInvoiceById(id: number) {
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
  }
  async function getMonthTotalsForYear(year: string) {
    try {
      const fetchedMonthTotals = await InvoicesApiService.getMonthTotalsForYear(year)

      if (fetchedMonthTotals) {
        // filter the monthly totals for non-zero totals
        const filledTotals = fetchedMonthTotals.filter((total) => total > 0)
        // calculate the sum of the values from the filledTotals array
        const sum = filledTotals.reduce((acc, curr) => acc + curr, 0)
        // calculate the average total for the filled months
        const monthlyAverage = sum / filledTotals.length

        monthTotals.value = fetchedMonthTotals
        annualMonthlyAverage.value = monthlyAverage
      } else {
        console.error(
          'Could not get month totals for year ' + year + '. The response is undefined.'
        )
      }
    } catch (e) {
      console.error('Could not get month totals for year ' + year + '. ' + e)
    }
  }

  return {
    invoices,
    monthTotals,
    comment,
    monthlySum,
    annualMonthlyAverage,
    getInvoicesPerMonthAndYear,
    getCommentPerMonthAndYear,
    addInvoiceToMonthAndYear,
    updateInvoiceById,
    updateCommentByMonthAndYear,
    deleteInvoiceById,
    getMonthTotalsForYear
  }
})
