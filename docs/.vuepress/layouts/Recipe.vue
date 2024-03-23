<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '../components/ParentLayout.vue'
import RecipeList from '../components/RecipeList.vue'

const recipes = useBlogType('recipes')
</script>

<template>
  <ParentLayout>
    <h1>Recipes</h1>
    <RecipeList :items="recipes.items" />
  </ParentLayout>
</template>
