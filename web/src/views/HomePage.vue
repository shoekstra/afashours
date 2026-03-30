<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@okta/okta-vue'
import { apiFetch } from '../api/client.js'

const router = useRouter()
const { authState, oktaAuth } = useAuth()

const user = ref(null)
// Use local time so the month matches what the user sees in their calendar.
const now = new Date()
const month = ref(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`)
const syncing = ref(false)
const jobStatus = ref(null)   // null | 'pending' | 'running' | 'complete' | 'failed'
const jobSummary = ref(null)
const jobError = ref(null)
let pollTimer = null
let pollStopped = false

onMounted(async () => {
  try {
    const res = await apiFetch(oktaAuth, '/user/me')
    user.value = await res.json()
  } catch (e) {
    // Non-fatal; user info is decorative.
  }
})

async function startSync() {
  pollStopped = false
  syncing.value = true
  jobStatus.value = 'pending'
  jobSummary.value = null
  jobError.value = null

  try {
    const res = await apiFetch(oktaAuth, '/sync', {
      method: 'POST',
      body: JSON.stringify({ month: month.value }),
    })
    const { job_id } = await res.json()
    await pollJob(job_id)
  } catch (e) {
    jobStatus.value = 'failed'
    jobError.value = e.message
    syncing.value = false
  }
}

async function pollJob(jobID) {
  if (pollStopped) return
  try {
    const res = await apiFetch(oktaAuth, `/sync/${jobID}`)
    if (pollStopped) return
    const job = await res.json()
    jobStatus.value = job.status

    if (job.status === 'complete' || job.status === 'failed') {
      jobSummary.value = job.summary
      if (job.status === 'failed') {
        jobError.value = job.summary?.error || 'Sync failed'
      }
      syncing.value = false
      return
    }

    if (!pollStopped) {
      pollTimer = setTimeout(() => pollJob(jobID), 2000)
    }
  } catch (e) {
    if (pollStopped) return
    jobStatus.value = 'failed'
    jobError.value = e.message
    syncing.value = false
  }
}

function stopPolling() {
  pollStopped = true
  if (pollTimer) {
    clearTimeout(pollTimer)
    pollTimer = null
  }
}

function signOut() {
  stopPolling()
  oktaAuth.signOut()
}

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<template>
  <div class="page">
    <header>
      <h1>afashours</h1>
      <nav>
        <RouterLink to="/settings">Settings</RouterLink>
        <button class="link" @click="signOut">Sign out</button>
      </nav>
    </header>

    <main>
      <p v-if="user" class="greeting">Signed in as <strong>{{ user.subject }}</strong></p>

      <section class="card">
        <h2>Sync hours to AFAS</h2>
        <div class="row">
          <label for="month">Month</label>
          <input id="month" type="month" v-model="month" :disabled="syncing" />
          <button @click="startSync" :disabled="syncing">
            {{ syncing ? 'Syncing…' : 'Sync' }}
          </button>
        </div>

        <div v-if="jobStatus" class="status" :class="jobStatus">
          <template v-if="jobStatus === 'pending' || jobStatus === 'running'">
            Sync in progress…
          </template>
          <template v-else-if="jobStatus === 'complete'">
            ✓ Sync complete —
            {{ jobSummary?.entries_synced ?? 0 }} entries synced,
            {{ jobSummary?.entries_skipped ?? 0 }} skipped
            ({{ jobSummary?.entries_found ?? 0 }} found)
          </template>
          <template v-else-if="jobStatus === 'failed'">
            ✗ Sync failed: {{ jobError }}
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page { max-width: 640px; margin: 0 auto; padding: 1.5rem 1rem; }
header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
h1 { margin: 0; font-size: 1.4rem; }
nav { display: flex; align-items: center; gap: 1rem; }
nav a { color: inherit; }
button.link { background: none; border: none; cursor: pointer; padding: 0; color: inherit; text-decoration: underline; }
.greeting { margin-top: 0; color: #555; }
.card { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 1.25rem 1.5rem; }
h2 { margin: 0 0 1rem; font-size: 1rem; }
.row { display: flex; align-items: center; gap: 0.75rem; }
input[type="month"] { padding: 0.35rem 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
button:not(.link) { padding: 0.4rem 1rem; border: none; border-radius: 4px; background: #0078d4; color: #fff; cursor: pointer; font-size: 0.9rem; }
button:disabled { opacity: 0.6; cursor: default; }
.status { margin-top: 1rem; padding: 0.6rem 0.9rem; border-radius: 4px; font-size: 0.9rem; }
.status.pending, .status.running { background: #fff8e1; color: #7a5c00; }
.status.complete { background: #e8f5e9; color: #2e7d32; }
.status.failed { background: #fdecea; color: #b71c1c; }
</style>
