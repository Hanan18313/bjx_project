<script lang="ts" setup name="404">
import router from '@/router';
import { Result, Button } from 'ant-design-vue';
const handleBackHome = () => {
  router.replace({
    path: '/home',
  });
};
</script>
<template>
  <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <Button type="primary" @click="handleBackHome">回到首页</Button>
    </template>
  </Result>
</template>
