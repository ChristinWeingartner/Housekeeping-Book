<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '../stores/useInvoiceStore.ts'
import { useSettingsStore } from '@/stores/useSettingsStore'
import useMonthOptions from '../composables/useMonthOptions.ts'
import useYearOptions from '@/composables/useYearOptions'
import { ref, watch, onBeforeMount } from 'vue'
import type { ISelectOption } from '@/interfaces/ISelectOption'

const invoiceStore = useInvoiceStore()
const {
  getInvoices: invoices,
  getComment: savedComment,
  getMonthlySum: sum
} = storeToRefs(invoiceStore)
const settingsStore = useSettingsStore()
const {
  getMonthId: month,
  getYear: year,
  getContributionMembersCount: contributionMembers
} = storeToRefs(settingsStore)

const { monthOptions, getTextByValue } = useMonthOptions()
const { yearOptions } = useYearOptions()

onBeforeMount(() => {
  invoiceStore.getInvoicesPerMonthAndYear(month.value, year.value)
  invoiceStore.getCommentPerMonthAndYear(month.value, year.value)
})

const { t } = useI18n()
const comment = ref(savedComment.value)
// update comment because
// comment is loaded faster than getComment from the store
watch(savedComment, (newComment) => {
  comment.value = newComment
})

const deleteInvoice = async (id: number) => {
  await invoiceStore.deleteInvoiceById(id)
  await invoiceStore.getInvoicesPerMonthAndYear(month.value, year.value)
}
const updateInvoice = async (value: { id: number; number: number }) => {
  await invoiceStore.updateInvoiceById(value.id, value.number)
  await invoiceStore.getInvoicesPerMonthAndYear(month.value, year.value)
}
const updateComment = (comment: string) => {
  invoiceStore.updateCommentByMonthAndYear(month.value, year.value, comment)
}
const addInvoice = async (invoiceTotal: number) => {
  await invoiceStore.addInvoiceToMonthAndYear(month.value, year.value, invoiceTotal)
  await invoiceStore.getInvoicesPerMonthAndYear(month.value, year.value)
}
const updateMonth = async (option: ISelectOption) => {
  const month = parseInt(option.value.toString())
  settingsStore.selectMonth(month)
  await invoiceStore.getInvoicesPerMonthAndYear(month, year.value)
  await invoiceStore.getCommentPerMonthAndYear(month, year.value)
}
const updateYear = async (option: ISelectOption) => {
  const year = option.value.toString()
  settingsStore.selectYear(year)
  await invoiceStore.getInvoicesPerMonthAndYear(month.value, year)
  await invoiceStore.getCommentPerMonthAndYear(month.value, year)
}
</script>

<template>
  <div class="edit-month pt-5">
    <h1 class="pb-4 d-flex justify-content-center">{{ t('general.editMonth') }}</h1>
    <div class="d-flex flex-column flex-md-row py-5 gap-4 gap-md-5">
      <!-- month -->
      <SingleSelect
        :select-options="monthOptions"
        :selected="getTextByValue(month)"
        @update-selected="updateMonth"
      />
      <!-- year -->
      <SingleSelect :select-options="yearOptions" :selected="year" @update-selected="updateYear" />
    </div>
    <div class="d-flex flex-column flex-md-row invoices pb-3 gap-5">
      <div class="pb-5">
        <!-- invoices count -->
        <NumberOfInvoices :invoices="invoices" />
        <!-- comment -->
        <EditableComment v-model:comment="comment" id="jannuary" @save-comment="updateComment" />
      </div>

      <div class="px-0 px-sm-5 px-md-0 mx-0 mx-sm-5 mx-md-0">
        <!-- invoices -->
        <InvoicesPerMonthList
          :invoices="invoices"
          @delete-number="deleteInvoice"
          @update-number="updateInvoice"
          @add-number="addInvoice"
        />
        <!--sum  -->
        <MonthlySum :sum="sum" :show-text="false" />
        <div class="pt-4">
          <ContributionPerPerson
            v-if="sum !== undefined && sum > 0"
            :sum="sum"
            :contributionMembers="contributionMembers"
          />
        </div>
      </div>
    </div>
  </div>
</template>
