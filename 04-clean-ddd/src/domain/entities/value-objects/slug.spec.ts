import { expect, test } from "vitest"
import { Slug } from "./slug"

test("it shpuld be able to create a new slug form text", async () => {
  const slug = Slug.createFromText("Example question title")

  expect(slug.value).toEqual("example-question-title")
})