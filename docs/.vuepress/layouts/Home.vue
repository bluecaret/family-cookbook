<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import QuickList from '../components/QuickList.vue'

const quickIdeas = useBlogType('quick')
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <h2>Quick Ideas</h2>
        <QuickList :items="quickIdeas.items" />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';
.page {
  @include mixins.content_wrapper;
  margin-top: 2rem;
}
</style>
