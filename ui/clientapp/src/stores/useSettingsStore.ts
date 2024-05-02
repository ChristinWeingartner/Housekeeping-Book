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

const DefaultSettingsState: SettingsStoreState = {
  monthId: new Date().getMonth(),
  year: new Date().getFullYear().toString(),
  contributionMembersCount: 2,
  preferredColorMode: 'light',
  currentColorMode: 'light'
}

export const useSettingsStore = defineStore({
  id: 'settings-store',
  state: (): SettingsStoreState => ({
    ...DefaultSettingsState
  }),
  getters: {
    getMonthId: (state): number => state.monthId,
    getYear: (state): string => state.year,
    getContributionMembersCount: (state): number => state.contributionMembersCount,
    getPreferredColorMode: (state): string => state.preferredColorMode,
    getCurrentColorMode: (state): string => state.currentColorMode
  },
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
    async updateSettingsById(updateSettingsModel: IUpdateSettings) {
      try {
        const response = await SettingsApiService.updateSettingsById(updateSettingsModel)

        if (response && response >= 200 && response < 300) {
          console.log('updateSettingsById was successful!')
        } else {
          console.error(
            'Could not update settings by id ' +
              updateSettingsModel.SettingsId +
              '. Status code: ' +
              response
          )
        }
      } catch (e) {
        console.error(
          'Could not update settings by id ' + updateSettingsModel.SettingsId + '. ' + e
        )
      }
    },
    async getSettingsById(id: number) {
      try {
        const settings = await SettingsApiService.getSettingsById(id)

        if (settings) {
          this.$patch((state) => {
            ;(state.contributionMembersCount = settings.ContributionMembersCount),
              (state.preferredColorMode = settings.PreferredColorMode)
          })
        } else {
          console.error('Could not get settings by id ' + id + '. The response is undefined.')
        }
      } catch (e) {
        console.error('Could not get settings by id ' + id + '. ' + e)
      }
    }
  }
})
