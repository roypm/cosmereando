import { describe, expect, it } from "vitest";
import { getTranslation, locales } from "./i18n";

describe("translations", () => {
  it("contains the shared navigation labels in every locale", () => {
    locales.forEach((locale) => {
      expect(getTranslation(locale, "common.home")).toBeTruthy();
      expect(
        getTranslation(locale, "navigation.magicSystems.title"),
      ).toBeTruthy();
      expect(getTranslation(locale, "creditsPage.heading")).toBeTruthy();
    });
  });
});
