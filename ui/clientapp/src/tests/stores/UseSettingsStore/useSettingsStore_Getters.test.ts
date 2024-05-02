import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSettingsStore } from '@/stores/useSettingsStore'

describe('useSettingsStore => getters, default state', () => {
  it('useSettingsStore => should return default states', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()
    // Assert
    expect(sut.monthId).toEqual(new Date().getMonth())
    expect(sut.year).toEqual(new Date().getFullYear().toString())
    expect(sut.contributionMembersCount).toEqual(2)
    expect(sut.preferredColorMode).toEqual("light")
    expect(sut.currentColorMode).toEqual("light")
  })

  it('useSettingsStore => should return correct values for getters', () => {
    // Arrange
    setActivePinia(createPinia())
    const sut = useSettingsStore()

    // Assert
    expect(sut.getMonthId).toEqual(new Date().getMonth())
    expect(sut.getYear).toEqual(new Date().getFullYear().toString())
    expect(sut.getContributionMembersCount).toEqual(2)
    expect(sut.getPreferredColorMode).toEqual("light")
    expect(sut.getCurrentColorMode).toEqual("light")
  })
})
