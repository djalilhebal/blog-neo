// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Base from "./Base.vue";

export default {
  extends: DefaultTheme,
  Layout: Base,
} satisfies Theme
