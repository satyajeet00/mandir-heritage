// Generates src/app/opengraph-image.jpg (1200x630) from the hero photo.
// Usage: node scripts/make-og.mjs   (re-run after replacing the hero photo)
import sharp from "sharp";

const SRC = "public/images/drone-shot-pravara.jpg";
const { width } = await sharp(SRC).rotate().metadata(); // .rotate() applies EXIF orientation
await sharp(SRC)
  .rotate()
  .resize(1200, null) // match target width
  .extract({ left: 0, top: 40, width: 1200, height: 630 }) // keep flag + golden kalash
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("src/app/opengraph-image.jpg");
console.log("Wrote src/app/opengraph-image.jpg (source width", width, ")");
