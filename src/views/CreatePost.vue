<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidateInput
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/stores/index';
import { useRouter } from 'vue-router';
import ValidateInput, { type RulesProp } from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import type { PostProps } from '@/testData';

const titleVal = ref('');
const router = useRouter();
const store = useStore();
const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }];
const contentVal = ref('');
const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }];
const onFormSubmit = (result: boolean) => {
  if (result) {
    const { columnId } = store.user;
    if (columnId) {
      const newPost: PostProps = {
        id: new Date().getTime(),
        title: titleVal.value,
        content: contentVal.value,
        columnId,
        createdAt: new Date().toLocaleString()
      };
      store.createPost(newPost);
      router.push({ name: 'column', params: { id: columnId } });
    }
  }
};
</script>
