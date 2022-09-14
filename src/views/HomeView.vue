<script setup lang="ts">
import ColumnList, { type ColumnProps } from '../components/ColumnList.vue';
import GlobalHeader, { type UserProps } from '../components/GlobalHeader.vue';

const currentUser: UserProps = {
  isLogin: true,
  name: 'deexiao'
};

const list: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'https://avatars.githubusercontent.com/u/9313435?v=4'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'https://avatars.githubusercontent.com/u/9313435?v=4'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description:
      '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'https://avatars.githubusercontent.com/u/9313435?v=4'
  }
];
</script>

<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <ColumnList :list="list" />
  </div>
</template>
