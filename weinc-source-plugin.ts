/**
 * weinc-source-plugin WEINC_TAGGER_V3_2 — stamps data-source-file/line/col on
 * every rendered element by shimming react/jsx-dev-runtime (dev only).
 * No source transformation: it cannot corrupt or skip files.
 */
const WEINC_SHIM_ID = '\0weinc-jsx-dev-shim';
// The shim reaches the REAL runtime through this alias specifier instead of
// re-importing 'react/jsx-dev-runtime'. Matching on the importer id to break
// the self-import loop is unreliable — Vite variants pass the virtual id
// escaped ('__x00__weinc-jsx-dev-shim'), which caused "Detected cycle while
// resolving name 'Fragment'" in WebContainers. A distinct specifier needs no
// importer matching at all.
const WEINC_REAL_RUNTIME = 'weinc-real-jsx-dev-runtime';

const WEINC_SHIM_SOURCE = [
  // Fragment must be a live RE-EXPORT, not a top-level property read:
  // reading WeincRuntime.Fragment at module-eval time hits the TDZ when the
  // runtime module hasn't finished initializing ("Cannot access 'Fragment'
  // before initialization" — reproduced in WebContainers). jsxDEV only reads
  // the runtime at call time (render), which is always after init.
  "export { Fragment } from 'weinc-real-jsx-dev-runtime';",
  "import * as WeincRuntime from 'weinc-real-jsx-dev-runtime';",
  "function weincTag(type, props, source) {",
  "  try {",
  "    if (!source || !props || typeof props !== 'object') return props;",
  "    if ('data-source-file' in props || 'data-weinc-inst' in props) return props;",
  "    var file = String(source.fileName || '');",
  "    var srcIdx = file.indexOf('/src/');",
  "    if (srcIdx < 0) return props;",
  "    var rel = file.slice(srcIdx + 1);",
  "    var line = source.lineNumber;",
  "    var col = (source.columnNumber || 1) - 1;",
  "    if (typeof line !== 'number') return props;",
  "    var out = {};",
  "    for (var k in props) out[k] = props[k];",
  "    if (typeof type === 'string') {",
  "      out['data-source-file'] = rel;",
  "      out['data-source-line'] = line;",
  "      out['data-source-col'] = col;",
  "    } else if (typeof type === 'function' || (typeof type === 'object' && type !== null)) {",
  "      out['data-weinc-inst'] = rel + ':' + line + ':' + col;",
  "    } else {",
  "      return props;",
  "    }",
  "    return out;",
  "  } catch (e) { return props; }",
  "}",
  "export function jsxDEV(type, props, key, isStatic, source, self) {",
  "  return WeincRuntime.jsxDEV(type, weincTag(type, props, source), key, isStatic, source, self);",
  "}",
].join('\n');

export function weincSourcePlugin() {
  return {
    name: 'weinc-source-attrs',
    enforce: 'pre',
    apply: 'serve', // Only in dev mode — jsx-runtime (prod) is never touched

    async resolveId(source, importer) {
      if (source === 'react/jsx-dev-runtime') return WEINC_SHIM_ID;
      if (source === WEINC_REAL_RUNTIME) {
        // The shim's own path to the real runtime. skipSelf keeps this
        // this.resolve call out of our own hook; the specifier differs from
        // 'react/jsx-dev-runtime' anyway, so no cycle is possible.
        const real = await this.resolve('react/jsx-dev-runtime', importer, { skipSelf: true });
        return real || null;
      }
      return null;
    },

    load(id) {
      if (id !== WEINC_SHIM_ID) return null;
      return WEINC_SHIM_SOURCE;
    },
  };
}