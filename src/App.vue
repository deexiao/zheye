<template>
  <div class="container">
    <GlobalHeader :user="user" />
    <RouterView />
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import GlobalHeader from './components/GlobalHeader.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from '@/stores/index';
import { computed } from 'vue';

const store = useStore();

const user = computed(() => store.user);
</script>
