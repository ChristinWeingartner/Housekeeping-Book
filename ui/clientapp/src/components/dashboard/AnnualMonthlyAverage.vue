<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps({
  annualMonthlyAverage: {
    type: Number,
    required: true
  },
  contributionMembers: {
    type: Number,
    required: true
  },
  isCurrentYearSelected: {
    type: Boolean,
    required: true
  }
})

const { t } = useI18n()
</script>
<template>
  <div v-if="annualMonthlyAverage > 0" class="annual-monthly-average border p-3 mb-3">
    <h2>{{ t('dashboard.monthlyAverage') }}</h2>

    <div class="d-flex flex-column flex-sm-row justify-content-between px-0 px-md-5 gap-3">
      <div class="d-flex flex-column">
        <span
          >{{ t('dashboard.forTheSelectedYear')
          }}<span v-if="isCurrentYearSelected">{{
            ' ' + t('dashboard.withoutCurrentMonth')
          }}</span></span
        >
        <span class="fw-bold fs-4 sum">{{ annualMonthlyAverage.toFixed(2) }} €</span>
      </div>

      <ContributionPerPerson
        v-if="annualMonthlyAverage !== undefined && annualMonthlyAverage > 0"
        :sum="annualMonthlyAverage"
        :contribution-members="contributionMembers"
      />
    </div>
  </div>
</template>
