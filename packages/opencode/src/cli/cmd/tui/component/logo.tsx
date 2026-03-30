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
