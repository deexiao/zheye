import { onMounted, onUnmounted, ref, type Ref } from 'vue';

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false);
  const handler = (e: MouseEvent) => {
    // 当挂载成功时
    if (elementRef.value) {
      // 当dropdown dom里包含点击事件的dom，则 is not ClickOutside
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener('click', handler);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handler);
  });
  return isClickOutside;
};

export default useClickOutside;
