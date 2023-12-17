<script setup lang="ts">
import UButton from "../UI/UButton.vue";
import { ref, computed, onMounted } from "vue";

const emits = defineEmits(["addNewProduct"]);

defineProps({
  isVisible: Function,
});

const products = ref<string[]>([]);

const quary = ref<string>("");
const newProduct = ref<string>("");

onMounted(() => {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    products.value = JSON.parse(storedProducts);
  }
});

const quaryProducts = computed(() => {
  return products.value.filter((product) => product.includes(quary.value));
});

const addNewProduct = (newProductValue: string) => {
  if (newProductValue.trim() !== "") {
    products.value.push(newProductValue);
    localStorage.setItem("products", JSON.stringify(products.value));
    newProduct.value = "";
    emits("addNewProduct", newProductValue);
  }
};

const removeProduct = (product: string) => {
  const index = products.value.indexOf(product);
  if (index !== -1) {
    products.value.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products.value));
  }
};

const selectedProductValue = ref<string>("");
const selectProduct = (selectedProduct: string) => {
  selectedProductValue.value = selectedProduct;
  emits("addNewProduct", selectedProduct);
};
</script>

<template>
  <div
    class="fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
  >
    <div class="py-4 px-12 pb-8 pl-12 bg-white">
      <h3 class="pb-[1rem] text-[1.5rem]">Лекарственные препараты</h3>
      <UButton @click="isVisible">Закрыть</UButton>
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
          @keydown.enter="
            addNewProduct(($event.target as HTMLInputElement).value)
          "
          v-model="newProduct"
        />
      </div>

      <div @click="isVisible()">
        <div
          v-for="(product, index) in quaryProducts"
          :key="index"
          class="flex justify-between items-center pl-[0.5rem] pr-[0.5rem] w-[25vw] h-[4vh] border-[1.2px] mt-[1rem] cursor-pointer hover:bg-[#3eccffcf]"
          @click="selectProduct(product)"
        >
          <p>{{ product }}</p>
          <img
            class="w-[1rem] h-[1rem]"
            @click.stop="removeProduct(product)"
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
  justify-content: space-between;
  align-items: center;
  padding: 0rem 0.5rem 0rem 0.5rem;
  width: 25vw;
  height: 4vh;
  border: 1.2px solid rgb(95, 94, 94);
  margin-top: 1rem;
}

.selected-product2 {
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
