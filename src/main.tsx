import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const container = document.getElementById('root')!

// MOUNT ONCE, EVEN IF THIS MODULE RUNS TWICE.
//
// main.tsx exports no component, so an edit to it should force a full page
// reload. In WebContainer it does not always: Vite sends an HMR update, this
// module re-executes, and createRoot() is called a second time on a container
// that already holds a React root. The second call does not return a usable
// root — the ".render is not a function" crash — and the preview goes blank.
//
// One customer lost 75 minutes to that on 2026-09-01, across two projects,
// while the assistant kept blaming the dependency cache and re-applying
// protections that were already present. It also wrote its own version of the
// cache below, which crashed the same way because it trusted whatever was
// stored without checking it.
//
// So: keep the root on the container, and VALIDATE IT BEFORE USE. A stale or
// half-written value from an earlier edit must never be called; the fallback
// is a fresh root, which is always safe.
type RootHolder = HTMLElement & { __weincRoot?: unknown }
const holder = container as RootHolder
const cached = holder.__weincRoot as Root | undefined
const root: Root =
  cached && typeof (cached as Root).render === 'function'
    ? cached
    : createRoot(container)
holder.__weincRoot = root

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);