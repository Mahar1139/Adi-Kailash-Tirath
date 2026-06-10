import fs from "fs";
import https from "https";
import http from "http";
import path from "path";

const siteData = JSON.parse(fs.readFileSync("site-data.json", "utf-8"));

async function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { timeout: 3000 }, (res) => {
      resolve(res.statusCode);
    }).on("error", (e) => {
      resolve("Error: " + e.message);
    }).on("timeout", () => {
      req.destroy();
      resolve("Timeout");
    });
  });
}

async function run() {
  for (const pkg of siteData.packages) {
    if (pkg.imageUrl) {
      console.log(`Package ${pkg.id}: ${pkg.imageUrl}`);
      const status = await checkUrl(pkg.imageUrl);
      console.log(`Status: ${status}`);
    }
  }
}

run();
