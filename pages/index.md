---
layout: home
title: Blog (neo)
hero:
  name: Blunederland
  text: Blog (neo)
  tagline: WIP
---

<script setup>
import { data as pages } from './all-pages.data.js'
import { withBase } from 'vitepress'
</script>

<div class="content-container">
  <div class="content-list">
    <div v-for="page in pages" :key="page.path" class="content-item">
      <a :href="withBase(page.path)" class="content-link">
        <h3>{{ page.title || page.path }}</h3>
        <p v-if="page.frontmatter?.description">{{ page.frontmatter.description }}</p>
      </a>
    </div>
  </div>
</div>

<style scoped>
.content-container {
  margin: 0 auto;
}

.content-list {
  padding: 1rem;
}

.content-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.content-link {
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.content-link h3 {
  margin-top: 0;
  font-size: 1.2rem;
}

.content-link p {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style>
