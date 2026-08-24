import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import imageCredits from "./image-credits.json";

const getAssetFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? getAssetFiles(path)
      : entry.name === ".gitkeep"
        ? []
        : [entry.name];
  });

describe("image credits", () => {
  it("registers every image asset exactly once", () => {
    const creditedFiles = imageCredits.flatMap((group) =>
      group.items.map((item) => item.file),
    );
    const assetFiles = getAssetFiles(
      join(process.cwd(), "src/assets/images"),
    ).sort();

    expect(new Set(creditedFiles).size).toBe(creditedFiles.length);
    expect(creditedFiles.sort()).toEqual(assetFiles);
  });
});
