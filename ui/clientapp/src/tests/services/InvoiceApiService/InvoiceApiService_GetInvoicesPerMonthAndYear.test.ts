import type { IInvoice } from '@/interfaces/IInvoice'
import InvoicesApiService from '@/services/api/InvoicesApiService'
import { describe, it, expect, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('InvoiceApiService => getInvoicesPerMonthAndYear', () => {
  const month = 0
  const year = '2024'

  it('getInvoicesPerMonthAndYear => should return invoices', async () => {
    // Arrange
    const result: IInvoice[] = [
      {
        InvoiceId: 1,
        MonthlyInvoiceSummaryId: 2,
        Store: null,
        CreateTimestamp: '2024-02-01T23:00:00.000Z',
        UpdateTimestamp: '2024-03-01T23:00:00.000Z',
        Total: 34.56
      },
      {
        InvoiceId: 2,
        MonthlyInvoiceSummaryId: 3,
        Store: null,
        CreateTimestamp: '2024-04-01T23:00:00.000Z',
        UpdateTimestamp: '2024-05-01T23:00:00.000Z',
        Total: 67.98
      }
    ]

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/getInvoicesPerMonthAndYear`).reply(200, result)

    // Act
    const invoices = await InvoicesApiService.getInvoicesPerMonthAndYear(month, year)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/getInvoicesPerMonthAndYear`
    )
    expect(invoices).toEqual(result)

    // Clean up after the test
    mock.restore()
  })

  it('getInvoicesPerMonthAndYear => should return undefined', async () => {
    // Arrange
    const result = undefined

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/getInvoicesPerMonthAndYear`).reply(200, result)

    // Act
    const invoices = await InvoicesApiService.getInvoicesPerMonthAndYear(month, year)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/getInvoicesPerMonthAndYear`
    )
    expect(invoices).toEqual(result)

    // Clean up after the test
    mock.restore()
  })

  it('getInvoicesPerMonthAndYear => should catch error and return undefined', async () => {
    // Arrange
    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/getInvoicesPerMonthAndYear`).reply(500)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const invoices = await InvoicesApiService.getInvoicesPerMonthAndYear(month, year)

    // Assert
    await expect(mock.history.post.length).toBe(1)
    await expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/getInvoicesPerMonthAndYear`
    )
    await expect(invoices).toBeUndefined()
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not get invoices per month and year 0 2024. Error: Request failed with status code 500'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })
})
