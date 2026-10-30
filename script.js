// Header elevation on scroll and footer year. The rest is plain HTML.
const header = document.getElementById('siteHeader')

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 4)
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

document.getElementById('year').textContent = String(new Date().getFullYear())
