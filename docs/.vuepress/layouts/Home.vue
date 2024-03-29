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
    <hr style="margin-block: 2rem" />
    <h1>CardioMetabolic Diet Resources</h1>
    <ul class="resourcesList">
      <li><a :href="$withBase('/cardiometabolic-foods.pdf')">CardioMetabolic Foods</a></li>
      <li><a :href="$withBase('/cardiometabolic-meal-plan.pdf')">CardioMetabolic Meal Plan</a></li>
      <li>
        <a :href="$withBase('/cardiometabolic-diet-comprehensive-guide.pdf')"
          >CardioMetabolic Diet Comprehensive Guide</a
        >
      </li>
    </ul>
  </ParentLayout>
</template>

<style scoped>
.resourcesList {
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 1rem auto 2rem;
  padding: 0;
  align-items: center;
}
</style>
