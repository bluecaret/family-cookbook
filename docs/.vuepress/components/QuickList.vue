<script setup>
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
  <div v-if="!items.length">Nothing in here.</div>
  <div v-else class="article-wrapper quickList">
    <article v-for="{ info, path } in items" :key="path" class="article" @click="$router.push(path)">
      <header class="title">
        {{ info.title }}
      </header>
      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
</template>

<style lang="scss"></style>
