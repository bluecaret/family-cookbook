import { defineClientConfig } from 'vuepress/client'
import Recipe from './layouts/Recipe.vue'
import Category from './layouts/Category.vue'
import Tag from './layouts/Tag.vue'
import Layout from './layouts/Layout.vue'
import Home from './layouts/Home.vue'
import Extras from './layouts/Extras.vue'
import NotFound from './layouts/NotFound.vue'

export default defineClientConfig({
  // we provide some blog layouts
  layouts: {
    Layout,
    Home,
    Extras,
    Recipe,
    Category,
    Tag,
    NotFound,
  },
})
