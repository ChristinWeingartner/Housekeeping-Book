<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useColorModes from '@/composables/useColorModes'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/useSettingsStore'
import type { IUpdateSettings } from '@/interfaces/IUpdateSettings'
import type { ISelectOption } from '@/interfaces/ISelectOption'

const settingsStore = useSettingsStore()
const {
  getPreferredColorMode: savedPreferredColorMode,
  getContributionMembersCount: savedContributionMembersCount
} = storeToRefs(settingsStore)

const { colorModes, getTextByValue } = useColorModes()

const { t } = useI18n()
const contributionMembersCount = ref(savedContributionMembersCount.value)
const preferredColorMode = ref(savedPreferredColorMode.value)

// update contributionMembersCount
watch(savedContributionMembersCount, (newCount) => {
  contributionMembersCount.value = newCount
})
watch(savedPreferredColorMode, (newMode) => {
  preferredColorMode.value = newMode
})

const updateContributionMembersCount = async (value: { id: number; number: number }) => {
  const updateSettingsModel: IUpdateSettings = {
    ContributionMembersCount: value.number,
    PreferredColorMode: preferredColorMode.value
  }
  await settingsStore.updateSettings(updateSettingsModel)
  await settingsStore.getSettings()
}
const updateColorMode = async (option: ISelectOption) => {
  const updateSettingsModel: IUpdateSettings = {
    ContributionMembersCount: savedContributionMembersCount.value,
    PreferredColorMode: option.value.toString()
  }
  await settingsStore.updateSettings(updateSettingsModel)
  await settingsStore.getSettings()
}
</script>

<template>
  <div class="pt-5">
    <h1 class="pb-4 d-flex justify-content-center">{{ t('general.settings') }}</h1>
    <div class="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-4 pt-5">
      <div>
        <span>{{ t('settings.contributionMembersCount') }}</span>
        <EditableNumberInput
          v-model:number="contributionMembersCount"
          id="settings"
          :only-addable="false"
          :can-delete="false"
          :display-rounded-number="false"
          :placeholder="t('settings.contributionMembers')"
          @update-number="updateContributionMembersCount"
        />
      </div>
      <div>
        <span>{{ t('settings.preferredColorMode') }}</span>
        <SingleSelect
          :select-options="colorModes"
          :selected="getTextByValue(preferredColorMode)"
          @update-selected="updateColorMode"
        />
      </div>
    </div>
  </div>
</template>
