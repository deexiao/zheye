<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
type ValidateFunc = () => boolean;
type ClearFunc = () => void;
/* 
  为何用 mitt？
  这里使用 mitt，是因为使用 context.emit 无法完成任务，
  父组件的中是使用 slot 渲染子组件的位置，没法添加事件响应的绑定。

  什么时候用 mitt？
  兄弟组件之间传递、父子组件之间不能传递（比较用到slot时）、...
*/
export const emitter = mitt();
</script>

<script setup lang="ts">
import mitt from 'mitt';
import { onUnmounted } from 'vue';

let funcArr: ValidateFunc[] = [];
let clearArr: ClearFunc[] = [];

const emit = defineEmits(['form-submit']);

const submitForm = () => {
  const result = funcArr.map(func => func()).every(result => result);
  emit('form-submit', result);
};

// 运行子元素函数
const callback = (obj: any) => {
  funcArr.push(obj.validator);
  clearArr.push(obj.clearInput);
};

// 点击提交后 如报错 则清除输入框（该函数需要暴露给父组建）
const clearInputs = () => {
  clearArr.forEach(clear => clear());
};

// 事件监听器，像收音机一样正在等待信号
emitter.on('form-item-created', callback);

onUnmounted(() => {
  emitter.off('form-item-created', callback);
  funcArr = [];
  clearArr = [];
});

// 暴露出去，因为 <script setup> 的组件是默认私有的
defineExpose({
  clearInputs
});
</script>
