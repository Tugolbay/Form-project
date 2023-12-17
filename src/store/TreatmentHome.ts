import { BASE_URL } from "@/utils/constants/global";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

interface IResForm {
  selectOption: string;
  pathSelect: string;
  selectDose: string;
  doseTitle: string;
  startDate: string;
  endDate: string;
  medicineText: string;
}

export const useTreatmentHome = defineStore("treatmentHome", () => {
  const medicineInfo = reactive({
    selectOption: "1 раз в день",
    pathSelect: "Перорально",
    selectDose: "мкг",
    doseTitle: "",
    startDate: "",
    endDate: "",
    medicineText: "",
  });
  const resultForm = ref<IResForm>({
    selectOption: "1 раз в день",
    pathSelect: "Перорально",
    selectDose: "мкг",
    doseTitle: "",
    startDate: "",
    endDate: "",
    medicineText: "",
  });

  const showTreatmentHemodialysis = ref(false);

  const getForm = async () => {
    try {
      const response = await fetch(`${BASE_URL}/treatment.json`);
      const res = await response.json();

      for (const key in res) {
        resultForm.value = {
          selectOption: res[key].selectOption,
          pathSelect: res[key].pathSelect,
          selectDose: res[key].selectDose,
          doseTitle: res[key].doseTitle,
          startDate: res[key].startDate,
          endDate: res[key].endDate,
          medicineText: res[key].medicineText,
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitTreatmentForm = async () => {
    const dataCollectorForm = {
      selectOption: medicineInfo.selectOption,
      pathSelect: medicineInfo.pathSelect,
      selectDose: medicineInfo.selectDose,
      doseTitle: medicineInfo.doseTitle,
      startDate: medicineInfo.startDate,
      endDate: medicineInfo.endDate,
      medicineText: medicineInfo.medicineText,
    };

    try {
      await fetch(`${BASE_URL}/treatment.json`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(dataCollectorForm),
      });
      getForm();
    } catch (error) {
      console.log("error", error);
    }

    showTreatmentHemodialysis.value = true;
  };

  const openTreatmentHomeModal = ref(false);
  const openReseptionModal = ref(false);

  const onTreatmentHomeModalHandler = () => {
    openTreatmentHomeModal.value = true;
  };
  const onCloseTreatmentHomeModalHandler = () => {
    openTreatmentHomeModal.value = false;
  };

  const handleNewProduct = (newProduct: string) => {
    medicineInfo.medicineText = newProduct;
  };

  const calculateDaysBetween = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "xx";
    }
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  };
  return {
    medicineInfo,
    showTreatmentHemodialysis,
    submitTreatmentForm,
    openTreatmentHomeModal,
    openReseptionModal,
    onTreatmentHomeModalHandler,
    onCloseTreatmentHomeModalHandler,
    handleNewProduct,
    calculateDaysBetween,
    getForm,
    resultForm,
  };
});
