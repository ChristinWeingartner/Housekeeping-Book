import type { IUpdateSettings } from '@/interfaces/IUpdateSettings'
import SettingsApiService from '@/services/api/SettingsApiService'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi } from 'vitest'

describe('useSettingsStore => updateSettingsById', () => {
  const updateSettingsModel: IUpdateSettings = {
    SettingsId: 3,
    ContributionMembersCount: 4,
    PreferredColorMode: "dark"
  }

  it('updateSettingsById => should catch log because returns 200 resopnse', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettingsById')
      .mockResolvedValue(200)
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    await sut.updateSettingsById(updateSettingsModel)

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith('updateSettingsById was successful!')

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettingsById => should catch log because returns 201 resopnse', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettingsById')
      .mockResolvedValue(201)
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    await sut.updateSettingsById(updateSettingsModel)

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith('updateSettingsById was successful!')

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettingsById => should catch error because returns undefined', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettingsById')
      .mockResolvedValue(undefined)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    await sut.updateSettingsById(updateSettingsModel)

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update settings by id 3. Status code: undefined'
    )

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettingsById => should catch error because returns error', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettingsById')
      .mockRejectedValue(new Error('error'))
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    await sut.updateSettingsById(updateSettingsModel)

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(spySettingsApiService).rejects.toThrow('error')
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update settings by id 3. Error: error'
    )

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })

  it('updateSettingsById => should catch error because returns 300 resopnse', async () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    const spySettingsApiService = vi
      .spyOn(SettingsApiService, 'updateSettingsById')
      .mockResolvedValue(300)
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    await sut.updateSettingsById(updateSettingsModel)

    // Assert
    expect(spySettingsApiService).toHaveBeenCalledTimes(1)
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not update settings by id 3. Status code: 300'
    )

    // Clean up after the test
    spySettingsApiService.mockRestore()
    consoleMock.mockReset()
  })
})
