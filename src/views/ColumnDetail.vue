<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border" />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import PostList from '../components/PostList.vue';
import { useStore } from '@/stores/index';
import { computed } from 'vue';

const route = useRoute();
const store = useStore();

const currentId = +route.params.id; // + 意思是把 string 转换成 number
const column = computed(() => store.getColumnById(currentId));
const list = computed(() => store.getPostsByCid(currentId));
</script>
