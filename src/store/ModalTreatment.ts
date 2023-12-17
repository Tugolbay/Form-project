import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";

export const useModalTreatment = defineStore("modalStore", () => {
  const productsTreatment = ref<string[]>([]);

  const selectedProductValue = ref<string>("");

  const quaryTreatment = ref<string>("");
  const newProductTreatment = ref<string>("");
  console.log(newProductTreatment);

  onMounted(() => {
    const storedProductsModal = localStorage.getItem("productsTreatment");
    if (storedProductsModal) {
      productsTreatment.value = JSON.parse(storedProductsModal);
    }
  });

  const quaryProductsTreatment = computed(() => {
    return productsTreatment.value.filter((product) =>
      product.includes(quaryTreatment.value)
    );
  });

  const addNewProduct = (newProductValue: string) => {
    if (newProductValue.trim() !== "") {
      productsTreatment.value.push(newProductValue);

      localStorage.setItem(
        "productsTreatment",
        JSON.stringify(productsTreatment.value)
      );

      newProductTreatment.value = "";
    }
  };

  const removeProduct = (product: string) => {
    const index = productsTreatment.value.indexOf(product);
    if (index !== -1) {
      productsTreatment.value.splice(index, 1);
      localStorage.setItem(
        "productsTreatment",
        JSON.stringify(productsTreatment.value)
      );
    }
  };

  const selectProduct = (selectedProduct: string) => {
    selectedProductValue.value = selectedProduct;
  };

  return {
    productsTreatment,
    quaryTreatment,
    newProductTreatment,
    onMounted,
    quaryProductsTreatment,
    addNewProduct,
    removeProduct,
    selectedProductValue,
    selectProduct,
  };
});
