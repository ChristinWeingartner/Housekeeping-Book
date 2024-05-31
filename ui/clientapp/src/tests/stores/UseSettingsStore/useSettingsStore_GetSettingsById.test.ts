import type { ISettings } from '@/interfaces/ISettings'
import SettingsApiService from '@/services/api/SettingsApiService'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi } from 'vitest'

describe('useSettingsStore => getSettings', () => {
  const settings: ISettings = {
    SettingsId: 1,
    ContributionMembersCount: 3,
    PreferredColorMode: 'dark',
    CreateTimestamp: '2024-02-01T23:00:00.000Z',
    UpdateTimestamp: '2024-02-06T23:00:00.000Z'
  }

  it('getSettings => should return settings', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'getSettings')
      .mockResolvedValue(settings)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.getSettings()

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(3)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Clean up after the test
    spySettingsApiService.mockRestore()
  })

  it('getSettings => should return undefined and catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'getSettings')
      .mockResolvedValue(undefined)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.getSettings()

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not get settings. The response is undefined.'
    )

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('getSettings => should catch error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'getSettings')
      .mockRejectedValue(new Error('error'))
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.getSettings()

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(spySettingsApiService).rejects.toThrow('error')
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith('Could not get settings. Error: error')

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })
})
