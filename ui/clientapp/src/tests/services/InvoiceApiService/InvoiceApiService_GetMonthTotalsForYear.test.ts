import InvoicesApiService from '@/services/api/InvoicesApiService'
import { describe, it, expect, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('InvoiceApiService => getMonthTotalsForYear', () => {
  const year = '2024'

  it('getMonthTotalsForYear => should return month totals', async () => {
    // Arrange
    const result: number[] = [0, 235.54, 78, 56.09, 23, 43.54, 1096.56, 1, 34, 65, 2, 65.98]

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/getMonthTotalsForYear`).reply(200, result)

    // Act
    const monthTotals = await InvoicesApiService.getMonthTotalsForYear(year)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/getMonthTotalsForYear`
    )
    expect(monthTotals).toEqual(result)

    // Clean up after the test
    mock.restore()
  })

  it('getMonthTotalsForYear => should return undefined', async () => {
    // Arrange
    const result = undefined

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/getMonthTotalsForYear`).reply(200, result)

    // Act
    const monthTotals = await InvoicesApiService.getMonthTotalsForYear(year)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/getMonthTotalsForYear`
    )
    expect(monthTotals).toEqual(result)

    // Clean up after the test
    mock.restore()
  })

  it('getMonthTotalsForYear => should catch error and return undefined', async () => {
    // Arrange
    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/getMonthTotalsForYear`).reply(500)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const monthTotals = await InvoicesApiService.getMonthTotalsForYear(year)

    // Assert
    await expect(mock.history.post.length).toBe(1)
    await expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/getMonthTotalsForYear`
    )
    await expect(monthTotals).toBeUndefined()
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not get month totals for year 2024. Error: Request failed with status code 500'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })
})
