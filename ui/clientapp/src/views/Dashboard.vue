<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import useYearOptions from '@/composables/useYearOptions'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { useInvoiceStore } from '../stores/useInvoiceStore.ts'
import { onBeforeMount } from 'vue'
import { months, monthCategories } from '@/constants/Months'
import type { ISelectOption } from '@/interfaces/ISelectOption'

const settingsStore = useSettingsStore()
const { getYear: year, getContributionMembersCount: contributionMembersCount } =
  storeToRefs(settingsStore)
const invoiceStore = useInvoiceStore()
const { getMonthTotals: monthTotals, getAnnualMonthlyAverage: annualMonthlyAverage } =
  storeToRefs(invoiceStore)

const { yearOptions } = useYearOptions()

onBeforeMount(() => {
  invoiceStore.getMonthTotalsForYear(year.value)
})

const { t } = useI18n()

const updateYear = (option: ISelectOption) => {
  const year = option.value.toString()
  settingsStore.selectYear(year)
  invoiceStore.getMonthTotalsForYear(year)
}
</script>

<template>
  <div class="dashboard pt-5">
    <h1 class="pb-4 d-flex justify-content-center">{{ t('general.dashboard') }}</h1>
    <div class="d-flex flex-column flex-sm-row gap-4 gap-sm-5 pt-5 pb-0 pb-sm-3">
      <div class="col">
        <!-- year -->
        <SingleSelect
          :select-options="yearOptions"
          :selected="year"
          @update-selected="updateYear"
        />
      </div>
      <div class="col d-flex justify-content-start justify-content-sm-end">
        <!-- empty placeholder for now -->
      </div>
    </div>

    <AnnualMonthlyAverage
      :annual-monthly-average="annualMonthlyAverage"
      :contribution-members="contributionMembersCount"
    />

    <div class="border">
      <ChartComponent
        :series="monthTotals"
        :categories="monthCategories"
        :chart-title="t('dashboard.monthlyInvoices')"
        :series-title="t('general.total')"
      />
    </div>

    <div class="d-flex flex-wrap flex-column flex-md-row gap-3 pt-3">
      <MonthOverview
        v-for="(month, index) in months"
        :key="index"
        :month="t('general.' + month.name)"
        :sum="monthTotals[index]"
        :contribution-members="contributionMembersCount"
        class="item"
      />
    </div>
  </div>
</template>
