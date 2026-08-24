import { describe, expect, it } from "vitest";
import worksData from "./works.json";
import {
  getBookCount,
  getIndependentWorks,
  getMagicSystems,
  getNavigationGroups,
  validateProjectData,
} from "./catalogue";

describe("catalogue data", () => {
  it("counts works without stories contained in Arcanum Unbounded", () => {
    const expectedCount = worksData.filter(
      (work) => !work.collectionIds?.includes("arcanum-unbounded"),
    ).length;

    expect(getBookCount()).toBe(expectedCount);
  });

  it("returns only standalone works in the independent catalogue", () => {
    const works = getIndependentWorks("es");

    expect(works.length).toBeGreaterThan(0);
    expect(works.some((work) => work.id === "arcanum-unbounded")).toBe(true);
    expect(works.some((work) => work.id === "the-eleventh-metal")).toBe(false);
    expect(works.some((work) => work.id === "mistborn-secret-history")).toBe(
      false,
    );
  });

  it("builds localized detail links for magic systems", () => {
    const magicGroup = getNavigationGroups("es").find(
      (group) => group.id === "magic-systems",
    );

    expect(magicGroup).toBeDefined();
    expect(magicGroup?.items.length).toBe(getMagicSystems("es").length);
    expect(
      magicGroup?.items.every(
        (item) =>
          item.href.includes("/es/magic-systems/") && !item.href.includes("#"),
      ),
    ).toBe(true);
  });

  it("passes the complete project data validation", () => {
    expect(() => validateProjectData()).not.toThrow();
  });
});
