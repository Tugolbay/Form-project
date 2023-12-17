<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "../../store/AppStore";
const appStore = useAppStore();
const { resultForm, showHemodialysis } = storeToRefs(appStore);

appStore.getForm();
</script>
<template>
  <div
    class="flex flex-col mdd:w-[35rem] w-[30rem] pl-[1rem] pr-[1rem] border-[2px] border-[gray] mt-[3rem] pb-[2rem]"
  >
    <h4 class="text-center mt-[1rem]">Назначение сеанса гемодеализа</h4>
    <div class="flex justify-between mt-[1.5rem]">
      <div>
        <div class="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Computer_lab_icon.svg/800px-Computer_lab_icon.svg.png"
            alt="image"
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
          />
          <h4>Программа</h4>
        </div>
        <p v-if="showHemodialysis" class="mt-[1rem]">
          {{ resultForm.program }}
        </p>
      </div>
      <div>
        <div class="flex items-center">
          <img
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
            src="https://st2.depositphotos.com/47577860/47003/v/450/depositphotos_470036110-stock-illustration-test-tube-medicine-glass-icon.jpg"
            alt=""
          />
          <h4>Диализатор</h4>
        </div>
        <p v-if="showHemodialysis" class="mt-[1rem]">
          {{ resultForm.dialyzer }}
        </p>
      </div>
      <div>
        <div class="flex items-center">
          <img
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
            src="https://cdn-icons-png.flaticon.com/512/124/124676.png"
            alt="image"
          />
          <h4>Концентратор Обьем</h4>
        </div>
        <p v-if="showHemodialysis" class="mt-[1rem]">
          {{ resultForm.hubs }} {{ resultForm.volume }}
        </p>
      </div>
    </div>
    <div class="flex justify-between mt-[2rem]">
      <div>
        <div class="flex items-center">
          <img
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
            src="https://svgsilh.com/svg_v2/1294131.svg"
            alt="image"
          />
          <h4>Игла/Катетер</h4>
        </div>
        <p v-if="showHemodialysis" class="mt-[1rem]">{{ resultForm.needle }}</p>
      </div>
      <div>
        <div class="flex items-center">
          <img
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
            src="https://svgsilh.com/svg_v2/1294131.svg"
            alt="image"
          />
          <h4>Типы иглы/катетеров</h4>
        </div>
        <p v-if="showHemodialysis" class="mt-[1rem]">
          {{ resultForm.typeNeedleText }}
        </p>
      </div>
      <div>
        <div class="flex items-center">
          <img
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
            src="https://labstore.ru/_nuxt/img/product-stub-large.6a46e8d.svg"
            alt="image"
          />
          <h4>Бикорбанат мл</h4>
        </div>
        <p v-if="showHemodialysis" class="mt-[1rem]">
          {{ resultForm.bicorbanate }} {{ resultForm.selectOption }}
        </p>
      </div>
    </div>
    <div class="flex w-[21rem] justify-between mt-[1.5rem]">
      <div>
        <div class="flex items-center">
          <img
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
            src="https://icons.veryicon.com/png/o/miscellaneous/ghost-icon/weight-24.png"
            alt="image"
          />
          <h4>Сухой вес кг.</h4>
        </div>
        <p v-if="showHemodialysis" class="mt-[1rem]">
          {{ resultForm.weight }}
        </p>
      </div>
      <div>
        <div class="flex items-center ml-[2rem]">
          <img
            class="w-[1rem] h-[1rem] mr-[0.5rem]"
            src="https://labstore.ru/_nuxt/img/product-stub-large.6a46e8d.svg"
            alt="image"
          />
          <h4>Антикогауляция ед.</h4>
        </div>
        <p class="ml-[3rem] mt-[1rem]" v-if="showHemodialysis">
          {{ resultForm.anticoagulation }} {{ resultForm.volumeUnits }}
        </p>
      </div>
    </div>
  </div>
</template>
