import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/constants/global";

export const useRecomendedStore = defineStore("recomendedComponent", () => {
  const dataRecomended = reactive({
    inputVaue: "",
    textarea: "",
    name: "",
    jobTitle: "",
    recomendationDate: "",
  });

  const showHemodialysisFooter = ref(false);

  const handleSubmitFooter = async () => {
    const dataCollectorForm = {
      inputVaue: dataRecomended.inputVaue,
      textarea: dataRecomended.textarea,
      name: dataRecomended.name,
      jobTitle: dataRecomended.jobTitle,
      recomendationDate: dataRecomended.recomendationDate,
    };

    showHemodialysisFooter.value = true;
    try {
      await fetch(`${BASE_URL}/recomended.json`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(dataCollectorForm),
      });
      dataRecomended.inputVaue = "";
      dataRecomended.textarea = "";
      dataRecomended.name = "";
      dataRecomended.jobTitle = "";
      dataRecomended.recomendationDate = "";
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    dataRecomended,
    showHemodialysisFooter,
    handleSubmitFooter,
  };
});
