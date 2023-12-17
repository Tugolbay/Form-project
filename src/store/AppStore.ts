import { BASE_URL } from "@/utils/constants/global";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

interface IFormData {
  volume: string;
  bicorbanate: string;
  weight: string;
  program: string;
  dialyzer: string;
  hubs: string;
  needle: string;
  catheter: string;
  anticoagulation: string;
  volumeUnits: string;
  selectOption: string;
  needleText: string;
  typeNeedleText: string;
  typeKateterText: string;
}

export const useAppStore = defineStore("indexStore", () => {
  const data = reactive({
    volume: "",
    bicorbanate: "",
    weight: "",
    program: "",
    dialyzer: "",
    hubs: "",
    needle: "",
    catheter: "",
    anticoagulation: "",
    volumeUnits: "",
    needleText: "",
    selectOption: "граммов",
    typeNeedleText: "",
    typeKateterText: "",
  });
  const resultForm = ref<IFormData>({
    volume: "",
    bicorbanate: "",
    weight: "",
    program: "",
    dialyzer: "",
    hubs: "",
    needle: "",
    catheter: "",
    anticoagulation: "",
    volumeUnits: "",
    needleText: "",
    selectOption: "граммов",
    typeNeedleText: "",
    typeKateterText: "",
  });

  const isIglaBlockVisible = ref(false);
  const isKatheterBlockVisible = ref(false);

  const toggleIglaBlock = () => {
    isIglaBlockVisible.value = !isIglaBlockVisible.value;
    isKatheterBlockVisible.value = false;
    data.needle = "Игла";
  };

  const toggleKatheterBlock = () => {
    isKatheterBlockVisible.value = !isKatheterBlockVisible.value;
    isIglaBlockVisible.value = false;
    data.needle = "Катетер";
  };

  const isModalVisible = ref(false);
  const isShowModalVisible = ref(false);
  const isModalCatheter = ref(false);
  const isSmallModalCatheter = ref(false);

  const isModalToogleCatheter = () => {
    isModalCatheter.value = !isModalCatheter.value;
  };
  const isModalClose = () => {
    isModalVisible.value = false;
  };
  const isModalOpen = () => {
    isModalVisible.value = true;
  };

  const isModalShowClose = () => {
    isShowModalVisible.value = false;
  };
  const isModalShowOpen = () => {
    isShowModalVisible.value = true;
  };
  const hd = () => {
    data.program = "HD";
  };
  const hdf = () => {
    data.program = "HDF";
  };
  const uf = () => {
    data.program = "UF";
  };

  const showHemodialysis = ref(false);

  const getForm = async () => {
    try {
      const response = await fetch(`${BASE_URL}/form.json`);
      const res = await response.json();

      for (const key in res) {
        resultForm.value = {
          volume: res[key].volume,
          bicorbanate: res[key].bicorbanate,
          weight: res[key].weight,
          program: res[key].program,
          dialyzer: res[key].dialyzer,
          hubs: res[key].hubs,
          needle: res[key].needle,
          catheter: res[key].catheter,
          anticoagulation: res[key].anticoagulation,
          volumeUnits: res[key].volumeUnits,
          needleText: res[key].needleText,
          selectOption: res[key].selectOption,
          typeNeedleText: res[key].typeNeedleText,
          typeKateterText: res[key].typeKateterText,
        };
      }

      showHemodialysis.value = true;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async () => {
    const dataCollectorForm = {
      volume: data.volume,
      bicorbanate: data.bicorbanate,
      weight: data.weight,
      program: data.program,
      dialyzer: data.dialyzer,
      hubs: data.hubs,
      needle: data.needle,
      catheter: data.catheter,
      anticoagulation: data.anticoagulation,
      volumeUnits: data.volumeUnits,
      needleText: data.needleText,
      selectOption: data.selectOption,
      typeNeedleText: data.typeNeedleText,
      typeKateterText: data.typeKateterText,
    };

    try {
      await fetch(`${BASE_URL}/form.json`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(dataCollectorForm),
      });
      getForm();
    } catch (error) {
      console.log("error", error);
    }
    showHemodialysis.value = true;
  };

  const handleNewProduct = (newProduct: string) => {
    data.needleText = newProduct;
  };

  const handleTypeNewProduct = (newProduct: string) => {
    data.typeNeedleText = newProduct;
  };
  const handleTypeNewProductKatheter = (newProduct: string) => {
    data.typeKateterText = newProduct;
  };

  return {
    data,
    isIglaBlockVisible,
    isKatheterBlockVisible,
    toggleIglaBlock,
    toggleKatheterBlock,
    isSmallModalCatheter,
    isModalVisible,
    isModalCatheter,
    isShowModalVisible,
    isModalToogleCatheter,
    isModalClose,
    isModalOpen,
    isModalShowClose,
    isModalShowOpen,
    hd,
    hdf,
    uf,
    handleSubmit,
    showHemodialysis,
    handleNewProduct,
    handleTypeNewProduct,
    handleTypeNewProductKatheter,
    getForm,
    resultForm,
  };
});
