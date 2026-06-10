import fs from "fs";

const siteDataStr = fs.readFileSync("site-data.json", "utf-8");
const tsContent = `export const DEFAULT_SITE_DATA = ${siteDataStr};\n`;
fs.writeFileSync("src/defaultSiteData.ts", tsContent);
