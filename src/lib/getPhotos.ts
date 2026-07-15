import type { ImageMetadata } from "astro";

const galleryImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const glampImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/glamps/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export interface Photo {
  image: ImageMetadata;
  alt: string;
}

function filenameFromPath(fullPath: string): string {
  return fullPath.split("/").pop() ?? fullPath;
}

function toAlt(filename: string): string {
  return filename.replace(/\.(jpe?g|png|webp)$/i, "").replace(/[-_]+/g, " ");
}

export function getGalleryPhotos(): Photo[] {
  return Object.entries(galleryImages)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, mod]) => ({
      image: mod.default,
      alt: toAlt(filenameFromPath(path)),
    }));
}

export function getGlampPhotos(slug: string): Photo[] {
  const prefix = `/src/assets/glamps/${slug}/`;

  return Object.entries(glampImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, mod]) => ({
      image: mod.default,
      alt: toAlt(filenameFromPath(path)),
    }));
}
