<script setup></script>
<template>
  <button class="button"><slot /></button>
</template>

<style>
.button {
  padding: 0.5rem 2rem 0.5rem 2rem;
  border: 2px solid gray;
  border-radius: 3px;
  color: gray;
  background-color: #fff;
  cursor: pointer;
}
</style>
