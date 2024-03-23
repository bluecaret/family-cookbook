<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '../components/ParentLayout.vue'
import QuickList from '../components/QuickList.vue'

const quickIdeas = useBlogType('noRecipe')
</script>

<template>
  <ParentLayout>
    <h1>No-Recipe Inspirations</h1>
    <QuickList :items="quickIdeas.items" />
  </ParentLayout>
</template>
