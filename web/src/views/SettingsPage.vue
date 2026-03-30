<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@okta/okta-vue'
import { apiFetch } from '../api/client.js'

const { oktaAuth } = useAuth()
const loading = ref(true)
const saving = ref(false)
const saved = ref(false)
const error = ref(null)

// Toggl token — only sent if the user types a new value.
const hasTogglToken = ref(false)
const togglToken = ref('')

// Project mappings: array of { label, code, type } for the form.
const projects = ref([])
// Track whether the user has interacted with the projects section so we can
// send an explicit empty map to clear all mappings when they delete everything.
const projectsTouched = ref(false)

onMounted(async () => {
  try {
    const res = await apiFetch(oktaAuth, '/user/me/preferences')
    const prefs = await res.json()
    hasTogglToken.value = prefs.has_toggl_token
    if (prefs.projects) {
      projects.value = Object.entries(prefs.projects).map(([label, m]) => ({
        label,
        code: m.code,
        type: m.type,
      }))
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

function addProject() {
  projectsTouched.value = true
  projects.value.push({ label: '', code: '', type: '' })
}

function removeProject(index) {
  projectsTouched.value = true
  projects.value.splice(index, 1)
}

async function save() {
  saving.value = true
  saved.value = false
  error.value = null

  const patch = {}

  if (togglToken.value.trim()) {
    patch.toggl_token = togglToken.value.trim()
  }

  const projectMap = {}
  for (const p of projects.value) {
    const label = p.label.trim()
    if (label) {
      projectMap[label] = { code: p.code.trim(), type: p.type.trim() }
    }
  }
  // Only include projects when the user explicitly touched the section, so an
  // empty map clears all stored mappings and a token-only save leaves them alone.
  if (projectsTouched.value) {
    patch.projects = projectMap
  }

  try {
    await apiFetch(oktaAuth, '/user/me/preferences', {
      method: 'PATCH',
      body: JSON.stringify(patch),
    })
    saved.value = true
    togglToken.value = ''
    projectsTouched.value = false
    if (patch.toggl_token) hasTogglToken.value = true
  } catch (e) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="page">
    <header>
      <h1>Settings</h1>
      <nav>
        <RouterLink to="/">← Home</RouterLink>
      </nav>
    </header>

    <div v-if="loading">Loading…</div>

    <template v-else>
      <section class="card">
        <h2>Toggl API token</h2>
        <p v-if="hasTogglToken" class="hint">A token is already saved. Enter a new value below to replace it.</p>
        <p v-else class="hint">No token saved yet. Find yours at <a href="https://track.toggl.com/profile" target="_blank" rel="noopener">track.toggl.com/profile</a>.</p>
        <input
          type="password"
          v-model="togglToken"
          placeholder="Paste new token (leave blank to keep existing)"
          autocomplete="off"
        />
      </section>

      <section class="card">
        <h2>Project mappings</h2>
        <p class="hint">Map Toggl project names to AFAS project codes and type item codes.</p>

        <table v-if="projects.length">
          <thead>
            <tr>
              <th>Toggl project name</th>
              <th>AFAS code</th>
              <th>AFAS type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in projects" :key="i">
              <td><input v-model="p.label" @input="projectsTouched = true" placeholder="My project" /></td>
              <td><input v-model="p.code" @input="projectsTouched = true" placeholder="PROJ001" /></td>
              <td><input v-model="p.type" @input="projectsTouched = true" placeholder="INTERNAL" /></td>
              <td><button class="remove" @click="removeProject(i)">✕</button></td>
            </tr>
          </tbody>
        </table>

        <button class="secondary" @click="addProject">+ Add project</button>
      </section>

      <div class="actions">
        <span v-if="saved" class="success">Saved.</span>
        <span v-if="error" class="fail">{{ error }}</span>
        <button @click="save" :disabled="saving">{{ saving ? 'Saving…' : 'Save' }}</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.page { max-width: 720px; margin: 0 auto; padding: 1.5rem 1rem; }
header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
h1 { margin: 0; font-size: 1.4rem; }
nav a { color: inherit; }
.card { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 1.25rem 1.5rem; margin-bottom: 1.25rem; }
h2 { margin: 0 0 0.5rem; font-size: 1rem; }
.hint { margin: 0 0 0.75rem; color: #555; font-size: 0.88rem; }
input[type="password"], input:not([type]) {
  width: 100%; box-sizing: border-box; padding: 0.4rem 0.5rem;
  border: 1px solid #ccc; border-radius: 4px; font-size: 0.9rem;
}
table { width: 100%; border-collapse: collapse; margin-bottom: 0.75rem; }
th { text-align: left; font-size: 0.8rem; color: #666; padding-bottom: 0.4rem; }
td { padding: 0.2rem 0.4rem 0.2rem 0; }
td:last-child { width: 2rem; text-align: center; }
td input { width: 100%; }
button.remove { background: none; border: none; cursor: pointer; color: #c00; font-size: 0.85rem; }
button.secondary { background: none; border: 1px solid #aaa; border-radius: 4px; padding: 0.3rem 0.75rem; cursor: pointer; font-size: 0.85rem; }
.actions { display: flex; align-items: center; gap: 1rem; justify-content: flex-end; }
.success { color: #2e7d32; font-size: 0.9rem; }
.fail { color: #b71c1c; font-size: 0.9rem; }
button:not(.remove):not(.secondary) { padding: 0.4rem 1.25rem; background: #0078d4; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem; }
button:disabled { opacity: 0.6; cursor: default; }
</style>
