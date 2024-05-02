import { describe, it, expect, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import SettingsApiService from '@/services/api/SettingsApiService'
import type { IUpdateSettings } from '@/interfaces/IUpdateSettings'

describe('SettingsApiService => updateSettings', () => {
  const updateSettingsModel: IUpdateSettings = {
    ContributionMembersCount: 4,
    PreferredColorMode: "dark"
  }

  it('updateSettings => should return number 200', async () => {
    // Arrange
    const expectedResult: number = 200

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/settings/updateSettings`).reply(200)

    // Act
    const response = await SettingsApiService.updateSettings(updateSettingsModel)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0].url).toBe(`http://localhost:65513/api/settings/updateSettings`)
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('updateSettings => should return number 201', async () => {
    // Arrange
    const expectedResult: number = 201

    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/settings/updateSettings`).reply(201)

    // Act
    const response = await SettingsApiService.updateSettings(updateSettingsModel)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0].url).toBe(`http://localhost:65513/api/settings/updateSettings`)
    expect(response).toEqual(expectedResult)

    // Clean up after the test
    mock.restore()
  })

  it('updateSettings => should return undefined: Error 404', async () => {
    // Arrange
    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/settings/updateSettings`).reply(404)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await SettingsApiService.updateSettings(updateSettingsModel)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0].url).toBe(`http://localhost:65513/api/settings/updateSettings`)
    expect(response).toBeUndefined()
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update settings. Error: Request failed with status code 404'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })

  it('updateSettings => should catch error and return undefined: Error 500', async () => {
    // Arrange
    const mock = new MockAdapter(axios)
    mock.onPut(`http://localhost:65513/api/settings/updateSettings`).reply(500)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // Act
    const response = await SettingsApiService.updateSettings(updateSettingsModel)

    // Assert
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0].url).toBe(`http://localhost:65513/api/settings/updateSettings`)
    expect(response).toBeUndefined()
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update settings. Error: Request failed with status code 500'
    )

    // Clean up after the test
    mock.restore()
    consoleMock.mockReset()
  })
})
