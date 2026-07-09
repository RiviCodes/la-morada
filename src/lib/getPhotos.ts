import fs from "node:fs";
import path from "node:path";

const VALID_EXT = /\.(jpe?g|png|webp)$/i;

export interface Photo {
  src: string;
  alt: string;
}

export function getPhotos(publicSubpath: string): Photo[] {
  const dir = path.join(process.cwd(), "public", publicSubpath);

  try {
    return fs
      .readdirSync(dir)
      .filter((f) => VALID_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => ({
        src: `/${publicSubpath}/${f}`,
        alt: f.replace(VALID_EXT, "").replace(/[-_]+/g, " "),
      }));
  } catch {
    return [];
  }
}
