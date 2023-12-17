<script setup lang="ts">
import { useTreatmentHome } from "../../store/TreatmentHome";
import UButton from "../UI/UButton.vue";
import TreatmentHomeModal from "../modal/TreatmentHomeModal.vue";
import TreatmentTotal from "../total/TreatmentTotal.vue";
import { useModalTreatment } from "../../store/ModalTreatment";

const treatmentHome = useTreatmentHome();
const modalTreatment = useModalTreatment();
</script>

<template>
  <div>
    <p class="text-[1.4rem] mt-[4rem]">Лечение на дому</p>
    <p class="mt-[2rem] text-[1.1rem]">Лекарственный препарат</p>

    <div class="flex items-center mt-[1rem]">
      <div
        class="flex items-center w-[25.2rem] h-[2.3rem] border-[2px] border-[gray]"
      >
        <input
          type="text"
          placeholder="Спр.'препараты'"
          v-model="modalTreatment.selectedProductValue"
        />
      </div>

      <div
        class="flex justify-center items-center w-[2.3rem] h-[2.3rem] border-[2px] border-[gray] cursor-pointer ml-[1rem]"
        @click="treatmentHome.onTreatmentHomeModalHandler"
      >
        <img
          class="w-[0.8rem] h-[0.8rem]"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
          alt="burger"
        />
      </div>
    </div>

    <div class="flex mt-[1rem]">
      <div>
        <p>Путь приема</p>
        <div class="flex mt-[0.5rem]">
          <select
            class="flex items-center w-[10rem] h-[2.5rem] border-[2px] border-[gray]"
            v-model="treatmentHome.medicineInfo.pathSelect"
          >
            <option value="Перорально">Перорально</option>
            <option value="Подкожно">Подкожно</option>
            <option value="Артериально">Артериально</option>
          </select>
        </div>
        <ReseptionPathModal v-if="treatmentHome.openReseptionModal" />
      </div>
      <div>
        <div class="ml-6">
          <p>Дозировка</p>
          <div class="flex items-center mt-[0.5rem]">
            <input
              v-model="treatmentHome.medicineInfo.doseTitle"
              class="flex items-center w-[12rem] h-[2.5rem] border-[2px] border-[gray]"
              type="number"
              placeholder="Спр.'Дозы препаратов' "
            />
            <select
              class="flex justify-center items-center w-[4rem] h-[2.5rem] border-[2px] border-[gray] ml-[1rem]"
              v-model="treatmentHome.medicineInfo.selectDose"
            >
              <option value="мкг">мкг</option>
              <option value="мл">мл</option>
              <option value="мг/кг">мг/кг</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-[33rem] justify-between mt-[2rem]">
      <div>
        <p>Кратность приема</p>
        <div class="flex justify-between mt-[0.5rem]">
          <select
            class="flex items-center w-[10rem] h-[2.5rem] border-[2px] border-[gray]"
            v-model="treatmentHome.medicineInfo.selectOption"
          >
            <option value="1 раз в день">1 раз в день</option>
            <option value="2 раза в день">2 раза в день</option>
            <option value="3 раза в день">3 раза в день</option>
          </select>
        </div>
      </div>
      <div>
        <p>Начала приема</p>
        <input
          v-model="treatmentHome.medicineInfo.startDate"
          type="date"
          class="w-[6.8rem] h-[2.3rem] border-[2px] border-[gray] mt-[0.5rem]"
        />
      </div>
      <div>
        <p>Конец приема</p>
        <input
          v-model="treatmentHome.medicineInfo.endDate"
          type="date"
          class="w-[6.8rem] h-[2.3rem] border-[2px] border-[gray] mt-[0.5rem]"
        />
      </div>
    </div>
    <div class="flex w-[32rem] justify-end mt-[1rem]">
      <p>
        Количество дней:
        <span class="text-[rgb(8,184,194)]">{{
          treatmentHome.calculateDaysBetween(
            treatmentHome.medicineInfo.startDate,
            treatmentHome.medicineInfo.endDate
          )
        }}</span>
      </p>
    </div>
    <div class="mt-[3rem]">
      <UButton @click="treatmentHome.submitTreatmentForm">Добавить</UButton>
    </div>
  </div>
  <TreatmentHomeModal
    v-if="treatmentHome.openTreatmentHomeModal"
    :onClose="treatmentHome.onCloseTreatmentHomeModalHandler"
    @addNewProduct="treatmentHome.handleNewProduct"
  />
  <TreatmentTotal
    :selectedProductValue="modalTreatment.selectedProductValue"
    :totalDate="
      typeof treatmentHome.calculateDaysBetween(
        treatmentHome.medicineInfo.startDate,
        treatmentHome.medicineInfo.endDate
      ) === 'number'
        ? Number(
            treatmentHome.calculateDaysBetween(
              treatmentHome.medicineInfo.startDate,
              treatmentHome.medicineInfo.endDate
            )
          )
        : 0
    "
  />
</template>
