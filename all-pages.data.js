import { globby } from 'globby'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default {
  watch: ['../pages/**/*.md'],
  async load() {
    const files = await globby(['../pages/**/index.md', '../pages/**/*.md'], {
      ignore: ['../pages/index.md'],
      cwd: __dirname,
    })

    // Get only top-level directories and files
    const topLevelPaths = files.filter(file => {
      const parts = file.split('/')
      return parts.length <= 4 // Adjust this number based on your directory structure
    })

    const pages = await Promise.all(
      topLevelPaths.map(async (file) => {
        const filePath = path.resolve(__dirname, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data: frontmatter } = matter(content)
        
        // Convert file path to URL path
        const urlPath = file
          .replace('../pages/', '')
          .replace(/index\.md$/, '')
          .replace(/\.md$/, '')

        return {
          path: urlPath,
          title: frontmatter.title,
          frontmatter
        }
      })
    )

    // Sort pages alphabetically
    return pages.sort((a, b) => a.path.localeCompare(b.path))
  }
}
