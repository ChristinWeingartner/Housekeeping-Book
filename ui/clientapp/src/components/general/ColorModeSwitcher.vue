<script setup lang="ts">
import useColorModes from '@/composables/useColorModes'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const settingsStore = useSettingsStore()
const { getPreferredColorMode: savedPreferredColorMode } = storeToRefs(settingsStore)

// change the color mode when user switched the color mode
watch(savedPreferredColorMode, (newMode) => {
  changeMode(newMode)
})

const { t } = useI18n()
const { colorModes } = useColorModes()

const changeMode = (mode: string) => {
  document.documentElement.setAttribute('data-bs-theme', mode.toLowerCase())
  settingsStore.selectCurrentColorMode(mode)
}
</script>
<template>
  <BDropdown
    :text="t('general.theme')"
    variant="primary"
    size="md"
    class="color-mode-switcher"
    menu-class="w-100"
  >
    <BDropdownItem
      v-for="(mode, index) in colorModes"
      :key="index"
      @click="changeMode(mode.value.toString())"
      variant="primary"
      >{{ mode.text }}</BDropdownItem
    >
  </BDropdown>
</template>
