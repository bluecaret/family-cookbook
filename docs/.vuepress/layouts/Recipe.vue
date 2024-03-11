<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import RecipeList from '../components/RecipeList.vue'

const recipes = useBlogType('recipes')
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <RecipeList :items="recipes.items" />
      </main>
    </template>
  </ParentLayout>
</template>
