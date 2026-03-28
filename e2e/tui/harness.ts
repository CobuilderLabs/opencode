/**
 * TUI E2E Harness — spawns the cobuilder binary in a pty via `script` wrapper.
 *
 * Bun's event loop does not fire libuv-based callbacks from native node-pty addons,
 * so onData never triggers under `bun test`. Instead we use `script -q -c <cmd> /dev/null`
 * which allocates a real pty and pipes output back over regular stdio — fully compatible
 * with Bun.spawn's async iterators.
 */
import { join } from "path"

const BINARY = join(
  import.meta.dir,
  "../../packages/opencode/dist/opencode-linux-x64/bin/cobuilder",
)

export const STRIP_ANSI = /\x1b\[[0-9;?]*[A-Za-z]|\x1b\([A-Za-z]|\x1b[=>]|\x1b\][\s\S]*?\x07/g

export function stripAnsi(str: string): string {
  return str.replace(STRIP_ANSI, "")
}

/** Collapse all whitespace (including \r\n between pty-rendered characters) into single spaces. */
export function normalizeText(str: string): string {
  return stripAnsi(str).replace(/\s+/g, " ").trim()
}

/**
 * Remove ALL whitespace from stripped output so that character-by-character
 * pty rendering (`W\nh\ni\nc\nh`) becomes a searchable string (`Which`).
 */
export function collapseText(str: string): string {
  return stripAnsi(str).replace(/\s/g, "")
}

export interface TuiSession {
  /** All output collected since spawn (raw). */
  output: string[]
  /** Write a string (keystrokes) to the pty stdin. */
  write(data: string): void
  /** Wait until stripped output matches predicate or timeout. */
  waitFor(predicate: (text: string) => boolean, timeoutMs?: number): Promise<string>
  /** Kill the process and clean up. */
  kill(): Promise<void>
}

export interface SpawnOptions {
  /** Additional args to pass to the binary. */
  args?: string[]
  /** Working directory for the spawned process. */
  cwd?: string
  /** Environment overrides. */
  env?: Record<string, string>
}

/**
 * Spawn the cobuilder binary inside a pty via `script -q -c` and return a TuiSession.
 *
 * `script` allocates a real pty, runs the command inside it, and streams all pty output
 * to its own stdout — which Bun.spawn reads normally via async iteration.
 */
export async function spawnTui(options: SpawnOptions = {}): Promise<TuiSession> {
  const { args = [], cwd = "/tmp", env = {} } = options

  // Shell-quote each argument so `script -c` receives the full command string safely.
  const quotedArgs = args.map((a) => a.replace(/'/g, "'\\''"))
  const cmd = ["'" + BINARY + "'", ...quotedArgs.map((a) => `'${a}'`)].join(" ")

  const output: string[] = []
  const decoder = new TextDecoder()

  const proc = Bun.spawn(["script", "-q", "-c", cmd, "/dev/null"], {
    cwd,
    env: {
      ...process.env,
      OPENCODE_TEST: "1",
      TERM: "xterm-256color",
      ...env,
    },
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  })

  // Drain stdout asynchronously so output[] fills as the process runs.
  ;(async () => {
    for await (const chunk of proc.stdout) {
      output.push(decoder.decode(chunk))
    }
  })()

  const session: TuiSession = {
    output,

    write(data: string) {
      proc.stdin.write(data)
      proc.stdin.flush()
    },

    async waitFor(predicate, timeoutMs = 5000): Promise<string> {
      const start = Date.now()
      return new Promise((resolve, reject) => {
        const check = () => {
          const combined = stripAnsi(output.join(""))
          if (predicate(combined)) {
            resolve(combined)
            return
          }
          if (Date.now() - start > timeoutMs) {
            reject(
              new Error(
                `waitFor timed out after ${timeoutMs}ms.\nLast output:\n${combined.slice(-500)}`,
              ),
            )
            return
          }
          setTimeout(check, 50)
        }
        check()
      })
    },

    async kill(): Promise<void> {
      try {
        proc.kill()
      } catch {
        // already exited
      }
      await proc.exited
    },
  }

  return session
}

/** Send Ctrl-C to the pty. */
export const CTRL_C = "\x03"
/** Send Ctrl-D to the pty. */
export const CTRL_D = "\x04"
/** Enter key. */
export const ENTER = "\r"
/** Arrow down. */
export const ARROW_DOWN = "\x1b[B"
/** Arrow up. */
export const ARROW_UP = "\x1b[A"
/** 'q' key — quit prompt used by some TUI views. */
export const QUIT = "q"
