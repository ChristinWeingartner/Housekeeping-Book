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

describe('useInvoiceStore => getCommentPerMonthAndYear', () => {
  const month = 2
  const year = '2024'
  const comment: string = 'this is my comment'

  it('getCommentPerMonthAndYear => should return comment', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'getCommentPerMonthAndYear')
      .mockResolvedValue(comment)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.getCommentPerMonthAndYear(month, year)

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

  it('getCommentPerMonthAndYear => should return undefined and catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'getCommentPerMonthAndYear')
      .mockResolvedValue(undefined)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.getCommentPerMonthAndYear(month, year)

    // Assert
    expect(spyInvoiceApiService).toHaveBeenCalledTimes(1)
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not get comment per month and year 2 2024. The response is undefined.'
    )

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('getCommentPerMonthAndYear => should catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'getCommentPerMonthAndYear')
      .mockRejectedValue(new Error('error'))
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.getCommentPerMonthAndYear(month, year)

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
      'Could not get comment per month and year 2 2024. Error: error'
    )

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
    consoleMock.mockReset()
  })
})
