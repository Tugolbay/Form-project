<script setup lang="ts">
import { useModalTreatment } from "../../store/ModalTreatment";
import UButton from "../UI/UButton.vue";

defineProps({
  onClose: Function,
});

const modalTreatment = useModalTreatment();
</script>

<template>
  <div
    class="fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
  >
    <div class="py-4 px-12 pb-8 pl-12 bg-white">
      <h3 class="pb-[1rem] text-[1.5rem]">Лекарственные препараты</h3>
      <UButton @click="onClose">Закрыть</UButton>
      <div class="flex flex-col mt-[1.5rem]">
        <input
          class="w-[25vw] h-[4vh] border-[2px] border-[gray]"
          type="search"
          v-model="modalTreatment.quaryTreatment"
          placeholder="Поиск позиции по первым символам"
        />
        <br />
        <input
          class="w-[25vw] h-[4vh] border-[2px] border-[gray]"
          type="search"
          placeholder="Добавить новую запись"
          @keydown.enter="
            modalTreatment.addNewProduct(
              ($event.target as HTMLInputElement).value
            )
          "
          v-model="modalTreatment.newProductTreatment"
        />
      </div>
      <div @click="onClose()">
        <div
          v-for="(product, index) in modalTreatment.quaryProductsTreatment"
          :key="index"
          class="flex justify-between items-center pl-[0.5rem] pr-[0.5rem] w-[25vw] h-[4vh] border-[1.2px] mt-[1rem] cursor-pointer hover:bg-[#3eccffcf]"
          @click="modalTreatment.selectProduct(product)"
        >
          <p>{{ product }}</p>
          <img
            class="w-[1rem] h-[1rem]"
            @click.stop="modalTreatment.removeProduct(product)"
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            alt="deleteImg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.product {
  display: flex;
  align-items: center;
  padding: 0rem 0.5rem 0rem 0.5rem;
  width: 25vw;
  height: 4vh;
  border: 1.2px solid rgb(95, 94, 94);
  margin-top: 1rem;
}

.selected-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 0.5rem 0rem 0.5rem;
  width: 25vw;
  height: 4vh;
  border: 1px solid rgb(95, 94, 94);
  margin-top: 1rem;
  background-color: rgb(185, 237, 250);
}
</style>
