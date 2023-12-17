<script setup lang="ts">
import { useAppStore } from "../../store/AppStore";
import UButton from "../UI/UButton.vue";
import Hemodialysis from "../total/Hemodialysis.vue";
import NeedleModal from "../modal/NeedleModal.vue";
import NeedleModalType from "../modal/NeedleModalType.vue";
import CatheterModal from "../modal/CatheterModal.vue";

const getCurrentMonth = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  return month;
};
const appStore = useAppStore();
</script>

<template>
  <div class="flex items-center mt-[2rem]">
    <p class="text-[1.4rem] font-[500]">Сеанс гемодиализа</p>
    <p class="mdd:ml-[12rem] ml-2">
      № месяце: <span class="text-blue-500">{{ getCurrentMonth() }}</span>
    </p>
  </div>
  <p class="text-[1.4rem] mt-[4rem]">Назначение сеанса гемодеализа</p>
  <p class="mt-[1rem]">Программа аппарата</p>
  <div class="flex w-[20vw] mdd:gap-0 gap-2 justify-between mt-[1.5rem]">
    <div
      @:click="appStore.hd"
      :class="{ device: true, active: appStore.data.program === 'HD' }"
    >
      HD
    </div>
    <div
      @:click="appStore.hdf"
      :class="{ device: true, active: appStore.data.program === 'HDF' }"
    >
      HDF
    </div>
    <div
      @:click="appStore.uf"
      :class="{ device: true, active: appStore.data.program === 'UF' }"
    >
      UF
    </div>
  </div>
  <p class="mt-[2rem]">Диализатор</p>
  <input
    type="text"
    class="flex items-center w-[10.5rem] h-[2.3rem] border-[2px] border-[gray] mt-[0.5rem]"
    v-model="appStore.data.dialyzer"
    placeholder="Спр.'Диализаторы'"
  />

  <div class="flex mt-[2rem]">
    <div>
      <p>Концентратор</p>
      <input
        class="flex items-center w-[10.5rem] h-[2.3rem] border-[2px] border-[gray] mt-[0.5rem]"
        type="text"
        placeholder="Спр.'Концентраторы'"
        v-model="appStore.data.hubs"
      />
    </div>
    <div class="ml-[2rem]">
      <p>Обьем л.</p>
      <input
        class="w-[5rem] h-[2.3rem] border-[2px] border-[gray] mt-[0.5rem]"
        type="number"
        placeholder="Обьем"
        v-model="appStore.data.volume"
      />
    </div>
  </div>
  <p class="mt-[2rem]">Тип иньекции</p>
  <div
    class="flex mdd:gap-0 gap-2 w-[15vw] justify-between cursor-pointer mt-[2rem]"
  >
    <div
      @click="appStore.toggleIglaBlock"
      :class="{ needle: true, activeNeedle: appStore.data.needle === 'Игла' }"
    >
      <p>Игла</p>
    </div>
    <div
      @click="appStore.toggleKatheterBlock"
      :class="{
        needle: true,
        activeNeedle: appStore.data.needle === 'Катетер',
      }"
    >
      <p>Катетер</p>
    </div>
  </div>
  <div
    class="flex w-[35rem] mt-[2rem] justify-between"
    v-if="appStore.isIglaBlockVisible"
  >
    <div
      class="flex items-center w-[14rem] h-[2.3rem] gray border-[2px] border-[gray]"
    >
      <p>
        <input
          type="text"
          placeholder="Спр.'Иглы'"
          v-model="appStore.data.needleText"
          class="w-full h-full outline-none px-2"
        />
      </p>
    </div>

    <div
      class="flex justify-center items-center w-[2.3rem] h-[2.3rem] border-[2px] border-[gray] cursor-pointer"
      @click="appStore.isModalShowOpen"
    >
      <img
        class="w-[0.8rem] h-[0.8rem]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
        alt="burger"
      />
    </div>
    <div
      class="flex items-center w-[14rem] h-[2.3rem] gray border-[2px] border-[gray]"
    >
      <p>
        <input
          type="text"
          placeholder="Спр.'Тип иглы'"
          v-model="appStore.data.typeNeedleText"
          class="w-full h-full outline-none px-2"
        />
      </p>
    </div>
    <div
      class="flex justify-center items-center w-[2.3rem] h-[2.3rem] border-[2px] border-[gray] cursor-pointer"
      @click="appStore.isModalOpen"
    >
      <img
        class="w-[0.8rem] h-[0.8rem]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
        alt="burger"
      />
    </div>
  </div>
  <div class="w-[25rem] mt-[1.5rem]" v-if="appStore.isKatheterBlockVisible">
    <div class="flex pr-[3.5rem] justify-end">
      <p>Типы катетеров</p>
    </div>
  </div>
  <div
    class="flex w-[25rem] justify-between mt-[0.5rem]"
    v-if="appStore.isKatheterBlockVisible"
  >
    <div
      class="flex items-center w-[10rem] h-[2.3rem] gray border-[2px] border-[gray]"
    >
      <p>
        {{
          appStore.data.typeKateterText !== ""
            ? appStore.data.typeKateterText
            : "Спр.'Катетеры'"
        }}
      </p>
    </div>
    <div
      class="flex justify-center items-center w-[2.3rem] h-[2.3rem] border-[2px] border-[gray] cursor-pointer"
      @click="appStore.isModalToogleCatheter"
    >
      <img
        class="w-[0.8rem] h-[0.8rem]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
        alt="burger"
      />
    </div>
    <div>
      <select
        class="w-[11.2rem] h-[2.4rem] border-[2px] border-[gray]"
        v-model="appStore.data.typeNeedleText"
      >
        <option value="" disabled selected hidden>спр.'Типы катетеров'</option>
        <option value="Катетер Фолея">Катетер Фолея</option>
        <option value="Катетер Малеко">Катетер Малеко</option>
        <option value="Катетер Пеццера">Катетер Пеццера</option>
        <option value="Катетер Тиманна">Катетер Тиманна</option>
        <option value="Катетер Нелатона">Катетер Нелатона</option>
      </select>
    </div>
  </div>
  <div class="relative left-[5.5rem]">
    <CatheterSmallModal v-if="appStore.isSmallModalCatheter" />
  </div>

  <div class="flex md:w-[70%] w-[] justify-between mdd:gap-0 gap-2 mt-[2rem]">
    <div>
      <p>Бикорбанат</p>
      <div class="flex mt-[0.5rem]">
        <input
          class="mdd:w-[6rem] w-[5rem] h-[2.3rem] border-[2px] border-[gray]"
          type="number"
          placeholder="XXX гр / л"
          v-model="appStore.data.bicorbanate"
        />
        <select
          class="w-[6rem] h-[2.3rem] border-[2px] border-[gray] ml-[0.4rem]"
          v-model="appStore.data.selectOption"
        >
          <option value="граммов">граммов</option>
          <option value="литров">литров</option>
        </select>
      </div>
    </div>

    <div>
      <p>Сухой вес</p>
      <input
        class="w-[5rem] h-[2.3rem] border-[2px] border-[gray] mt-[0.5rem]"
        type="number"
        placeholder="XXX кг"
        v-model="appStore.data.weight"
      />
    </div>
    <div>
      <p>Антикогауляция</p>
      <div class="kvadratBlock mt-[0.5rem]">
        <input
          class="mdd:w-[10rem] w-[7.5rem] h-[2.3rem] border-[2px] border-[gray]"
          type="text"
          placeholder="Наименование"
          v-model="appStore.data.anticoagulation"
        />
      </div>
    </div>
    <div>
      <p>Обьем</p>
      <input
        class="w-[5rem] h-[2.3rem] border-[2px] border-[gray] mt-[0.5rem]"
        type="number"
        placeholder="XXX ед."
        v-model="appStore.data.volumeUnits"
      />
    </div>
  </div>
  <UButton @:click="appStore.handleSubmit" class="mt-[2rem]">
    Сформировать сеанс
  </UButton>
  <Hemodialysis />
  <CatheterModal
    v-if="appStore.isModalCatheter"
    :isModalToogleCatheter="appStore.isModalToogleCatheter"
    @addNewProduct="appStore.handleTypeNewProductKatheter"
  />
  <NeedleModalType
    v-if="appStore.isModalVisible"
    :isModalNeedleClose="appStore.isModalClose"
    @addNewProduct="appStore.handleTypeNewProduct"
  />
  <NeedleModal
    v-if="appStore.isShowModalVisible"
    :isVisible="appStore.isModalShowClose"
    @addNewProduct="appStore.handleNewProduct"
  />
</template>

<style scoped>
.needle {
  width: 6rem;
  height: 2.3rem;
  border: 2px solid gray;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.device {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2.3rem;
  border: 2px solid gray;
  border-radius: 5px;
  cursor: pointer;
}
.active {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2.3rem;
  border: 2px solid green;
  border-radius: 5px;
  cursor: pointer;
  color: green;
}

.activeNeedle {
  color: green;
  border: 2px solid green;
}
</style>
