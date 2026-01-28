import InvoicesApiService from '@/services/api/InvoicesApiService'
import { describe, it, expect, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('InvoiceApiService => deleteInvoiceById', () => {
  it('deleteInvoiceById => should return number 200', async () => {
    // Arrange
    const id = 1
    const expectedResult: number = 200

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/deleteInvoiceById`).reply(200)

    // Act
    const response = await InvoicesApiService.deleteInvoiceById(id)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(`http://localhost:65513/api/invoices/deleteInvoiceById`)
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('deleteInvoiceById => should return number 201', async () => {
    // Arrange
    const id = 2
    const expectedResult: number = 201

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/deleteInvoiceById`).reply(201)

    // Act
    const response = await InvoicesApiService.deleteInvoiceById(id)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(`http://localhost:65513/api/invoices/deleteInvoiceById`)
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('deleteInvoiceById => should return undefined: Error 404', async () => {
    // Arrange
    const id = 3

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/deleteInvoiceById`).reply(404)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await InvoicesApiService.deleteInvoiceById(id)

    // Assert
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0]?.url).toBe(`http://localhost:65513/api/invoices/deleteInvoiceById`)
    expect(response).toBeUndefined()
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not delete number with id 3. Error: Request failed with status code 404'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })

  it('deleteInvoiceById => should catch error and return undefined: Error 500', async () => {
    // Arrange
    const id = 5

    const mock = new MockAdapter(axios)
    mock.onPost(`http://localhost:65513/api/invoices/deleteInvoiceById`).reply(500)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await InvoicesApiService.deleteInvoiceById(id)

    // Assert
    await expect(mock.history.post.length).toBe(1)
    await expect(mock.history.post[0]?.url).toBe(
      `http://localhost:65513/api/invoices/deleteInvoiceById`
    )
    await expect(response).toBeUndefined()
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not delete number with id 5. Error: Request failed with status code 500'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })
})
