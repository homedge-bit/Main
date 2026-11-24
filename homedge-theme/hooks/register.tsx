import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// HomEdge: warm cream and terracotta by day, a lamp-lit evening at night.
const { theme, problems } = makeColors({
  label: 'HomEdge',
  roles: { accent: '#b5562f', danger: '#b3392f', success: '#5a7d52', warning: '#b07a1c', pro: '#3f5f7a' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#f1e9dc',
        'surface-1': '#f6f0e6',
        'surface-2': '#fbf7f0',
        'text-primary': '#2b2520',
        'text-secondary': '#53483e',
        'text-muted': '#6b5f53',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#1c1916',
        'surface-1': '#24201c',
        'surface-2': '#2c2722',
        'surface-3': '#332d27',
        'text-primary': '#f2eadf',
        'text-secondary': '#d0c5b7',
        'text-muted': '#ada091',
      },
    },
  },
})

// A row of homes along the top-right corner; their windows glow slowly.
const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
.wash { fill: #efe4d2 }
.house { fill: none; stroke: #b5562f; stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; opacity: 0.32 }
.ground { stroke: #b5562f; stroke-width: 2; opacity: 0.22 }
.win { fill: #e0a458; opacity: 0.35; animation: glow 9s ease-in-out infinite }
.w2 { animation-delay: 3s }
.w3 { animation-delay: 6s }
.sun { fill: #e9b98a; opacity: 0.35 }
@keyframes glow { 0%, 100% { opacity: 0.25 } 50% { opacity: 0.55 } }
@media (prefers-color-scheme: dark) {
  .wash { fill: #1c1916 }
  .house { stroke: #d98a5f; opacity: 0.28 }
  .ground { stroke: #d98a5f; opacity: 0.18 }
  .win { fill: #f2b65e; opacity: 0.45 }
  .sun { fill: #e8d9b5; opacity: 0.18 }
  @keyframes glow { 0%, 100% { opacity: 0.35 } 50% { opacity: 0.8 } }
}
</style>
<rect class="wash" width="1600" height="1000"/>
<svg x="0" y="0" width="1600" height="1000" viewBox="0 0 520 220" preserveAspectRatio="xMaxYMin meet">
  <circle class="sun" cx="470" cy="40" r="22"/>
  <!-- tall home -->
  <path class="house" d="M250 170 V110 L290 78 L330 110 V170"/>
  <rect class="win" x="270" y="118" width="14" height="14" rx="2"/>
  <rect class="win w2" x="296" y="118" width="14" height="14" rx="2"/>
  <path class="house" d="M282 170 V148 H298 V170"/>
  <!-- wide home with chimney -->
  <path class="house" d="M340 170 V120 L395 88 L450 120 V170"/>
  <path class="house" d="M425 104 V84 H437 V111"/>
  <rect class="win w3" x="358" y="128" width="16" height="16" rx="2"/>
  <rect class="win" x="416" y="128" width="16" height="16" rx="2"/>
  <path class="house" d="M386 170 V142 H404 V170"/>
  <!-- small cottage -->
  <path class="house" d="M460 170 V134 L485 116 L510 134 V170"/>
  <rect class="win w2" x="478" y="140" width="14" height="14" rx="2"/>
  <line class="ground" x1="230" y1="171" x2="520" y2="171"/>
</svg>
</svg>`

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'homedge-homes', glass: { blur: 12, opacity: 0.7 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'homedge-homes') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="A quiet row of homes with softly glowing windows" />
  })
}
