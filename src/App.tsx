import { ConfigProvider, Result } from 'ant-design-vue';
import { defineComponent, KeepAlive, onErrorCaptured, ref, Suspense } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: '',
  setup() {
    const isError = ref(null);
    onErrorCaptured((e: any): boolean => {
      console.log(e);
      isError.value = e;
      return false;
    });
    return () => (
      <>
        {isError.value ? (
          <div>
            <Result status="error" title="Someting Is Wrong" sub-title="Please check and modify the following information before resubmitting."></Result>
          </div>
        ) : (
          <ConfigProvider theme-vars={{ blue: '#6476FF', navBarArrowSize: '1.4rem' }} locale={zhCN}>
            <Suspense onFallback={() => <div> loading...</div>}>
              <RouterView>
                {({ Component, route }: any) => {
                  const { meta } = route;
                  const isKeepAlive = meta && meta.keepAlive;
                  return (
                    <>
                      <KeepAlive>{isKeepAlive ? <Component key={meta.usePathKey ? route.fullPath : undefined} /> : null}</KeepAlive>
                      {!isKeepAlive ? <Component key={meta.usePathKey ? route.fullPath : undefined} /> : null}
                    </>
                  );
                }}
              </RouterView>
            </Suspense>
          </ConfigProvider>
        )}
      </>
    );
  },
});
