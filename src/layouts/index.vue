<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { Layout, LayoutSider, LayoutContent, LayoutHeader, Menu } from 'ant-design-vue';
import * as icon from '@icon-park/vue-next';
import { RouterLink, RouterView } from 'vue-router';
import store from '@/store';

interface State {
  collapsed: boolean;
  selectedKeys: string[];
}

const state = reactive<State>({
  selectedKeys: ['1'],
  collapsed: false,
});

store.dispatch('common/getSystemMenu', {});
const menu = computed(() => store.state.common.menu);
</script>
<template>
  <Layout id="components-layout-demo-custom-trigger">
    <LayoutSider v-model:collapsed="state.collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img v-if="!state.collapsed" src="../assets/images/logo.png" alt="" />
        <img v-else src="../assets/images/logo1.png" alt="" />
      </div>
      <Menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline">
        <template v-for="menuItem in menu" :key="menuItem.key">
          <Menu.SubMenu>
            <template #icon>
              <component :is="icon[menuItem.icon]"></component>
            </template>
            <template #title>{{ menuItem.name }}</template>
            <Menu.Item v-for="item in menuItem.children" :key="item.key" :index="item.path">
              <RouterLink :to="item.path">{{ item.name }}</RouterLink>
            </Menu.Item>
          </Menu.SubMenu>
        </template>
      </Menu>
    </LayoutSider>
    <Layout class="layout-right-side">
      <LayoutHeader style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="state.collapsed" class="trigger" @click="() => (state.collapsed = !state.collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (state.collapsed = !state.collapsed)" />
      </LayoutHeader>
      <LayoutContent class="layout-right-content">
        <div class="layout-content-body">
          <RouterView></RouterView>
        </div>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<style lang="less" scoped>
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.layout-right-content {
  margin: 24px 16px;
  overflow: initial;
  .layout-content-body {
    padding: 24px;
    background: #fff;
    text-align: center;
    height: 100%;
    overflow: auto;
  }
}
</style>
