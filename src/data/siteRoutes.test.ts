import { describe, expect, it } from "vitest";
import { getEntryPath, getSectionPath } from "./siteRoutes";

describe("site routes", () => {
  it("builds localized section and entry paths", () => {
    expect(getSectionPath("es", "magic-systems")).toBe("/es/magic-systems");
    expect(getEntryPath("ca", "planets", "roshar")).toBe("/ca/planets/roshar");
  });
});
