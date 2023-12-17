import { BASE_URL } from "@/utils/constants/global";
import { defineStore } from "pinia";
import { ref } from "vue";

interface Session {
  id: string;
  drug: string;
  path: string;
  dosage: string;
  startDate: string;
  endDate: string;
  selectedSessions: string;
  daysDifference?: number;
}

interface IFormValue {
  drug: string;
  path: string;
  dosage: string;
  startDate: string;
  endDate: string;
  selectedSessions: number[];
  daysDifference?: number;
}

export const useAppointmentStore = defineStore("appointmentStore", () => {
  const closeModalAli = ref(false);
  const selectedItem = ref<string | null>(null);

  const formValues = ref<IFormValue>({
    drug: 'Спр."Препараты"',
    path: "option1",
    dosage: "option1",
    startDate: "",
    endDate: "",
    selectedSessions: [],
  });

  const isFormSubmitted = ref(true);
  const sessionsData = ref<Session[]>([]);

  const openModalHandler = () => {
    closeModalAli.value = true;
  };

  const closeModalHandler = () => {
    closeModalAli.value = false;
  };

  const toggleSelection = (sessionNumber: number) => {
    const index = formValues.value.selectedSessions.indexOf(sessionNumber);
    if (index === -1) {
      formValues.value.selectedSessions.push(sessionNumber);
    } else {
      formValues.value.selectedSessions.splice(index, 1);
    }
  };

  const isSelected = (sessionNumber: number) => {
    return formValues.value.selectedSessions.includes(sessionNumber);
  };

  const onItemSelected = (selectedItemValue: string) => {
    formValues.value.drug = selectedItemValue;
  };

  const getForm = async () => {
    try {
      const response = await fetch(`${BASE_URL}/appointment.json`);
      const data = await response.json();

      const resultGet = [];

      for (const key in data) {
        resultGet.push({
          id: key,
          drug: data[key].drug,
          path: data[key].path,
          dosage: data[key].dosage,
          startDate: data[key].startDate,
          endDate: data[key].endDate,
          selectedSessions: data[key].selectedSessions,
        });
      }
      sessionsData.value = resultGet;
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitForm = async () => {
    const sessionData: Session = {
      id: "",
      drug: formValues.value.drug,
      path: getPathText(formValues.value.path),
      dosage: getDosageText(formValues.value.dosage),
      startDate: formValues.value.startDate,
      endDate: formValues.value.endDate,
      selectedSessions: formValues.value.selectedSessions.join(", "),
    };

    try {
      await fetch(`${BASE_URL}/appointment.json`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(sessionData),
      });

      getForm();
    } catch (error) {
      console.log("error", error);
    }

    isFormSubmitted.value = true;

    if (formValues.value.selectedSessions.length) {
      selectedItem.value = formValues.value.selectedSessions.join(", ");
    }

    formValues.value = {
      drug: 'Спр."Препараты"',
      path: "option1",
      dosage: "option1",
      startDate: "",
      endDate: "",
      selectedSessions: [],
    };
  };

  const getPathText = (path: string) => {
    return path === "option1"
      ? "Спр. 'Путь приема'"
      : path === "option2"
      ? "Перорально"
      : path === "option3"
      ? "Подкожно"
      : path === "option4"
      ? "Артериально"
      : "";
  };

  const getDosageText = (dosage: string) => {
    return dosage === "option1"
      ? "Спр. 'Дозы препаратов'"
      : dosage === "option2"
      ? "мкг"
      : dosage === "option3"
      ? "мл"
      : dosage === "option4"
      ? "мг/кг"
      : "";
  };

  const deleteSession = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/appointment/${id}.json`, {
        method: "DELETE",
      });
      getForm();
    } catch (error) {
      console.log("error", error);
    }
  };

  const calculateDays = (start: string, end: string): number | null => {
    const startDate = start.split("-").map(Number);
    const endDate = end.split("-").map(Number);
    const startDateObj = new Date(startDate[0], startDate[1] - 1, startDate[2]);
    const endDateObj = new Date(endDate[0], endDate[1] - 1, endDate[2]);

    if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
      const differenceMs = endDateObj.getTime() - startDateObj.getTime();
      return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    }
    return null;
  };

  return {
    closeModalAli,
    selectedItem,
    formValues,
    isFormSubmitted,
    sessionsData,
    openModalHandler,
    closeModalHandler,
    toggleSelection,
    isSelected,
    onItemSelected,
    submitForm,
    deleteSession,
    calculateDays,
    getForm,
  };
});
