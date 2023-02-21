import { onMounted, onUnmounted, reactive, ref } from 'vue';

interface State {
  initCount: number;
}

export default function useCountDown(initCount = 60, callback?: () => void): [number, () => void] {
  const state = reactive<State>({
    initCount: initCount,
  });

  const timer = ref<any>(null);

  const start = () => {
    state.initCount = initCount;
    timer.value = setInterval(() => {
      state.initCount--;
    }, 1000);
  };

  onMounted(() => {
    if (state.initCount === 0) {
      callback!();
      clearInterval(timer);
    }
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return [state.initCount, start];
}
