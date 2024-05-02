import { DefaultAnnualMonthlyAverage, DefaultComment, DefaultInvoices, DefaultMonthTotals, DefaultMonthlySum } from '@/stores/defaultData'
import { useInvoiceStore } from '@/stores/useInvoiceStore'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect } from 'vitest'

describe('useInvoiceStore => getters, default state', () => {
  it('useInvoiceStore => should return default states', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    // Assert
    expect(sut.invoices).toEqual(DefaultInvoices)
    expect(sut.monthTotals).toEqual(DefaultMonthTotals)
    expect(sut.comment).toEqual(DefaultComment)
    expect(sut.monthlySum).toEqual(DefaultMonthlySum)
    expect(sut.annualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)
  })

  it('useInvoiceStore => should return correct values for getters', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useInvoiceStore()

    // Assert
    expect(sut.getInvoices).toEqual(DefaultInvoices)
    expect(sut.getMonthTotals).toEqual(DefaultMonthTotals)
    expect(sut.getComment).toEqual(DefaultComment)
    expect(sut.getMonthlySum).toEqual(DefaultMonthlySum)
    expect(sut.getAnnualMonthlyAverage).toEqual(DefaultAnnualMonthlyAverage)
  })
})
