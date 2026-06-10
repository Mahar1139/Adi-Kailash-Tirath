import fs from "fs";

const siteData = JSON.parse(fs.readFileSync("site-data.json", "utf-8"));

for (let i = 0; i < siteData.heroSlides.length; i++) {
  if (siteData.heroSlides[i].img.includes("shutterstock.com")) {
    siteData.heroSlides[i].img = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200";
  }
}

fs.writeFileSync("site-data.json", JSON.stringify(siteData, null, 2));
