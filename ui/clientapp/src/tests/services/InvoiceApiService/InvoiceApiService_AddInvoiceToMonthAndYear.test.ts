import InvoicesApiService from '@/services/api/InvoicesApiService'
import { describe, it, expect, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('InvoiceApiService => addInvoiceToMonthAndYear', () => {
  const month = 0
  const year = '2024'
  const invoiceTotal = 34.65

  it('addInvoiceToMonthAndYear => should return number 200', async () => {
    // Arrange
    const expectedResult: number = 200
    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`).reply(200)

    // Act
    const response = await InvoicesApiService.addInvoiceToMonthAndYear(month, year, invoiceTotal)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`
    )
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('addInvoiceToMonthAndYear => should return number 201', async () => {
    // Arrange
    const month = 0
    const year = '2024'
    const invoiceTotal = 34.65

    const expectedResult: number = 201

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`).reply(201)

    // Act
    const response = await InvoicesApiService.addInvoiceToMonthAndYear(month, year, invoiceTotal)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`
    )
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('addInvoiceToMonthAndYear => should return undefined: Error 404', async () => {
    // Arrange
    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`).reply(404)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await InvoicesApiService.addInvoiceToMonthAndYear(month, year, invoiceTotal)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`
    )
    expect(response).toBeUndefined()
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not add invoice to month and year 0 2024 with total 34.65. Error: Request failed with status code 404'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })

  it('addInvoiceToMonthAndYear => should catch error and return undefined: Error 500', async () => {
    // Arrange
    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`).reply(500)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await InvoicesApiService.addInvoiceToMonthAndYear(month, year, invoiceTotal)

    // Assert
    await expect(mock.history.post.length).toBe(1)
    await expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/addInvoiceToMonthAndYear`
    )
    await expect(response).toBeUndefined()
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not add invoice to month and year 0 2024 with total 34.65. Error: Request failed with status code 500'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })
})
