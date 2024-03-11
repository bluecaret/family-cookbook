<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
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
    <template #navbar-before><TimerWidget /></template>
    <template #page-top>
      <h1>
        {{ page.title }}
      </h1>
      <div v-if="page.frontmatter.author" class="author">
        <a v-if="page.frontmatter.authorUrl" :href="page.frontmatter.authorUrl" target="_blank">{{
          page.frontmatter.author
        }}</a>
        <span v-else>{{ page.frontmatter.author }}</span>
      </div>
      <ul class="times" v-if="page.frontmatter.time || page.frontmatter.servings">
        <li class="time"><strong>Servings:</strong> {{ page.frontmatter.servings }}</li>
        <li class="time" v-if="page.frontmatter.time['prep']">
          <strong>Prep:</strong> {{ page.frontmatter.time['prep'] }}
        </li>
        <li class="time" v-if="page.frontmatter.time['cook']">
          <strong>Cook:</strong> {{ page.frontmatter.time['cook'] }}
        </li>
        <li class="time" v-if="page.frontmatter.time['resting']">
          <strong>Resting:</strong> {{ page.frontmatter.time['resting'] }}
        </li>
        <li class="time" v-if="page.frontmatter.time['total']">
          <strong>Total:</strong> {{ page.frontmatter.time['total'] }}
        </li>
      </ul>
    </template>
    <template #page-content-top>
      <div class="page-top">
        <div v-if="page.frontmatter.ingredients" class="ingredientLists">
          <h2>Ingredients</h2>
          <ul class="ingredients">
            <li v-for="(ingredient, index) in page.frontmatter.ingredients" :key="index">
              <label v-if="!ingredient.heading">
                <input type="checkbox" />
                <span>{{ ingredient.quantity }} {{ ingredient.unit }}</span> <strong>{{ ingredient.label }}</strong>
              </label>
            </li>
          </ul>
          <template v-for="(section, index) in page.frontmatter.ingredients" :key="index">
            <h3 v-if="section.heading">{{ section.heading }}</h3>
            <ul v-if="section.heading" class="ingredients">
              <li v-for="(ingredient, index) in section.ingredients" :key="index">
                <label>
                  <input type="checkbox" />
                  <span>{{ ingredient.quantity }} {{ ingredient.unit }}</span> <strong>{{ ingredient.label }}</strong>
                </label>
              </li>
            </ul>
          </template>
        </div>
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
      </div>
    </template>
    <!-- <template #page-bottom>
      <div class="page-bottom">
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
    </template> -->
  </ParentLayout>
</template>

<style lang="scss">
.navbar .site-name {
  @media screen and (max-width: 800px) {
    display: none;
  }
}
.theme-container.no-sidebar .page {
  display: block;
  padding: 2rem 0 3rem;
  max-width: min(1000px, 90%);
}
.page-top {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.author {
  margin-top: -1.3rem;
}
.page-meta {
  display: none;
}
.page .theme-default-content {
  display: grid;
  grid-template-columns: 3fr 6fr;
  gap: 1rem 2rem;
  padding: 0;
  max-width: min(1000px, 100%);
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    padding-top: 0;
  }
  ol {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 2rem;
    li {
      padding-left: 1rem;
    }
  }
}
.page-bottom {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.ingredientLists {
  h2,
  h3 {
    margin-bottom: 1rem;
  }
}
.ingredients {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  li label {
    display: block;
    vertical-align: middle;
    gap: 0.3rem;
    font-size: 1rem;
    line-height: 1.3rem;
    border-radius: 0.25rem;
    padding: 0.5rem 0.5rem 0.5rem 2.15rem;
    background-color: var(--c-bg-darker);
    color: var(--c-text);
    text-indent: -1.65rem;
    input {
      display: inline-block;
      margin-right: 0.5rem;
    }
    &:has(input:checked) {
      background-color: var(--c-bg-light);
      color: var(--c-text);
    }
    strong {
      font-weight: 500;
    }
  }
}

.times {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  .time {
    display: inline-flex;
    gap: 0.4rem;
    align-items: center;
    margin: 0;
    padding: 0.25rem 0.5rem;
    line-height: 1.3rem;
    font-size: 1rem;
    color: var(--c-text-lighter);
    border: 1px solid var(--c-bg-darker);
    border-radius: 0.25rem;
    strong {
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
  }
}

.categoriesAndTags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  .category,
  .tag {
    display: inline-block;
    margin: 0;
    padding: 0;
    line-height: 1.3rem;
    a {
      display: inline-grid;
      place-items: center;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      // color: var(--c-bg);
      border: 1px solid var(--c-bg-darker);
      transition: border-color 0.3s, color 0.3s;
      &:hover {
        text-decoration: none;
        border-color: var(--c-bg-arrow);
      }
    }
  }
  .tag a {
    border-color: var(--c-bg-light);
  }
}
.meta {
  @media (max-width: 800px) {
    order: -1;
    hr {
      display: none;
    }
    .categoriesAndTags {
      margin-top: 0;
    }
  }
}
</style>