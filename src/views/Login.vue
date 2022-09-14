<template>
  <div class="container">
    <!-- 表单 -->
    <ValidateForm @form-submit="onFormSubmit" ref="loginForm">
      <!-- 输入邮箱和密码 -->
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput :rules="passwordRules" v-model="passwordVal" type="password" placeholder="请输入密码" />
      </div>
      <!-- 提交 -->
      <!-- v-slot 等价于 # -->
      <template v-slot:submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import type { RulesProp } from '@/components/ValidateInput.vue';
import { ref } from 'vue';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginForm = ref();

const emailVal = ref('');
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
];

const passwordVal = ref('');
const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }];

const onFormSubmit = (result: boolean) => {
  if (result) {
    router.push({ name: 'column', params: { id: 1 } });
  } else {
    loginForm.value.clearInputs();
  }
};
</script>
