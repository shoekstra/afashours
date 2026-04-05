import { createApp } from 'vue'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import App from './App.vue'
import { createRouter } from './router/index.js'
import { API_BASE } from './api/client.js'

// Fetch runtime config from the backend before mounting so the Okta client ID
// and issuer URL are not baked into the build artefact.
let cfg
try {
  const res = await fetch(`${API_BASE}/config`)
  if (!res.ok) {
    throw new Error(`Server returned ${res.status}`)
  }
  cfg = await res.json()
} catch (err) {
  document.getElementById('loading').textContent = `Failed to load configuration: ${err.message}`
  throw err
}

const oktaAuth = new OktaAuth({
  issuer: cfg.okta_issuer,
  clientId: cfg.okta_client_id,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
})

const router = createRouter(oktaAuth)
const app = createApp(App)

app.use(OktaVue, { oktaAuth })
app.use(router)

// Hide the loading placeholder and show the app once Vue is ready.
document.getElementById('loading').style.display = 'none'
document.getElementById('app').style.display = ''

app.mount('#app')
