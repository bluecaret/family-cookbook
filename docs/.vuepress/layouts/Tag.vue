<script setup>
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import ParentLayout from '../components/ParentLayout.vue'
import { RouteLink, useRoute } from 'vuepress/client'
import RecipeList from '../components/RecipeList.vue'

const route = useRoute()
const tagMap = useBlogCategory('tag')
</script>

<template>
  <ParentLayout>
    <h1>Tags</h1>
    <ul class="categoriesAndTags">
      <li class="tag" v-for="({ items, path }, name) in tagMap.map">
        <RouteLink :key="name" :to="path" :active="route.path === path">
          {{ name }}
          <span class="tag-num">
            {{ items.length }}
          </span>
        </RouteLink>
      </li>
    </ul>
    <RecipeList :items="tagMap.currentItems ?? []" />
  </ParentLayout>
</template>

<style lang="scss" scoped>
.categoriesAndTags {
  margin-bottom: 2rem;
}
.tag {
  .route-link {
    display: inline-flex;
    gap: 0.5rem;
  }
  .tag-num {
    display: inline-block;
    font-size: 0.7rem;
    opacity: 0.4;
  }
  .route-link-active {
    background: var(--c-brand);
    color: var(--c-bg);
  }
}
</style>
