import './style.css'

document.documentElement.classList.add('js')

/* expand / collapse "what I'm working on" items */
document.querySelectorAll('[data-expand]').forEach((item) => {
  const btn = item.querySelector('.more-btn')
  const panel = item.querySelector('.work-more')
  const lbl = btn.querySelector('.lbl')
  btn.addEventListener('click', () => {
    const open = item.classList.toggle('open')
    btn.setAttribute('aria-expanded', open ? 'true' : 'false')
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px'
    lbl.textContent = open ? 'Read less' : 'Read more'
  })
})

/* scroll reveal */
;(function () {
  const els = [...document.querySelectorAll('.reveal')]
  if (!els.length) return
  function check() {
    const vh = window.innerHeight || document.documentElement.clientHeight
    for (let i = els.length - 1; i >= 0; i--) {
      const r = els[i].getBoundingClientRect()
      if (r.top < vh * 0.9 && r.bottom > 0) {
        els[i].classList.add('in')
        els.splice(i, 1)
      }
    }
  }
  check()
  window.addEventListener('scroll', check, { passive: true })
  window.addEventListener('resize', check)
})()

/* fade in once fonts/page are ready, then trigger the hero wave */
;(function () {
  let done = false
  function reveal() {
    if (done) return
    done = true
    document.documentElement.classList.remove('preload')
    const w = document.getElementById('wave')
    if (w) setTimeout(() => w.classList.add('waving'), 500)
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reveal)
  window.addEventListener('load', reveal)
  setTimeout(reveal, 800)
  setTimeout(() => document.documentElement.classList.add('shown'), 1500)
})()

/* click-to-reveal email, never written as plain text in the page source */
;(function () {
  const btn = document.getElementById('emailBtn')
  const note = document.getElementById('mailNote')
  let revealed = false
  btn.addEventListener('click', () => {
    const addr = btn.dataset.u + String.fromCharCode(64) + btn.dataset.d + '.' + btn.dataset.t
    if (!revealed) {
      note.textContent = addr
      note.classList.add('show')
      revealed = true
      btn.setAttribute('title', addr)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(addr).then(() => {
          note.textContent = addr + ' · copied!'
        }).catch(() => {})
      }
    } else {
      window.location.href = 'ma' + 'il' + 'to:' + addr
    }
  })
})()
