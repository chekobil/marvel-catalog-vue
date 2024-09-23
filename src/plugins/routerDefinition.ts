import { createMemoryHistory, createRouter } from 'vue-router'

import CatalogView from '../components/CatalogView.vue'
import ComicView from '../components/ComicView.vue'

const routes = [
  { path: '/', component: CatalogView },
  { path: '/comic/:id', component: ComicView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router