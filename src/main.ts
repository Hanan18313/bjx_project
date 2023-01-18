import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import router from './router';
import store from './store';
import App from './App';
import './antd.less';

const app = createApp(App);

app.use(router).use(store).use(Antd).mount('#app');
