const { switchVersion } = require('./utils.js')
const { exec } = require('child_process')

const version = process.argv[2]
const vueEntry = process.argv[3] || 'vue'

if (version == '3') {
  switchVersion(3)
  console.log(`[formily-vue] Switched types for Vue 3`)
  exec(`npx vue-demi-switch 3 ${vueEntry}`)
  console.log(`[vue-demi] Switched for Vue 3 (entry: "${vueEntry}")`)
} else {
  console.warn(
    `[formily-vue] expecting version "2" or "3" but got "${version}"`
  )
  process.exit(1)
}
