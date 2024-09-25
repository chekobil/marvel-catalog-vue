import { createWebHistory, createRouter } from 'vue-router'

import CatalogView from '../components/CatalogView.vue'
import ComicView from '../components/ComicView.vue'
import NotFoundView from '../components/NotFoundView.vue'

const routes = [
  { path: '/', component: CatalogView },
  { path: '/comic/:id', component: ComicView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router