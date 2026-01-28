import type { IUpdateSettings } from '@/interfaces/IUpdateSettings'
import SettingsApiService from '@/services/api/SettingsApiService'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi } from 'vitest'

describe('useSettingsStore => updateSettings', () => {
  const updateSettingsModel: IUpdateSettings = {
    ContributionMembersCount: 4,
    PreferredColorMode: 'dark'
  }

  it('updateSettings => should catch log because returns 200 resopnse', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettings')
      .mockResolvedValue(200)
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.updateSettings(updateSettingsModel)

    // Assert
    await expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith('updateSettings was successful!')

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettings => should catch log because returns 201 resopnse', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettings')
      .mockResolvedValue(201)
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.updateSettings(updateSettingsModel)

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith('updateSettings was successful!')

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettings => should catch error because returns undefined', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettings')
      .mockResolvedValue(undefined)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.updateSettings(updateSettingsModel)

    // Assert
    await expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update settings. Status code: undefined'
    )

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettings => should catch error because returns error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettings')
      .mockRejectedValue(new Error('error'))
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.updateSettings(updateSettingsModel)

    // Assert
    await expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    await expect(spySettingsApiService).rejects.toThrow('error')
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith('Could not update settings. Error: error')

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettingsById => should catch error because returns 300 resopnse', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettings')
      .mockResolvedValue(300)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')

    // Act
    await sut.updateSettings(updateSettingsModel)

    // Assert
    await expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
    await expect(consoleMock).toHaveBeenCalledOnce()
    await expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update settings. Status code: 300'
    )

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })
})
