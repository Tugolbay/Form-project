<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import UButton from "../UI/UButton.vue";

const props = defineProps({
  closeModalHandler: Function,
  onItemSelected: Function,
  selectedItem: String,
});

const closeModal = () => {
  props.closeModalHandler();
};

const selectedProductApoinment = ref<string>("");

const selectProduct = (product: string) => {
  selectedProductApoinment.value = product;
  if (props.closeModalHandler) {
    closeModal();
  }
  props.onItemSelected(selectedProductApoinment.value);
};

const productsApoinment = ref<string[]>([]);
const quary = ref<string>("");
const newProduct = ref<string>("");

onMounted(() => {
  const storedProducts = localStorage.getItem("productsApoinment");
  if (storedProducts) {
    productsApoinment.value = JSON.parse(storedProducts);
  }
});

const quaryProductsApoinment = computed(() => {
  return productsApoinment.value.filter((product) =>
    product.includes(quary.value)
  );
});

const addNewProduct = () => {
  if (newProduct.value.trim() !== "") {
    productsApoinment.value.push(newProduct.value);
    localStorage.setItem(
      "productsApoinment",
      JSON.stringify(productsApoinment.value)
    );
    newProduct.value = "";
  }
};

const removeProduct = (product: string) => {
  const index = productsApoinment.value.indexOf(product);
  if (index !== -1) {
    productsApoinment.value.splice(index, 1);
    localStorage.setItem(
      "productsApoinment",
      JSON.stringify(productsApoinment.value)
    );
  }
};
</script>

<template>
  <div
    class="fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
  >
    <div class="py-4 px-12 pb-8 pl-12 bg-white">
      <h3 class="pb-[1rem] text-[1.5rem]">Лекарственные препараты</h3>
      <UButton
        class="mt-4 py-1 px-4 border-[2px] border-[#8e8e8e] rounded-sm text-[#9d9d9d]"
        @click="closeModal"
      >
        Закрыть
      </UButton>
      <div class="flex flex-col mt-[1.5rem]">
        <input
          class="w-[25vw] h-[4vh] border-[2px] border-[gray]"
          type="search"
          v-model="quary"
          placeholder="Поиск позиции по первым символам"
        />
        <input
          class="w-[25vw] h-[4vh] border-[2px] border-[gray] mt-[0.5rem]"
          type="search"
          placeholder="Добавить новую запись"
          @keydown.enter="addNewProduct"
          v-model="newProduct"
        />
      </div>

      <div
        @click="selectProduct(product)"
        v-for="(product, index) in quaryProductsApoinment"
        :key="index"
        class="flex justify-between items-center pl-[0.5rem] pr-[0.5rem] w-[25vw] h-[4vh] border-[1.2px] mt-[1rem] cursor-pointer hover:bg-[#3eccffcf]"
      >
        <p>
          {{ product }}
        </p>
        <img
          class="w-[1rem] h-[1rem] cursor-pointer"
          @click.stop="removeProduct(product)"
          src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
          alt="deleteImg"
        />
      </div>
    </div>
  </div>
</template>
