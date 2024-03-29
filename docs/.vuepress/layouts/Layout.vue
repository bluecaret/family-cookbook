<script setup>
import ParentLayout from '../components/ParentLayout.vue'
import { usePageData, useClientData } from 'vuepress/client'
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import TimerWidget from '../components/TimerWidget.vue'

const page = usePageData().value
const client = useClientData()
const categoryMap = useBlogCategory('category').value.map
const tagMap = useBlogCategory('tag').value.map

console.log(page)
</script>

<template>
  <ParentLayout>
    <div class="page">
      <header class="pageHeader">
        <h1>
          {{ page.title }}
        </h1>
        <div v-if="page.frontmatter.author" class="authorLine">
          <a v-if="page.frontmatter.authorUrl" :href="page.frontmatter.authorUrl" target="_blank">{{
            page.frontmatter.author
          }}</a>
          <span v-else>{{ page.frontmatter.author }}</span>
        </div>
        <div v-if="page.frontmatter.excerpt" class="excerptLine">
          {{ page.frontmatter.excerpt }}
        </div>
      </header>
      <section
        class="pageBody"
        :class="{
          noAside:
            !page.frontmatter.noRecipe &&
            !page.frontmatter.time &&
            !page.frontmatter.servings &&
            !page.frontmatter.ingredients,
          noRecipeOnly: page.frontmatter.noRecipeOnly === true,
        }"
      >
        <aside class="pageAside">
          <div
            v-if="page.frontmatter.image"
            class="pageImage"
            :style="`background-image: url(${$withBase('/recipe/' + page.frontmatter.image)});`"
          ></div>
          <div v-if="page.frontmatter.noRecipe" class="noRecipe">
            <h2 v-if="page.frontmatter.noRecipeOnly !== true">No-recipe instructions</h2>
            <p>{{ page.frontmatter.noRecipe }}</p>
            <hr v-if="page.frontmatter.noRecipeOnly !== true" />
          </div>
          <ul
            class="times"
            v-if="(page.frontmatter.time || page.frontmatter.servings) && page.frontmatter.noRecipeOnly !== true"
          >
            <li class="time" v-if="page.frontmatter.servings">
              <strong>Servings:</strong> {{ page.frontmatter.servings }}
            </li>
            <li class="time" v-if="page.frontmatter.time && page.frontmatter.time['prep']">
              <strong>Prep:</strong> {{ page.frontmatter.time['prep'] }}
            </li>
            <li class="time" v-if="page.frontmatter.time && page.frontmatter.time['cook']">
              <strong>Cook:</strong> {{ page.frontmatter.time['cook'] }}
            </li>
            <li class="time" v-if="page.frontmatter.time && page.frontmatter.time['resting']">
              <strong>Resting:</strong> {{ page.frontmatter.time['resting'] }}
            </li>
            <li class="time" v-if="page.frontmatter.time && page.frontmatter.time['total']">
              <strong>Total:</strong> {{ page.frontmatter.time['total'] }}
            </li>
          </ul>
          <div
            v-if="page.frontmatter.ingredients && page.frontmatter.noRecipeOnly !== true"
            class="asideContent ingredientLists"
          >
            <h2>Ingredients</h2>
            <ul v-if="page.frontmatter.ingredients.filter((i) => !i.heading).length > 0" class="ingredients">
              <template v-for="(ingredient, index) in page.frontmatter.ingredients" :key="index">
                <li v-if="!ingredient.heading">
                  <label v-if="!ingredient.heading">
                    <input type="checkbox" />
                    <span v-if="ingredient.quantity || ingredient.unit" class="quantityWrapper">
                      <span v-if="ingredient.quantity" class="quantity">{{ ingredient.quantity }}</span>
                      <span v-if="ingredient.unit" class="quantity">{{ ingredient.unit }}</span>
                    </span>
                    <strong>{{ ingredient.label }}</strong>
                  </label>
                </li>
              </template>
            </ul>
            <template v-for="(section, index) in page.frontmatter.ingredients" :key="index">
              <h3 v-if="section.heading">{{ section.heading }}</h3>
              <ul v-if="section.heading" class="ingredients">
                <li v-for="(ingredient, index) in section.ingredients" :key="index">
                  <label>
                    <input type="checkbox" />
                    <span v-if="ingredient.quantity || ingredient.unit" class="quantityWrapper">
                      <span v-if="ingredient.quantity" class="quantity">{{ ingredient.quantity }}</span>
                      <span v-if="ingredient.unit" class="quantity">{{ ingredient.unit }}</span>
                    </span>
                    <strong>{{ ingredient.label }}</strong>
                  </label>
                </li>
              </ul>
            </template>
          </div>
        </aside>
        <div v-if="page.frontmatter.noRecipeOnly !== true" class="pageContent">
          <div
            v-if="page.frontmatter.image"
            class="pageImage"
            :style="`background-image: url(${$withBase('/recipe/' + page.frontmatter.image)});`"
          ></div>
          <Content />
        </div>
      </section>
      <footer class="pageFooter">
        <div class="meta">
          <hr />
          <ul class="categoriesAndTags">
            <li class="category" v-for="(cat, index) in page.frontmatter.category" :key="cat">
              <RouteLink :to="categoryMap[cat].path">{{ cat }}</RouteLink>
            </li>
            <li class="tag" v-for="(tag, index) in page.frontmatter.tag" :key="tag">
              <RouteLink :to="tagMap[tag].path">{{ tag }}</RouteLink>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </ParentLayout>
</template>
