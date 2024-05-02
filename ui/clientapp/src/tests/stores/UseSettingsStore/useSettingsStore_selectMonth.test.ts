import { describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSettingsStore } from '@/stores/useSettingsStore'

describe('useSettingsStore => selectMonth', () => {
  it('selectMonth => should set month 0', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    sut.selectMonth(0)

    // Assert
    expect(sut.monthId).toEqual(0)
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
  })

  it('selectMonth => should set month 6', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    sut.selectMonth(6)

    // Assert
    expect(sut.monthId).toEqual(6)
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
  })

  it('selectMonth => should NOT set month 12', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    sut.selectMonth(12)

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not select month 12. The value is not valid.'
    )

    // Clean up after the test
    consoleMock.mockReset()
  })

  it('selectMonth => should NOT set month -1', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    // check states before act
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")

    // Act
    sut.selectMonth(-1)

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not select month -1. The value is not valid.'
    )

    // Clean up after the test
    consoleMock.mockReset()
  })
})
