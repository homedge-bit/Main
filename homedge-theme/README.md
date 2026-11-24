# HomEdge theme for Claude Code

A HomEdge look for the Claude desktop and mobile apps. Light mode uses warm cream
surfaces with terracotta highlights. Dark mode is a lamp-lit evening version on
warm brown-charcoal. A faint row of three homes sits in the top-right corner of
the background, and their windows glow slowly (they hold still when reduced
motion is on).

The terminal and code editors don't draw themes; permission prompts and code
blocks keep the app's own look.

## Install

```
/plugin marketplace add homedge-bit/Main
/plugin install homedge-theme@homedge
```

## Files

- `hooks/register.tsx` – the colors and the background drawing
- `hooks/make-colors.js` – the helper that turns the palette into the app's color names
