<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onBeforeMount } from 'vue'
import { useSettingsStore } from './stores/useSettingsStore'

const { t } = useI18n()
const settingsStore = useSettingsStore()

// load settings one time in high component, so it doesn't need to be loaded multiple times
onBeforeMount(() => {
  settingsStore.getSettings()
})
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>{{ t('general.housekeepingBook') }}</h1>
      <NavBar />
    </div>
  </header>

  <RouterView />
</template>
