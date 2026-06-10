import fs from "fs";
import path from "path";

const siteData = JSON.parse(fs.readFileSync("site-data.json", "utf-8"));

// For packages
for (let i = 0; i < siteData.packages.length; i++) {
  const pkg = siteData.packages[i];
  if (pkg.imageUrl && pkg.imageUrl.startsWith("http")) {
    const extMatch = pkg.imageUrl.match(/\\.(jpg|jpeg|png|webp)/i);
    const ext = extMatch ? extMatch[0] : ".jpg";
    const filename = `pkg-${pkg.id}${ext}`;
    if (fs.existsSync(path.join("public", "images", filename))) {
      pkg.imageUrl = `/images/${filename}`;
    }
  }
}

// For circularDestinations
for (let i = 0; i < siteData.circularDestinations.length; i++) {
  const dest = siteData.circularDestinations[i];
  if (dest.img && dest.img.startsWith("http")) {
    const extMatch = dest.img.match(/\\.(jpg|jpeg|png|webp)/i);
    const ext = extMatch ? extMatch[0] : ".jpg";
    const filename = `dest-${i}${ext}`;
    if (fs.existsSync(path.join("public", "images", filename))) {
      dest.img = `/images/${filename}`;
    }
  }
}

// For hero slides
for (let i = 0; i < siteData.heroSlides.length; i++) {
  const slide = siteData.heroSlides[i];
  if (slide.img && slide.img.startsWith("http")) {
    const extMatch = slide.img.match(/\\.(jpg|jpeg|png|webp)/i);
    const ext = extMatch ? extMatch[0] : ".jpg";
    const filename = `hero-${i}${ext}`;
    if (fs.existsSync(path.join("public", "images", filename))) {
      slide.img = `/images/${filename}`;
    }
  }
}

fs.writeFileSync("site-data.json", JSON.stringify(siteData, null, 2));
console.log("Updated site-data.json");
