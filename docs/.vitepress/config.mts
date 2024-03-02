import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blunderland Draft",
  description: "Kaito's random thoughts",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/djalilhebal' }
    ]
  }
})
