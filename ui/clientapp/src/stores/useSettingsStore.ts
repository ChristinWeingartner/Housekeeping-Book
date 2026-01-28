import type { IUpdateSettings } from '@/interfaces/IUpdateSettings'
import SettingsApiService from '@/services/api/SettingsApiService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings-store', () => {
  const monthId = ref<number>(new Date().getMonth())
  const year = ref<string>(new Date().getFullYear().toString())
  const contributionMembersCount = ref<number>(2)
  const preferredColorMode = ref<string>('dark')
  const currentColorMode = ref<string>('dark')

  function selectMonth(value: number) {
    if (value >= 0 && value < 12) {
      monthId.value = value
    } else {
      console.error('Could not select month ' + value + '. The value is not valid.')
    }
  }
  function selectYear(value: string) {
    if (value && parseInt(value) >= 2016 && parseInt(value) < 2030) {
      year.value = value
    } else {
      console.error('Could not select year ' + value + '. The value is not valid.')
    }
  }
  function selectCurrentColorMode(mode: string) {
    if (mode === 'light' || mode === 'dark') {
      currentColorMode.value = mode
    } else {
      console.error('Could not select current color mode ' + mode + '. The mode is not valid.')
    }
  }
  async function updateSettings(updateSettingsModel: IUpdateSettings) {
    try {
      const response = await SettingsApiService.updateSettings(updateSettingsModel)

      if (response && response >= 200 && response < 300) {
        console.log('updateSettings was successful!')
      } else {
        console.error('Could not update settings. Status code: ' + response)
      }
    } catch (e) {
      console.error('Could not update settings. ' + e)
    }
  }
  async function getSettings() {
    try {
      const settings = await SettingsApiService.getSettings()

      if (settings) {
        contributionMembersCount.value = settings.ContributionMembersCount
        preferredColorMode.value = settings.PreferredColorMode
      } else {
        console.error('Could not get settings. The response is undefined.')
      }
    } catch (e) {
      console.error('Could not get settings. ' + e)
    }
  }

  return {
    monthId,
    year,
    contributionMembersCount,
    preferredColorMode,
    currentColorMode,
    selectMonth,
    selectYear,
    selectCurrentColorMode,
    updateSettings,
    getSettings
  }
})
