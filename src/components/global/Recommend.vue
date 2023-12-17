<script setup lang="ts">
import { useRecomendedStore } from "../../store/RecomendedStore";
import UButton from "../UI/UButton.vue";

const recomendedStore = useRecomendedStore();
</script>
<template>
  <p class="text-[1.4rem] mt-12 pb-[1rem]">Рекомендации</p>
  <div class="flex items-center">
    <input
      v-model="recomendedStore.dataRecomended.inputVaue"
      class="w-[34rem] h-[2.3rem] border-[2px] border-[grey]"
      type="text"
      placeholder="Текст рекомендации пациенту"
    />
  </div>
  <div>
    <textarea
      v-model="recomendedStore.dataRecomended.textarea"
      class="w-[34rem] mt-4 border-[2px] border-[grey]"
      cols="30"
      rows="8"
      placeholder="Рекомендации лечащего врача пациенту"
    ></textarea>
  </div>
  <div class="flex w-[35rem] mt-4 pb-8 justify-between">
    <input
      class="border-0 outline-none"
      type="date"
      v-model="recomendedStore.dataRecomended.recomendationDate"
    />

    <img
      class="w-[1.2rem] h-[1.2rem] ml-4"
      src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
      alt=""
    />
    <input
      v-model="recomendedStore.dataRecomended.name"
      class="inpFooter"
      type="text"
      placeholder="ФИО лечащего врача"
    />

    <input
      v-model="recomendedStore.dataRecomended.jobTitle"
      class="border-0 outline-none"
      type="text"
      placeholder="Должность"
    />
  </div>
  <UButton @click="recomendedStore.handleSubmitFooter"
    >Сохранить назначение</UButton
  >
</template>
