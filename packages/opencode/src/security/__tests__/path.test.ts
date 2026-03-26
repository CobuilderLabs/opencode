import { describe, test, expect } from "bun:test"
import { safePath } from "../path"

describe("Path Traversal Prevention", () => {
  test("allows valid path within base", async () => {
    expect(await safePath("/home/user/project", "src/index.ts")).not.toBeNull()
  })
  test("blocks path traversal", async () => {
    expect(await safePath("/home/user/project", "../../etc/passwd")).toBeNull()
  })
  test("blocks NUL byte injection", async () => {
    expect(await safePath("/home/user/project", "file\x00.ts")).toBeNull()
  })
})
