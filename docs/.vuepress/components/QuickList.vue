<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
})

const searchTerm = ref('')

const searchResults = computed(() => {
  if (!searchTerm.value.trim()) {
    return props.items
  }

  const searchFields = ['title', 'excerpt'] // Configure the fields to search here

  return props.items.filter((item) =>
    searchFields.some((field) => item.info[field]?.toString().toLowerCase().includes(searchTerm.value.toLowerCase()))
  )
})
</script>

<template>
  <div v-if="!items.length" class="noResults">Select a tag above to view recipes within it.</div>
  <div v-if="items.length" class="searchBar">
    <input type="text" placeholder="Search..." v-model="searchTerm" />
  </div>
  <div v-if="items.length && !searchResults.length" class="noResults">No recipes found. Try another search.</div>
  <div v-if="items.length && searchResults.length" class="articleWrapper quickList">
    <article v-for="{ info, path } in searchResults" :key="path" class="article" @click="$router.push(path)">
      <!-- <div
        v-if="info.image"
        class="articleImage"
        :style="`background-image: url(${$withBase('/recipe/' + info.image)});`"
      ></div> -->
      <header class="title">
        {{ info.title }}
      </header>
      <div v-if="info.excerpt" class="excerpt" v-html="info.noRecipe" />
    </article>
  </div>
</template>

<style lang="scss"></style>
