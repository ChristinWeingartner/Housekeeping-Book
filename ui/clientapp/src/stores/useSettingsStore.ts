import type { IUpdateSettings } from '@/interfaces/IUpdateSettings'
import SettingsApiService from '@/services/api/SettingsApiService'
import { defineStore } from 'pinia'

export interface SettingsStoreState {
  monthId: number
  year: string
  contributionMembersCount: number
  preferredColorMode: string
  currentColorMode: string
}

export const useSettingsStore = defineStore({
  id: 'settings-store',
  state: (): SettingsStoreState => ({
    monthId: new Date().getMonth(),
    year: new Date().getFullYear().toString(),
    contributionMembersCount: 2,
    preferredColorMode: 'dark',
    currentColorMode: 'dark'
  }),
  actions: {
    selectMonth(value: number) {
      if (value >= 0 && value < 12) {
        this.$patch((state) => {
          state.monthId = value
        })
      } else {
        console.error('Could not select month ' + value + '. The value is not valid.')
      }
    },
    selectYear(value: string) {
      if (value && parseInt(value) >= 2016 && parseInt(value) < 2030) {
        this.$patch((state) => {
          state.year = value
        })
      } else {
        console.error('Could not select year ' + value + '. The value is not valid.')
      }
    },
    selectCurrentColorMode(mode: string) {
      if (mode === 'light' || mode === 'dark') {
        this.$patch((state) => {
          state.currentColorMode = mode
        })
      } else {
        console.error('Could not select current color mode ' + mode + '. The mode is not valid.')
      }
    },
    async updateSettings(updateSettingsModel: IUpdateSettings) {
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
    },
    async getSettings() {
      try {
        const settings = await SettingsApiService.getSettings()

        if (settings) {
          this.$patch((state) => {
            ;(state.contributionMembersCount = settings.ContributionMembersCount),
              (state.preferredColorMode = settings.PreferredColorMode)
          })
        } else {
          console.error('Could not get settings. The response is undefined.')
        }
      } catch (e) {
        console.error('Could not get settings. ' + e)
      }
    }
  }
})
