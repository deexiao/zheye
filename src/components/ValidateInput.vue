<template>
  <div class="validate-input-container pb-3">
    <!-- v-bind="$attrs" 用于继承到该元素上面去 -->
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
export default {
  // 当父元素传入类似placeholder时，跑到了根结点，因此要设置成不继承到根元素
  inheritAttrs: false
};
</script>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { emitter } from './ValidateForm.vue';

export interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message?: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[];
export type TagType = 'input' | 'textarea';

const emailReg: any = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const props = defineProps<{ rules: RulesProp; modelValue: string; tag?: TagType }>();

const inputRef = reactive({ val: props.modelValue || '', error: false, message: '' });

const emit = defineEmits(['update:modelValue']);

const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value;
  inputRef.val = targetValue;
  // 用 update:modelValue 发送事件
  emit('update:modelValue', targetValue);
};

const validateInput = () => {
  if (props.rules) {
    const allPassed = props.rules.every(rule => {
      let passed = true;
      inputRef.message = rule.message || '';
      switch (rule.type) {
        case 'required':
          passed = inputRef.val.trim() !== '';
          break;
        case 'email':
          passed = emailReg.test(inputRef.val);
          break;
        default:
          break;
      }
      return passed;
    });
    inputRef.error = !allPassed;
    return allPassed;
  }
  return true;
};

const clearInput = () => {
  inputRef.val = '';
};

onMounted(() => {
  // 传送信号 - 函数
  emitter.emit('form-item-created', { validator: validateInput, clearInput });
});
</script>

<style></style>
