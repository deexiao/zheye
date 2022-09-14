<template>
  <li class="dropdown-option" :class="{ 'is-disabled': props.disabled }">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{ disabled?: boolean }>();
</script>

<style scoped>
/* By default, scoped styles do not affect contents rendered by <slot/> */
:slotted(.dropdown-option.is-disabled *) {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
