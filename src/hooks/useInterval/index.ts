import { ref, isRef, onUnmounted, Ref } from 'vue';

const useInterval = (
  fn: Function,
  delay: number | Ref<number | undefined | null> | null,
  immediate?: boolean,
) => {
  const state = isRef(delay) ? delay : ref(delay);
  if (immediate) fn();
  const timer: NodeJs.Timer | null = null;
  const clear = () => timer && clearTimeout(timer);

  const handler = () => {
    if (state.value === undefined || state.value === null) return;
    fn();
    run();
  };

  const run = () => {
    if (state.value === undefined || state.value === null) {
      clear();
      return;
    }
    setTimeout(handler, state.value);
  };

  run();

  onUnmounted(() => clear());
};

export default useInterval;
