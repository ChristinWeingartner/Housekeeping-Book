<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps({
  series: {
    type: Array<number>,
    required: true
  },
  categories: {
    type: Array<string>,
    required: true
  },
  chartTitle: {
    type: String,
    required: true
  },
  seriesTitle: {
    type: String,
    required: true
  }
})

const settingsStore = useSettingsStore()
const { currentColorMode: savedCurrentColorMode } = storeToRefs(settingsStore)

// default colors
let color1 = ref('#e1b80d')
let color2 = ref('#d5c3aa')
let color3 = ref('#867666')

// Recalculate chartOptions when color mode changes or component is mounted
// and apply the correct color-mode colors
watchEffect(() => {
  switch (savedCurrentColorMode.value) {
    case 'light':
      color1.value = '#e1b80d'
      color2.value = '#d5c3aa'
      color3.value = '#867666'
      break
    case 'dark':
      color1.value = '#6fb98f'
      color2.value = '#004445'
      color3.value = '#2c7873'
      break
  }
})

const chartOptions = computed(() => {
  return {
    chart: {
      background: 'transparent'
    },
    legend: {
      show: false
    },
    fill: {
      colors: [color1.value],
      opacity: 0.9,
      type: 'solid',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [color1.value],
        inverseColors: true,
        opacityFrom: 0,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: []
      }
    },
    grid: {
      show: true,
      borderColor: color2.value,
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 20,
        bottom: 5,
        left: 10
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: [color3.value]
      }
    },
    xaxis: {
      categories: props.categories,
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      },
      labels: {
        style: {
          colors: color3.value
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: color3.value
        }
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 3,
        dataLabels: {
          position: 'top'
        }
      }
    },
    title: {
      text: props.chartTitle,
      floating: true,
      offsetY: 230,
      align: 'center',
      style: {
        color: color3.value
      }
    },
    tooltip: {
      enabled: false
    }
  }
})
</script>

<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="250"
      :options="chartOptions"
      :series="[{ name: seriesTitle, data: series }]"
    ></apexchart>
  </div>
</template>
