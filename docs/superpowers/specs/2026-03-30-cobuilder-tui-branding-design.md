# CoBuilder TUI Branding - Design Spec

**Date:** 2026-03-30
**Scope:** Signature theme + logo rebrand (P0 UX overhaul)
**Approach:** Direct rewrite (Approach A) -- 4 files touched

---

## 1. Logo Data (`packages/opencode/src/cli/logo.ts`)

Rewrite block-letter art from "OPEN CODE" to "CO BUILDER":

- **Left side (muted):** "CO" -- 2 uppercase letters, ~10 chars wide
- **Right side (bold + gradient):** "BUILDER" -- 7 uppercase letters, ~34 chars wide
- 4 lines tall (same height as current)
- Uses same `█▀▄▐▌` block character vocabulary
- Shadow markers `_^~` placed identically to current style for 3D depth
- `marks` export unchanged (`"_^~"`)

## 2. Logo Gradient (`packages/opencode/src/cli/cmd/tui/component/logo.tsx`)

Apply cyan-to-blue gradient on the right side ("BUILDER"):

- **Gradient palette:** 7 colors interpolated from `#22D3EE` (cyan) to `#3B82F6` (blue)
  - B: `#22D3EE`, U: `#27C4EB`, I: `#2CB5E8`, L: `#31A6E5`, D: `#3697E2`, E: `#3B88DF`, R: `#3B82F6`
- **Left side ("CO"):** Flat `theme.textMuted` -- no gradient, same as current
- **Right side ("BUILDER"):** Per-letter `fg` color from gradient palette
- **Shadow colors:** Computed via existing `tint(theme.background, letterColor, 0.25)`
- **Implementation:** `renderLine` receives a `colorIndex` parameter. Character positions in right-side lines map to letter index (B=0, U=1, ..., R=6) to pick gradient color.
- **Fallback:** When theme is not "cobuilder", right side uses flat `theme.text` (gradient only for CoBuilder theme)

## 3. Signature Theme (`packages/opencode/src/cli/cmd/tui/context/theme/cobuilder.json`)

New JSON theme file following existing schema:

### Dark Palette
```
background:        #0B1120  (deep navy)
backgroundPanel:   #111827
backgroundElement: #1A2332
border:            #1E3A5F
borderActive:      #2D5A8E
borderSubtle:      #162D4A
text:              #E2E8F0
textMuted:         #64748B
primary:           #22D3EE  (cyan)
secondary:         #A78BFA  (purple)
accent:            #22D3EE  (cyan)
success:           #34D399
error:             #F87171
warning:           #FBBF24
info:              #60A5FA
```

### Light Palette
```
background:        #F8FAFC
backgroundPanel:   #F1F5F9
backgroundElement: #E2E8F0
border:            #94A3B8
borderActive:      #64748B
borderSubtle:      #CBD5E1
text:              #0F172A
textMuted:         #64748B
primary:           #0891B2  (dark cyan)
secondary:         #7C3AED  (dark purple)
accent:            #0891B2
success:           #059669
error:             #DC2626
warning:           #D97706
info:              #2563EB
```

### Syntax Highlighting (Dark)
```
syntaxKeyword:     #22D3EE  (cyan -- matches accent)
syntaxFunction:    #60A5FA  (blue)
syntaxString:      #34D399  (green)
syntaxNumber:      #FBBF24  (amber)
syntaxType:        #A78BFA  (purple)
syntaxComment:     #475569  (slate)
syntaxVariable:    #E2E8F0  (text)
syntaxOperator:    #94A3B8  (muted)
```

### Diff Colors (Dark)
Tinted against `#0B1120` using existing `tint()` at 0.22 alpha:
```
diffAdded:             #34D399
diffRemoved:           #F87171
diffContext:           #64748B
diffHunkHeader:        #64748B
diffHighlightAdded:    #6EE7B7
diffHighlightRemoved:  #FCA5A5
diffAddedBg:           tint(#0B1120, #34D399, 0.22)
diffRemovedBg:         tint(#0B1120, #F87171, 0.22)
diffContextBg:         #111827
diffLineNumber:        #1A2332
diffAddedLineNumberBg: tint(#1A2332, #34D399, 0.22)
diffRemovedLineNumberBg: tint(#1A2332, #F87171, 0.22)
```

### Markdown Colors
Follow text/accent/muted pattern:
```
markdownText:       text
markdownHeading:    primary
markdownLink:       accent
markdownCode:       secondary
markdownCodeBlock:  backgroundElement
markdownBlockquote: textMuted
```

## 4. Default Theme (`packages/opencode/src/cli/cmd/tui/context/theme.tsx`)

- Import `cobuilder.json` and add to `DEFAULT_THEMES` record as `cobuilder`
- Change default theme fallback from `"opencode"` to `"cobuilder"`
- Existing users with persisted theme selection are unaffected

---

## Files Modified

| File | Change |
|------|--------|
| `packages/opencode/src/cli/logo.ts` | Rewrite logo art: "OPEN CODE" -> "CO BUILDER" |
| `packages/opencode/src/cli/cmd/tui/component/logo.tsx` | Add per-letter gradient coloring for right side |
| `packages/opencode/src/cli/cmd/tui/context/theme/cobuilder.json` | New signature theme file |
| `packages/opencode/src/cli/cmd/tui/context/theme.tsx` | Import + register theme, change default |

## Not In Scope

- Rounded box-drawing corners (deferred -- depends on OpenTUI core)
- Animated logo reveal (P2)
- Smart prompt placeholders (P2)
- Session screen layout changes (P1)
