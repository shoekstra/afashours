import { createRouter as createVueRouter, createWebHistory } from 'vue-router'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import HomePage from '../views/HomePage.vue'
import SettingsPage from '../views/SettingsPage.vue'

export function createRouter(oktaAuth) {
  const router = createVueRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true },
      },
      {
        path: '/settings',
        component: SettingsPage,
        meta: { requiresAuth: true },
      },
      {
        // Okta redirects back here after authentication.
        // LoginCallback handles both SP-initiated and IdP-initiated (dashboard tile) flows.
        path: '/login/callback',
        component: LoginCallback,
      },
    ],
  })

  router.beforeEach(navigationGuard)

  return router
}
