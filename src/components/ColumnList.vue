<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary"> 进入专栏 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import noImageIcon from '@/assets/no-image-icon.png';

export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

const props = defineProps<{ list: ColumnProps[] }>();

const columnList = computed(() => {
  return props.list.map(l => {
    if (!l.avatar) {
      l.avatar = noImageIcon;
    }
    return l;
  });
});
</script>

<style scoped></style>
