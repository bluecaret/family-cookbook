<script setup>
import { withBase } from 'vuepress/client'
defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
})
</script>

<template>
  <div class="article-wrapper quickList">
    <div v-if="!items.length">Nothing in here.</div>

    <article v-for="{ info, path } in items" :key="path" class="article" @click="$router.push(path)">
      <header class="title">
        {{ (isTimeline ? `${new Date(info.date).toLocaleDateString()}: ` : '') + info.title }}
      </header>

      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />

      <div class="article-info">
        <div v-if="info.author" class="author"><strong>Author:</strong> {{ info.author }}</div>
        <div v-if="info.date && !isTimeline" class="date">
          <strong>Date:</strong> {{ new Date(info.date).toLocaleDateString() }}
        </div>
        <div v-if="info.category" class="category"><strong>Category:</strong> {{ info.category.join(', ') }}</div>
        <div v-if="info.tag" class="tag"><strong>Tag:</strong> {{ info.tag.join(', ') }}</div>
      </div>
    </article>
  </div>
</template>

<style lang="scss"></style>
