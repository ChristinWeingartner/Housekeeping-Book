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

describe('useInvoiceStore => getMonthTotalsForYear', () => {
  const year = '2024'
  const monthTotals: number[] = [0, 235.54, 78, 56.09, 23, 43.54, 1096.56, 1, 34, 65, 2, 65.98]

  it('getMonthTotalsForYear => should return number[]', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'getMonthTotalsForYear')
      .mockResolvedValue(monthTotals)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.getMonthTotalsForYear(year)

    // Assert
    expect(spyInvoiceApiService).toHaveBeenCalledTimes(1)
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(monthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(154.61)

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
  })

  it('getMonthTotalsForYear => should return undefined and catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'getMonthTotalsForYear')
      .mockResolvedValue(undefined)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.getMonthTotalsForYear(year)

    // Assert
    expect(spyInvoiceApiService).toHaveBeenCalledTimes(1)
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not get month totals for year 2024. The response is undefined.'
    )

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('getMonthTotalsForYear => should catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    const spyInvoiceApiService = vi
      .spyOn(InvoicesApiService, 'getMonthTotalsForYear')
      .mockRejectedValue(new Error('error'))
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)

    // Act
    await sut.getMonthTotalsForYear(year)

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
      'Could not get month totals for year 2024. Error: error'
    )

    // Clean up after the test
    spyInvoiceApiService.mockRestore()
    consoleMock.mockReset()
  })
})
