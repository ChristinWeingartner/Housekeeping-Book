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
    expect(sut.preferredColorMode).toEqual('dark')
    expect(sut.currentColorMode).toEqual('dark')
  })
})
