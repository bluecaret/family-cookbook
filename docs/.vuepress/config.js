import { blogPlugin } from '@vuepress/plugin-blog'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'Family Cookbook',
  description: 'My Family Cookbook',

  base: '/family-cookbook/',

  head: [['link', { rel: 'icon', href: './cookbook.png' }]],

  theme: false,

  plugins: [
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) => (filePathRelative ? filePathRelative.startsWith('recipe/') : false),

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '',
        image: frontmatter.image || '',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === 'string' ? frontmatter.excerpt : data?.excerpt || '',
        noRecipe: frontmatter.noRecipe ? frontmatter.noRecipe : '',
        noRecipeOnly: frontmatter.noRecipeOnly ? frontmatter.noRecipeOnly : false,
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home && frontmatter.excerpt !== false && typeof frontmatter.excerpt !== 'string',

      category: [
        {
          key: 'category',
          getter: (page) => page.frontmatter.category || [],
          layout: 'Category',
          itemLayout: 'Category',
          frontmatter: () => ({
            title: 'Categories',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            const titleA = pageA.frontmatter.title.toLowerCase() // Get lowercase title of pageA
            const titleB = pageB.frontmatter.title.toLowerCase() // Get lowercase title of pageB

            if (titleA < titleB) return -1 // pageA should come before pageB
            if (titleA > titleB) return 1 // pageA should come after pageB
            return 0 // titles are equal
          },
        },
        {
          key: 'tag',
          getter: (page) => page.frontmatter.tag || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: () => ({
            title: 'Tags',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            const titleA = pageA.frontmatter.title.toLowerCase() // Get lowercase title of pageA
            const titleB = pageB.frontmatter.title.toLowerCase() // Get lowercase title of pageB

            if (titleA < titleB) return -1 // pageA should come before pageB
            if (titleA > titleB) return 1 // pageA should come after pageB
            return 0 // titles are equal
          },
        },
      ],

      type: [
        {
          key: 'recipes',
          // Remove archive articles
          // filter: (page) => !page.frontmatter.archive && page.frontmatter.noRecipeOnly !== true,
          filter: (page) => !page.frontmatter.archive,
          layout: 'Recipe',
          frontmatter: () => ({
            title: 'Recipes',
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            const titleA = pageA.frontmatter.title.toLowerCase() // Get lowercase title of pageA
            const titleB = pageB.frontmatter.title.toLowerCase() // Get lowercase title of pageB

            if (titleA < titleB) return -1 // pageA should come before pageB
            if (titleA > titleB) return 1 // pageA should come after pageB
            return 0 // titles are equal
          },
        },
        {
          key: 'noRecipe',
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive && page.frontmatter.noRecipe,
          layout: 'Recipe',
          frontmatter: () => ({
            title: 'Quick Ideas',
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            const titleA = pageA.frontmatter.title.toLowerCase() // Get lowercase title of pageA
            const titleB = pageB.frontmatter.title.toLowerCase() // Get lowercase title of pageB

            if (titleA < titleB) return -1 // pageA should come before pageB
            if (titleA > titleB) return 1 // pageA should come after pageB
            return 0 // titles are equal
          },
        },
      ],
      hotReload: true,
    }),
  ],

  bundler: viteBundler(),
})
