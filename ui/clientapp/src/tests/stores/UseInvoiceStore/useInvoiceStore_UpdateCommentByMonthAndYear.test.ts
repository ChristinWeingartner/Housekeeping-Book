import InvoicesApiService from '@/services/api/InvoicesApiService'
import {
  DefaultInvoices,
  DefaultMonthTotals,
  DefaultComment,
  DefaultMonthlySum,
  DefaultAnnualMonthlyAverage
} from '@/stores/defaultData'
import { useInvoiceStore } from '@/stores/useInvoiceStore'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi } from 'vitest'

describe('useInvoiceStore => updateCommentByMonthAndYear', () => {
  const month = 2
  const year = '2024'
  const comment: string = 'this is my new comment'

  it('updateCommentByMonthAndYear => should return comment', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'updateCommentByMonthAndYear')
      .mockResolvedValue(comment)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.updateCommentByMonthAndYear(month, year, comment)

    // Assert
    expect(spyInvoiceApiService).toHaveBeenCalledTimes(1)
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(comment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
  })

  it('updateCommentByMonthAndYear => should return undefined and catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'updateCommentByMonthAndYear')
      .mockResolvedValue(undefined)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.updateCommentByMonthAndYear(month, year, comment)

    // Assert
    expect(spyInvoiceApiService).toHaveBeenCalledTimes(1)
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update comment by month and year 2 2024 this is my new comment. The response is undefined.'
    )

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateCommentByMonthAndYear => should catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'updateCommentByMonthAndYear')
      .mockRejectedValue(new Error('error'))
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.updateCommentByMonthAndYear(month, year, comment)

    // Assert
    await expect(spyInvoiceApiService).toHaveBeenCalledTimes(1)
    await expect(spyInvoiceApiService).rejects.toThrow('error')
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update comment by month and year 2 2024 2 weeks vacation in Italy, weekend in the mountains. Error: error'
    )

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
    consoleMock.mockReset()
  })
})
