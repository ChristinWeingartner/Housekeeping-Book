import InvoicesApiService from '@/services/api/InvoicesApiService'
import { describe, it, expect, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('InvoiceApiService => updateCommentByMonthAndYear', () => {
  const month = 0
  const year = '2024'

  it('updateCommentByMonthAndYear => should return comment', async () => {
    // Arrange
    const result: string = 'this is my new comment'

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/invoices/updateCommentByMonthAndYear`).reply(200, result)

    // Act
    const comment = await InvoicesApiService.updateCommentByMonthAndYear(month, year, result)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0]?.url).toBe(
      `http://localhost:65513/api/invoices/updateCommentByMonthAndYear`
    )
    expect(comment).toEqual(result)

    // Clean up after the test
    mock.restore()
  })

  it('updateCommentByMonthAndYear => should return undefined', async () => {
    // Arrange
    const result = undefined

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/invoices/updateCommentByMonthAndYear`).reply(200, result)

    // Act
    const comment = await InvoicesApiService.updateCommentByMonthAndYear(month, year, 'comment')

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0]?.url).toBe(
      `http://localhost:65513/api/invoices/updateCommentByMonthAndYear`
    )
    expect(comment).toEqual(result)

    // Clean up after the test
    mock.restore()
  })

  it('updateCommentByMonthAndYear => should catch error and return undefined', async () => {
    // Arrange
    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/invoices/updateCommentByMonthAndYear`).reply(500)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const comment = await InvoicesApiService.updateCommentByMonthAndYear(month, year, 'comment')

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0]?.url).toBe(
      `http://localhost:65513/api/invoices/updateCommentByMonthAndYear`
    )
    expect(comment).toBeUndefined()
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update comment by month and year 0 2024 comment Error: Request failed with status code 500'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })
})
