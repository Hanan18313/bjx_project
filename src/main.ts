import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { install } from '@icon-park/vue-next/lib/all';
import router from './router';
import store, { key } from './store';
import App from './App';
import './antd.less';
import './mock';

const app = createApp(App);

install(app);

app.use(router).use(store, key).use(Antd).mount('#app');
