# CoBuilder TUI Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the TUI from "OPEN CODE" to "CO BUILDER" with a signature theme (deep navy + cyan accent) and gradient logo.

**Architecture:** Four-file change. New `cobuilder.json` theme follows existing JSON schema. Logo data (`logo.ts`) is a pure data swap. Logo component (`logo.tsx`) adds per-letter gradient coloring for the right side. Theme registration (`theme.tsx`) adds import + changes default fallback.

**Tech Stack:** TypeScript, Solid.js, OpenTUI, JSON theme files

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `packages/opencode/src/cli/cmd/tui/context/theme/cobuilder.json` | Create | Signature theme color definitions |
| `packages/opencode/src/cli/cmd/tui/context/theme.tsx` | Modify | Import theme, register in DEFAULT_THEMES, change default fallback |
| `packages/opencode/src/cli/logo.ts` | Modify | Block-letter art data: "OPEN CODE" -> "CO BUILDER" |
| `packages/opencode/src/cli/cmd/tui/component/logo.tsx` | Modify | Per-letter gradient coloring on right side |

---

### Task 1: Create CoBuilder Signature Theme

**Files:**
- Create: `packages/opencode/src/cli/cmd/tui/context/theme/cobuilder.json`

- [ ] **Step 1: Create the theme JSON file**

Create `packages/opencode/src/cli/cmd/tui/context/theme/cobuilder.json` with this content:

```json
{
  "$schema": "https://opencode.ai/theme.json",
  "defs": {
    "darkStep1": "#0B1120",
    "darkStep2": "#111827",
    "darkStep3": "#1A2332",
    "darkStep4": "#1E293B",
    "darkStep5": "#263348",
    "darkStep6": "#162D4A",
    "darkStep7": "#1E3A5F",
    "darkStep8": "#2D5A8E",
    "darkStep9": "#22D3EE",
    "darkStep10": "#67E8F9",
    "darkStep11": "#64748B",
    "darkStep12": "#E2E8F0",
    "darkRed": "#F87171",
    "darkOrange": "#FBBF24",
    "darkYellow": "#FBBF24",
    "darkGreen": "#34D399",
    "darkCyan": "#60A5FA",
    "darkPurple": "#A78BFA",
    "darkSecondary": "#A78BFA",
    "darkAccent": "#22D3EE",
    "lightStep1": "#F8FAFC",
    "lightStep2": "#F1F5F9",
    "lightStep3": "#E2E8F0",
    "lightStep4": "#CBD5E1",
    "lightStep5": "#94A3B8",
    "lightStep6": "#CBD5E1",
    "lightStep7": "#94A3B8",
    "lightStep8": "#64748B",
    "lightStep9": "#0891B2",
    "lightStep10": "#06B6D4",
    "lightStep11": "#64748B",
    "lightStep12": "#0F172A",
    "lightRed": "#DC2626",
    "lightOrange": "#D97706",
    "lightYellow": "#D97706",
    "lightGreen": "#059669",
    "lightCyan": "#2563EB",
    "lightPurple": "#7C3AED",
    "lightSecondary": "#7C3AED",
    "lightAccent": "#0891B2"
  },
  "theme": {
    "primary": {
      "dark": "darkStep9",
      "light": "lightStep9"
    },
    "secondary": {
      "dark": "darkSecondary",
      "light": "lightSecondary"
    },
    "accent": {
      "dark": "darkAccent",
      "light": "lightAccent"
    },
    "error": {
      "dark": "darkRed",
      "light": "lightRed"
    },
    "warning": {
      "dark": "darkOrange",
      "light": "lightOrange"
    },
    "success": {
      "dark": "darkGreen",
      "light": "lightGreen"
    },
    "info": {
      "dark": "darkCyan",
      "light": "lightCyan"
    },
    "text": {
      "dark": "darkStep12",
      "light": "lightStep12"
    },
    "textMuted": {
      "dark": "darkStep11",
      "light": "lightStep11"
    },
    "background": {
      "dark": "darkStep1",
      "light": "lightStep1"
    },
    "backgroundPanel": {
      "dark": "darkStep2",
      "light": "lightStep2"
    },
    "backgroundElement": {
      "dark": "darkStep3",
      "light": "lightStep3"
    },
    "border": {
      "dark": "darkStep7",
      "light": "lightStep7"
    },
    "borderActive": {
      "dark": "darkStep8",
      "light": "lightStep8"
    },
    "borderSubtle": {
      "dark": "darkStep6",
      "light": "lightStep6"
    },
    "diffAdded": {
      "dark": "#34D399",
      "light": "#059669"
    },
    "diffRemoved": {
      "dark": "#F87171",
      "light": "#DC2626"
    },
    "diffContext": {
      "dark": "#64748B",
      "light": "#64748B"
    },
    "diffHunkHeader": {
      "dark": "#64748B",
      "light": "#64748B"
    },
    "diffHighlightAdded": {
      "dark": "#6EE7B7",
      "light": "#4DB380"
    },
    "diffHighlightRemoved": {
      "dark": "#FCA5A5",
      "light": "#F87171"
    },
    "diffAddedBg": {
      "dark": "#0F2A22",
      "light": "#D5E5D5"
    },
    "diffRemovedBg": {
      "dark": "#2A1215",
      "light": "#F7D8DB"
    },
    "diffContextBg": {
      "dark": "darkStep2",
      "light": "lightStep2"
    },
    "diffLineNumber": {
      "dark": "darkStep3",
      "light": "lightStep3"
    },
    "diffAddedLineNumberBg": {
      "dark": "#122D24",
      "light": "#C5D5C5"
    },
    "diffRemovedLineNumberBg": {
      "dark": "#2D151A",
      "light": "#E7C8CB"
    },
    "markdownText": {
      "dark": "darkStep12",
      "light": "lightStep12"
    },
    "markdownHeading": {
      "dark": "darkStep9",
      "light": "lightStep9"
    },
    "markdownLink": {
      "dark": "darkAccent",
      "light": "lightAccent"
    },
    "markdownCode": {
      "dark": "darkSecondary",
      "light": "lightSecondary"
    },
    "markdownCodeBlock": {
      "dark": "darkStep3",
      "light": "lightStep3"
    },
    "markdownBlockquote": {
      "dark": "darkStep11",
      "light": "lightStep11"
    },
    "markdownHorizontalRule": {
      "dark": "darkStep7",
      "light": "lightStep7"
    },
    "markdownListEnumeration": {
      "dark": "darkStep9",
      "light": "lightStep9"
    },
    "markdownImage": {
      "dark": "darkOrange",
      "light": "lightOrange"
    },
    "markdownImageText": {
      "dark": "darkStep12",
      "light": "lightStep12"
    },
    "syntaxKeyword": {
      "dark": "#22D3EE",
      "light": "#0891B2"
    },
    "syntaxFunction": {
      "dark": "#60A5FA",
      "light": "#2563EB"
    },
    "syntaxString": {
      "dark": "#34D399",
      "light": "#059669"
    },
    "syntaxNumber": {
      "dark": "#FBBF24",
      "light": "#D97706"
    },
    "syntaxType": {
      "dark": "#A78BFA",
      "light": "#7C3AED"
    },
    "syntaxComment": {
      "dark": "#475569",
      "light": "#94A3B8"
    },
    "syntaxVariable": {
      "dark": "#E2E8F0",
      "light": "#0F172A"
    },
    "syntaxOperator": {
      "dark": "#94A3B8",
      "light": "#475569"
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/opencode/src/cli/cmd/tui/context/theme/cobuilder.json
git commit -m "feat: add CoBuilder signature theme"
```

---

### Task 2: Register Theme and Set as Default

**Files:**
- Modify: `packages/opencode/src/cli/cmd/tui/context/theme.tsx`

- [ ] **Step 1: Add the import**

Add this line after the `carbonfox` import (line 38):

```typescript
import cobuilder from "./theme/cobuilder.json" with { type: "json" }
```

- [ ] **Step 2: Add to DEFAULT_THEMES**

In the `DEFAULT_THEMES` record, add `cobuilder` as the first entry (before `aura`):

```typescript
export const DEFAULT_THEMES: Record<string, ThemeJson> = {
  cobuilder,
  aura,
  ayu,
  // ... rest unchanged
}
```

- [ ] **Step 3: Change default fallback from "opencode" to "cobuilder"**

There are 4 locations where `"opencode"` is used as the fallback theme name. Change each one:

**Line 295** — KV default:
```typescript
// Before:
active: (config.theme ?? kv.get("theme", "opencode")) as string,
// After:
active: (config.theme ?? kv.get("theme", "cobuilder")) as string,
```

**Line 315** — Custom themes error catch:
```typescript
// Before:
setStore("active", "opencode")
// After:
setStore("active", "cobuilder")
```

**Line 336** — System theme palette failure:
```typescript
// Before:
draft.active = "opencode"
// After:
draft.active = "cobuilder"
```

**Line 385** — Theme resolution fallback:
```typescript
// Before:
return resolveTheme(store.themes[store.active] ?? store.themes.opencode, store.mode)
// After:
return resolveTheme(store.themes[store.active] ?? store.themes.cobuilder, store.mode)
```

- [ ] **Step 4: Commit**

```bash
git add packages/opencode/src/cli/cmd/tui/context/theme.tsx
git commit -m "feat: register cobuilder theme and set as default"
```

---

### Task 3: Rewrite Logo Data

**Files:**
- Modify: `packages/opencode/src/cli/logo.ts`

- [ ] **Step 1: Replace the logo data**

Replace the entire contents of `packages/opencode/src/cli/logo.ts` with:

```typescript
export const logo = {
  left: ["              ", "█▀▀▀ █▀▀█     ", "█___ █__█     ", "▀▀▀▀ ▀▀▀▀     "],
  right: ["                                        ", "█▀▀▄ █  █ ▀█▀  █    █▀▀▄ █▀▀▀ █▀▀█", "█__█ █__█  █   █    █__█ █^^^ █^^^", "▀▀▀  ▀▀▀▀ ▀▀▀  ▀▀▀▀ ▀▀▀  ▀▀▀▀ ▀  ▀"],
  // Letter boundaries for gradient mapping (character index where each letter starts)
  // B=0, U=5, I=10, L=15, D=21, E=26, R=31
  letterStarts: [0, 5, 10, 15, 21, 26, 31],
}

export const marks = "_^~"
```

Key design notes:
- Left side "CO" is 14 chars wide (2 block letters at 5 chars each + trailing spaces)
- Right side "BUILDER" is 36 chars wide (7 block letters)
- Each block letter is approximately 4-5 chars wide with 1-space separators
- `letterStarts` array maps each letter's starting character position for gradient coloring
- Line 0 of each side is spacing (matching current pattern where line 0 has minimal content)
- Shadow markers `_` and `^` placed on the middle row where letter shapes have shadow-casting edges
- The `marks` export is unchanged

- [ ] **Step 2: Verify the logo renders correctly in non-TUI mode**

```bash
cd packages/opencode && bun run -e "const { logo } = require('./src/cli/logo'); console.log(logo.left.map((l, i) => l + ' ' + logo.right[i]).join('\n'))"
```

Expected output (approximate):
```

█▀▀▀ █▀▀█      █▀▀▄ █  █ ▀█▀  █    █▀▀▄ █▀▀▀ █▀▀█
█___ █__█      █__█ █__█  █   █    █__█ █^^^ █^^^
▀▀▀▀ ▀▀▀▀      ▀▀▀  ▀▀▀▀ ▀▀▀  ▀▀▀▀ ▀▀▀  ▀▀▀▀ ▀  ▀
```

- [ ] **Step 3: Commit**

```bash
git add packages/opencode/src/cli/logo.ts
git commit -m "feat: rebrand logo from OPEN CODE to CO BUILDER"
```

---

### Task 4: Add Gradient Coloring to Logo Component

**Files:**
- Modify: `packages/opencode/src/cli/cmd/tui/component/logo.tsx`

- [ ] **Step 1: Replace the entire logo.tsx with gradient support**

Replace the contents of `packages/opencode/src/cli/cmd/tui/component/logo.tsx` with:

```tsx
import { TextAttributes, RGBA } from "@opentui/core"
import { For, type JSX } from "solid-js"
import { useTheme, tint } from "@tui/context/theme"
import { logo, marks } from "@/cli/logo"

// Shadow markers (rendered chars in parens):
// _ = full shadow cell (space with bg=shadow)
// ^ = letter top, shadow bottom (▀ with fg=letter, bg=shadow)
// ~ = shadow top only (▀ with fg=shadow)
const SHADOW_MARKER = new RegExp(`[${marks}]`)

// Cyan-to-blue gradient for "BUILDER" (7 letters)
const GRADIENT_COLORS = [
  "#22D3EE", // B
  "#27C4EB", // U
  "#2CB5E8", // I
  "#31A6E5", // L
  "#3697E2", // D
  "#3B88DF", // E
  "#3B82F6", // R
]

// Map character position in a logo line to its letter index
// using the letterStarts boundaries from logo data.
function getLetterIndex(charPos: number): number {
  const starts = logo.letterStarts
  for (let i = starts.length - 1; i >= 0; i--) {
    if (charPos >= starts[i]) return i
  }
  return 0
}

export function Logo() {
  const { theme, selected } = useTheme()
  const isCobuilderTheme = () => selected === "cobuilder"

  const renderLine = (line: string, fg: RGBA, bold: boolean, gradient?: RGBA[]): JSX.Element[] => {
    const attrs = bold ? TextAttributes.BOLD : undefined
    const elements: JSX.Element[] = []
    let i = 0

    while (i < line.length) {
      const rest = line.slice(i)
      const markerIndex = rest.search(SHADOW_MARKER)

      if (markerIndex === -1) {
        // No more markers -- render remaining text
        if (gradient) {
          // Render character-by-character with gradient colors
          for (let j = 0; j < rest.length; j++) {
            const letterIdx = getLetterIndex(i + j)
            const color = gradient[letterIdx] ?? fg
            elements.push(
              <text fg={color} attributes={attrs} selectable={false}>
                {rest[j]}
              </text>,
            )
          }
        } else {
          elements.push(
            <text fg={fg} attributes={attrs} selectable={false}>
              {rest}
            </text>,
          )
        }
        break
      }

      if (markerIndex > 0) {
        if (gradient) {
          for (let j = 0; j < markerIndex; j++) {
            const letterIdx = getLetterIndex(i + j)
            const color = gradient[letterIdx] ?? fg
            elements.push(
              <text fg={color} attributes={attrs} selectable={false}>
                {rest[j]}
              </text>,
            )
          }
        } else {
          elements.push(
            <text fg={fg} attributes={attrs} selectable={false}>
              {rest.slice(0, markerIndex)}
            </text>,
          )
        }
      }

      const marker = rest[markerIndex]
      const charPos = i + markerIndex
      const letterIdx = gradient ? getLetterIndex(charPos) : 0
      const markerFg = gradient ? (gradient[letterIdx] ?? fg) : fg
      const shadow = tint(theme.background, markerFg, 0.25)

      switch (marker) {
        case "_":
          elements.push(
            <text fg={markerFg} bg={shadow} attributes={attrs} selectable={false}>
              {" "}
            </text>,
          )
          break
        case "^":
          elements.push(
            <text fg={markerFg} bg={shadow} attributes={attrs} selectable={false}>
              ▀
            </text>,
          )
          break
        case "~":
          elements.push(
            <text fg={shadow} attributes={attrs} selectable={false}>
              ▀
            </text>,
          )
          break
      }

      i += markerIndex + 1
    }

    return elements
  }

  const gradientRGBA = () => {
    if (!isCobuilderTheme()) return undefined
    return GRADIENT_COLORS.map((hex) => RGBA.fromHex(hex))
  }

  return (
    <box>
      <For each={logo.left}>
        {(line, index) => (
          <box flexDirection="row" gap={1}>
            <box flexDirection="row">{renderLine(line, theme.textMuted, false)}</box>
            <box flexDirection="row">
              {renderLine(logo.right[index()], theme.text, true, gradientRGBA())}
            </box>
          </box>
        )}
      </For>
    </box>
  )
}
```

Key changes from original:
- Added `GRADIENT_COLORS` array (7 hex strings, cyan to blue)
- Added `getLetterIndex()` using `logo.letterStarts` boundaries for variable-width letter mapping
- `renderLine` accepts optional `gradient: RGBA[]` parameter
- When gradient is provided, renders character-by-character with per-letter colors
- Shadow colors computed per-letter using the gradient color for that letter
- `gradientRGBA()` memo returns gradient only when active theme is "cobuilder"
- Non-cobuilder themes get `undefined` gradient, falling through to flat `theme.text`

- [ ] **Step 2: Commit**

```bash
git add packages/opencode/src/cli/cmd/tui/component/logo.tsx
git commit -m "feat: add cyan-to-blue gradient on BUILDER logo text"
```

---

### Task 5: Build Verification

- [ ] **Step 1: Run TypeScript type check**

```bash
cd packages/opencode && bunx tsc --noEmit
```

Expected: No type errors

- [ ] **Step 2: Run the TUI to visually verify**

```bash
cd packages/opencode && bun run dev
```

Verify:
1. Logo shows "CO BUILDER" (not "OPEN CODE")
2. Right side ("BUILDER") has cyan-to-blue gradient coloring
3. Left side ("CO") is muted
4. Shadow markers render correctly (3D depth effect)
5. Theme is "cobuilder" by default (deep navy background `#0B1120`)
6. Switching to another theme (e.g., "tokyonight") removes the gradient -- right side uses flat text color

- [ ] **Step 3: Final commit with all changes**

If any fixups were needed during verification:

```bash
git add -A
git commit -m "fix: adjustments from visual verification"
```
