<script setup lang="ts">
import SessionApointment from "../components/global/SessionAppointment.vue";
import Appointment from "../components/global/Appointment.vue";
import Session from "./global/Session.vue";
import Recomended from "./global/Recommend.vue";
</script>

<template>
  <div class="flex justify-center mt-[2rem]">
    <div
      class="mdd:pl-[3rem] pl-[2rem] pr-[3rem] pb-[3rem] md:w-[70%] w-full h-[100%] bg-white"
    >
      <SessionApointment />
      <Appointment />
      <Session />
      <Recomended />
    </div>
  </div>
</template>
