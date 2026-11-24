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

// No backdrop: the warm surfaces alone, so nothing sits behind the words.
const LOOK: ThemeSetArgs = { colors: theme }

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
}
