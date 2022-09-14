<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ props.title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useClickOutside from '@/hooks/useClickOutside';
import { ref, watch } from 'vue';

const props = defineProps<{ title: string }>();

const isOpen = ref(false);
const dropdownRef = ref<null | HTMLElement>(null);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

// dropdownRef 是Dropdown的DOM元素
const isClickOutside = useClickOutside(dropdownRef);

watch(isClickOutside, () => {
  if (isOpen.value && isClickOutside.value) {
    isOpen.value = false;
  }
});
</script>

<style scoped></style>
