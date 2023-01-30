<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import { Button } from 'ant-design-vue';
import router from '@/router';

const handleAddClue = () => {
  router.push({
    path: '/clue/media/add',
  });
};
</script>
<template>
  <div style="text-align: end">
    <Button type="default" @click="handleAddClue">新增</Button>
  </div>
  <span>媒体线索</span>
</template>
