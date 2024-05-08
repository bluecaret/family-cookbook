<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '../components/ParentLayout.vue'
// import QuickList from '../components/QuickList.vue'
import RecipeList from '../components/RecipeList.vue'

// const quickIdeas = useBlogType('noRecipe')
const recipes = useBlogType('recipes')
</script>

<template>
  <ParentLayout>
    <!-- <h1>No-Recipe Inspirations</h1> -->
    <!-- <QuickList :items="quickIdeas.items" /> -->
    <h1>Recipes</h1>
    <RecipeList :items="recipes.items" />
  </ParentLayout>
</template>
