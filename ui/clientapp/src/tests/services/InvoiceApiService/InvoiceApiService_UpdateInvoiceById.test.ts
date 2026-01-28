import InvoicesApiService from '@/services/api/InvoicesApiService'
import { describe, it, expect, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('InvoiceApiService => updateInvoiceById', () => {
  it('updateInvoiceById => should return number 200', async () => {
    // Arrange
    const id = 1
    const invoiceTotal = 34.65

    const expectedResult: number = 200

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/invoices/updateInvoiceById`).reply(200)

    // Act
    const response = await InvoicesApiService.updateInvoiceById(id, invoiceTotal)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0]?.url).toBe(`http://localhost:65513/api/invoices/updateInvoiceById`)
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('updateInvoiceById => should return number 201', async () => {
    // Arrange
    const id = 2
    const invoiceTotal = 34.65

    const expectedResult: number = 201

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/invoices/updateInvoiceById`).reply(201)

    // Act
    const response = await InvoicesApiService.updateInvoiceById(id, invoiceTotal)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0]?.url).toBe(`http://localhost:65513/api/invoices/updateInvoiceById`)
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('updateInvoiceById => should return undefined: Error 404', async () => {
    // Arrange
    const id = 3
    const invoiceTotal = 34.65

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/invoices/updateInvoiceById`).reply(404)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await InvoicesApiService.updateInvoiceById(id, invoiceTotal)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0]?.url).toBe(`http://localhost:65513/api/invoices/updateInvoiceById`)
    expect(response).toBeUndefined()
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update invoice by id 3 with total 34.65. Error: Request failed with status code 404'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })

  it('updateInvoiceById => should catch error and return undefined: Error 500', async () => {
    // Arrange
    const id = 5
    const invoiceTotal = 34.65

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/invoices/updateInvoiceById`).reply(500)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await InvoicesApiService.updateInvoiceById(id, invoiceTotal)

    // Assert
    await expect(mock.history.put.length).toBe(1)
    await expect(mock.history.put[0]?.url).toBe(
      `http://localhost:65513/api/invoices/updateInvoiceById`
    )
    await expect(response).toBeUndefined()
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update invoice by id 5 with total 34.65. Error: Request failed with status code 500'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })
})
