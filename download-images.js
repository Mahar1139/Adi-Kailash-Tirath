import fs from "fs";
import https from "https";
import http from "http";
import path from "path";

const siteData = JSON.parse(fs.readFileSync("site-data.json", "utf-8"));
const imagesDir = path.join(process.cwd(), "public", "images");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, (response) => {
      if (response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) {
        if (response.statusCode > 300 && response.headers.location) {
            download(response.headers.location, dest).then(resolve).catch(reject);
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        fs.unlink(dest, () => reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err.message));
    });
  });
}

async function run() {
  for (let i = 0; i < siteData.packages.length; i++) {
    const pkg = siteData.packages[i];
    if (pkg.imageUrl && pkg.imageUrl.startsWith("http")) {
      const extMatch = pkg.imageUrl.match(/\\.(jpg|jpeg|png|webp)/i);
      const ext = extMatch ? extMatch[0] : ".jpg";
      const filename = `pkg-${pkg.id}${ext}`;
      const destPath = path.join(imagesDir, filename);
      
      console.log(`Downloading ${pkg.imageUrl} to ${filename}`);
      try {
        await download(pkg.imageUrl, destPath);
        pkg.imageUrl = `/images/${filename}`;
      } catch (err) {
        console.error(`Failed to download ${pkg.imageUrl}:`, err);
      }
    }
  }
  
  // Let's also do circularDestinations
  for (let i = 0; i < siteData.circularDestinations.length; i++) {
    const dest = siteData.circularDestinations[i];
    if (dest.img && dest.img.startsWith("http")) {
      const extMatch = dest.img.match(/\\.(jpg|jpeg|png|webp)/i);
      const ext = extMatch ? extMatch[0] : ".jpg";
      const filename = `dest-${i}${ext}`;
      const destPath = path.join(imagesDir, filename);
      
      console.log(`Downloading ${dest.img} to ${filename}`);
      try {
        await download(dest.img, destPath);
        dest.img = `/images/${filename}`;
      } catch (err) {
        console.error(`Failed to download ${dest.img}:`, err);
      }
    }
  }

  // Let's also do hero slides
  for (let i = 0; i < siteData.heroSlides.length; i++) {
    const slide = siteData.heroSlides[i];
    if (slide.img && slide.img.startsWith("http")) {
      const extMatch = slide.img.match(/\\.(jpg|jpeg|png|webp)/i);
      const ext = extMatch ? extMatch[0] : ".jpg";
      const filename = `hero-${i}${ext}`;
      const destPath = path.join(imagesDir, filename);
      
      console.log(`Downloading ${slide.img} to ${filename}`);
      try {
        await download(slide.img, destPath);
        slide.img = `/images/${filename}`;
      } catch (err) {
        console.error(`Failed to download ${slide.img}:`, err);
      }
    }
  }

  fs.writeFileSync("site-data.json", JSON.stringify(siteData, null, 2));
  console.log("Done updating site-data.json");
}

run();
