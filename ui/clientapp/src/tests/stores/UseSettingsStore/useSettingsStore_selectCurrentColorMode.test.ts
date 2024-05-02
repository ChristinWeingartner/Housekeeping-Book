import { describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSettingsStore } from '@/stores/useSettingsStore'

describe('useSettingsStore => selectCurrentColorMode', () => {
  it('selectCurrentColorMode => should set mode light', () => {
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
    sut.selectCurrentColorMode("light")

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
  })

  it('selectCurrentColorMode => should set mode dark', () => {
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
    sut.selectCurrentColorMode("dark")

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("dark")
  })

  it('selectCurrentColorMode => should NOT set mode test', () => {
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
    sut.selectCurrentColorMode("test")

    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(
      'Could not select current color mode test. The mode is not valid.'
    )

    // Clean up after the test
    consoleMock.mockReset()
  })
})
