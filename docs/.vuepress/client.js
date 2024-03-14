import { defineClientConfig } from 'vuepress/client'
import Recipe from './layouts/Recipe.vue'
import Category from './layouts/Category.vue'
import Tag from './layouts/Tag.vue'
import Timeline from './layouts/Timeline.vue'
import Layout from './layouts/Layout.vue'
import Home from './layouts/Home.vue'
import FiberContent from './layouts/FiberContent.vue'

export default defineClientConfig({
  // we provide some blog layouts
  layouts: {
    Layout,
    Home,
    FiberContent,
    Recipe,
    Category,
    Tag,
    Timeline,
  },
})
