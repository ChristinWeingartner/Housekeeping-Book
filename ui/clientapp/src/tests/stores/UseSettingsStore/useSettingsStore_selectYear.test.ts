import { describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSettingsStore } from '@/stores/useSettingsStore'

describe('useSettingsStore => selectYear', () => {
  it('selectYear => should set year 2016', () => {
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
    sut.selectYear('2016')

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual('2016')
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
  })

  it('selectYear => should set year 2024', () => {
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
    sut.selectYear('2024')

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual('2024')
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
  })

  it('selectYear => should NOT set month 2030', () => {
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
    sut.selectYear('2030')

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not select year 2030. The value is not valid.'
    )

    // Clean up after the test
    consoleMock.mockReset()
  })

  it('selectYear => should NOT set month 2015', () => {
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
    sut.selectYear('2015')

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not select year 2015. The value is not valid.'
    )

    // Clean up after the test
    consoleMock.mockReset()
  })
})
