<script setup lang="ts">
import ApointmentModal from "../modal/ApoinmentModal.vue";
import { useAppointmentStore } from "../../store/AppointmentStore";
import UButton from "../UI/UButton.vue";

const appointmentStore = useAppointmentStore();
appointmentStore.getForm();
</script>

<template>
  <div>
    <h1 class="text-[1.4rem] mt-[3rem]">Назначение после сеанса</h1>

    <div class="flex items-center">
      <div
        class="flex justify-center items-center w-[10rem] h-[2.5rem] border-[2px] border-[gray] cursor-pointer mt-[2rem]"
      >
        <p class="flex justify-center items-center w-[8rem]">
          {{ appointmentStore.formValues.drug }}
        </p>
      </div>
      <div
        @click="appointmentStore.openModalHandler"
        class="flex justify-center items-center w-[2.3rem] h-[2.5rem] border-[2px] border-[gray] cursor-pointer ml-[1rem] mt-[2rem]"
      >
        <img
          class="w-[0.8rem] h-[0.8rem]"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
          alt="burger"
        />
      </div>
    </div>

    <ApointmentModal
      v-if="appointmentStore.closeModalAli"
      :closeModalHandler="appointmentStore.closeModalHandler"
      :selectedItem="appointmentStore.selectedItem"
      :onItemSelected="appointmentStore.onItemSelected"
      :closeModalAli="appointmentStore.closeModalAli"
    />

    <div class="mt-4 flex items-center gap-8">
      <div>
        <h1>Путь приема</h1>
        <select
          v-model="appointmentStore.formValues.path"
          type="text"
          id="field2"
          class="w-[10rem] h-[2.5rem] border-[2px] border-[gray] mt-4"
        >
          <option value="option1">Спр. "Путь приема"</option>
          <option value="option2">Перорально</option>
          <option value="option3">Подкожно</option>
          <option value="option4">Артериально</option>
        </select>
      </div>

      <div>
        <h1>Дозировка</h1>
        <select
          v-model="appointmentStore.formValues.dosage"
          type="text"
          id="field2"
          class="w-[10rem] h-[2.5rem] border-[2px] border-[gray] mt-4"
        >
          <option value="option1">Спр. "Дозы препаратов"</option>
          <option value="option2">мкг</option>
          <option value="option3">мл</option>
          <option value="option4">мг/кг</option>
        </select>
      </div>
    </div>

    <div class="mt-[2rem]">
      <h1>Номера сеансов:</h1>
      <div class="flex gap-2 mt-4">
        <button
          v-for="sessionNumber in [1, 2, 3, 4, 5, 6, 7]"
          :key="sessionNumber"
          :class="{
            'w-12 h-12 text-white bg-blue-500':
              appointmentStore.isSelected(sessionNumber),
            'w-12 h-12 border-[2px] border-[#bbbbbb]':
              !appointmentStore.isSelected(sessionNumber),
          }"
          @click="appointmentStore.toggleSelection(sessionNumber)"
        >
          {{ sessionNumber }}
        </button>
      </div>
    </div>

    <div class="flex gap-4 mt-[2rem] items-center">
      <div>
        <h1>Начало приема</h1>
        <input
          v-model="appointmentStore.formValues.startDate"
          type="date"
          class="border-[2px] border-[#bababa] h-[2.5rem] mt-[1rem]"
        />
      </div>
      <div>
        <h1>Конец приема</h1>
        <input
          v-model="appointmentStore.formValues.endDate"
          type="date"
          class="border-[2px] border-[#bababa] h-[2.5rem] mt-[1rem]"
        />
      </div>
      <p class="mt-[2rem]">Количество сеансов:</p>
    </div>

    <UButton class="mt-[2rem]" @click="appointmentStore.submitForm"
      >Сформировать</UButton
    >

    <p class="mt-[2rem]">Список назначениий после сеансов</p>

    <table class="mt-4">
      <tr>
        <td
          class="border-[2px] border-[#a2a2a2] mdd:pl-[0.4rem] pl-[0.5rem] mdd:pr-[0.4rem] pr-[0.5rem] mdd:text-[0.9rem] text-[0.7rem]"
        >
          Лекарственный препарат
        </td>
        <td
          class="border-[2px] border-[grey] mdd:pl-[0.4rem] pl-[0.5rem] mdd:pr-[0.4rem] pr-[0.5rem] mdd:text-[0.9rem] text-[0.7rem]"
        >
          Путь приема
        </td>
        <td
          class="border-[2px] border-[grey] mdd:pl-[0.4rem] pl-[0.5rem] mdd:pr-[0.4rem] pr-[0.5rem] mdd:text-[0.9rem] text-[0.7rem]"
        >
          Дозировка
        </td>
        <td
          class="border-[2px] border-[grey] mdd:pl-[0.4rem] pl-[0.5rem] mdd:pr-[0.4rem] pr-[0.5rem] mdd:text-[0.9rem] text-[0.7rem]"
        >
          Начало приема
        </td>
        <td
          class="border-[2px] border-[grey] mdd:pl-[0.4rem] pl-[0.5rem] mdd:pr-[0.4rem] pr-[0.5rem] mdd:text-[0.9rem] text-[0.7rem]"
        >
          Конец приема
        </td>
        <td
          class="border-[2px] border-[grey] mdd:pl-[0.4rem] pl-[0.5rem] mdd:pr-[0.4rem] pr-[0.5rem] mdd:text-[0.9rem] text-[0.7rem]"
        >
          Номер сеанса
        </td>
        <td
          class="border-[2px] border-[grey] mdd:pl-[0.4rem] pl-[0.5rem] mdd:pr-[0.4rem] pr-[0.5rem] mdd:text-[0.9rem] text-[0.7rem]"
        >
          дней
        </td>
        <td
          class="border-[2px] border-[grey] mdd:text-[0.8rem] text-[0.7rem]"
        ></td>
      </tr>

      <tr v-for="session in appointmentStore.sessionsData" :key="session.id">
        <td
          class="border-[2px] border-[#a2a2a2] px-[0.2rem] mdd:text-[0.8rem] text-[0.7rem]"
        >
          {{ session.drug }}
        </td>
        <td
          class="border-[2px] border-[#a2a2a2] px-[0.2rem] mdd:text-[0.8rem] text-[0.7rem]"
        >
          {{ session.path }}
        </td>
        <td
          class="border-[2px] border-[grey] px-[0.2rem] mdd:text-[0.8rem] text-[0.7rem]"
        >
          {{ session.dosage }}
        </td>
        <td
          class="border-[2px] border-[grey] px-[0.2rem] mdd:text-[0.8rem] text-[0.7rem]"
        >
          {{ session.startDate }}
        </td>
        <td
          class="border-[2px] border-[grey] px-[0.2rem] mdd:text-[0.8rem] text-[0.7rem]"
        >
          {{ session.endDate }}
        </td>
        <td
          class="border-[2px] border-[grey] px-[0.2rem] mdd:text-[0.8rem] text-[0.7rem]"
        >
          {{ session.selectedSessions }}
        </td>
        <td
          class="border-[2px] border-[grey] px-[0.2rem] mdd:text-[0.8rem] text-[0.7rem]"
        >
          {{
            appointmentStore.calculateDays(session.startDate, session.endDate)
          }}
        </td>
        <td class="border-[2px] border-[grey] pl-[1rem] pr-[1rem]">
          <img
            class="w-[1rem] h-[1rem] cursor-pointer"
            @click="appointmentStore.deleteSession(session.id)"
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            alt="deleteImg"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
