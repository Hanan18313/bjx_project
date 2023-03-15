import { onUnmounted, ref, watch, Ref } from 'vue';
import { useInterval } from '../index';

type Counter = number;

export default function useCountDown(initCount = 10, callback?: Function): [Ref<number>, Function] {
  const counter = ref<Counter>(initCount);
  const delay = ref<number | undefined | null>(1000);

  let timer: NodeJs.Timer | null = null;

  const start = () => {
    timer = useInterval(() => {
      counter.value--;
    }, delay);
  };

  watch(
    () => counter.value,
    () => {
      if (counter.value === 0) {
        delay.value = null;
        callback && callback();
      }
    },
  );

  onUnmounted(() => {
    clearInterval(timer);
  });

  return [counter, start];
}
