// Theme, header elevation, platform hint, and footer year. Everything else
// is plain HTML so the page still works with JavaScript switched off.

const root = document.documentElement
const header = document.getElementById('siteHeader')
const themeToggle = document.getElementById('themeToggle')

/* ---------- theme ---------- */

let savedTheme = 'light'
try {
  savedTheme = localStorage.getItem('bevery-theme') || 'light'
} catch {
  // Storage can be blocked; the light theme is still a fine default.
}

root.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light'

function syncThemeButton() {
  const dark = root.dataset.theme === 'dark'
  themeToggle.setAttribute('aria-pressed', String(dark))
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme')
  themeToggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme'
}

themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
  root.dataset.theme = next
  try {
    localStorage.setItem('bevery-theme', next)
  } catch {
    // Ignore storage failures.
  }
  syncThemeButton()
})

syncThemeButton()

/* ---------- header + year ---------- */

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 4)
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

document.getElementById('year').textContent = String(new Date().getFullYear())

/* ---------- platform hint ---------- */

const ua = navigator.userAgent || ''
const hint = navigator.userAgentData?.platform || navigator.platform || ''
const isAndroid = /android/i.test(ua)
const isLinux = !isAndroid && /linux/i.test(`${ua} ${hint}`)
const isWindows = /windows|win32|win64/i.test(`${ua} ${hint}`)

const platform = isAndroid ? 'android' : isLinux ? 'linux' : isWindows ? 'windows' : null

if (platform) {
  const card = document.querySelector(`.platform-card[data-platform="${platform}"]`)
  if (card) {
    card.classList.add('is-recommended')
    const badge = card.querySelector('[data-rec]')
    if (badge) badge.hidden = false
  }

  const label = {
    windows: 'Download for Windows',
    linux: 'Download for Linux',
    android: 'Download for Android',
  }[platform]

  const dlLabel = document.querySelector('#heroDownload [data-dl-label]')
  if (dlLabel) dlLabel.textContent = label
}
