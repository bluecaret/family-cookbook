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

<style lang="scss">
/*
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
.pageImage {
  width: 100%;
  aspect-ratio: 10/5;
  background-size: cover;
  background-position: center;
  margin-block: 1rem;
}
.page-top {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.authorLine {
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
  &:not(:has(.asideContent)) {
    grid-template-columns: 1fr;
    .meta {
      hr {
        display: none;
      }
      .categoriesAndTags {
        margin-top: 0;
      }
    }
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr !important;
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
*/
</style>
