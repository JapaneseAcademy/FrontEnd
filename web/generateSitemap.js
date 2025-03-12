const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

// 기본 사이트 URL
const BASE_URL = "https://www.yeri-jp.com";

// 사이트맵에 포함할 페이지 목록 (필요에 따라 수정)
const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "weekly", priority: 0.8 },
  { url: "/review", changefreq: "weekly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.6 },
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  pages.forEach((page) => {
    sitemap.write(page);
  });

  sitemap.end();
  const sitemapXML = await streamToPromise(sitemap);

  // 프로젝트의 public 폴더에 sitemap.xml 저장
  const sitemapPath = path.resolve(__dirname, "public", "sitemap.xml");
  require("fs").writeFileSync(sitemapPath, sitemapXML);

  console.log("✅ Sitemap 생성 완료: ", sitemapPath);
}

generateSitemap();
