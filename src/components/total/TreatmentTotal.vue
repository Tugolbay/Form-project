<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTreatmentHome } from "../../store/TreatmentHome";

defineProps({
  totalDate: Number,
  selectedProductValue: String,
});
const treatmentHome = useTreatmentHome();
const { resultForm, showTreatmentHemodialysis } = storeToRefs(treatmentHome);
</script>

<template>
  <div
    v-if="showTreatmentHemodialysis"
    class="w-[30rem] h-[12rem] border-[2px] border-[gray] mt-[2rem] pl-[2rem] pr-[2rem]"
  >
    <div class="flex w-[25rem] justify-between mt-[2rem]">
      <p>{{ selectedProductValue }}</p>
      <p>
        {{ resultForm.pathSelect }} {{ resultForm.doseTitle }}
        {{ resultForm.selectDose }}
      </p>
    </div>
    <div class="flex justify-between mt-[1rem]">
      <p>{{ resultForm.selectOption }}</p>
      <p>c {{ resultForm.startDate }} по {{ resultForm.endDate }}</p>
      <p>{{ totalDate }} дней</p>
    </div>
  </div>
</template>
