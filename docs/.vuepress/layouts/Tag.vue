<script setup>
import { computed, ref } from 'vue'
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import ParentLayout from '../components/ParentLayout.vue'
import { RouteLink, useRoute } from 'vuepress/client'
import RecipeList from '../components/RecipeList.vue'

const route = useRoute()
const tagMap = useBlogCategory('tag')
const tagsArray = Object.entries(tagMap.value.map).map(([tag, { items, path }]) => ({
  name: tag,
  items,
  path: path || '/',
}));

const sortedTags = tagsArray.sort((a, b) => a.name.localeCompare(b.name));

</script>

<template>
  <ParentLayout>
    <h1>Tags</h1>
    <ul v-if="sortedTags" class="categoriesAndTags">
      <li class="tag" v-for="({ name, items, path }) in sortedTags">
        <RouteLink :key="name" :to="path" :active="route.path === path">
          {{ name }}
          <span class="tag-num">
            {{ items ? items.length : 0 }}
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
