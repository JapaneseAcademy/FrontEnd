import { SitemapStream, streamToPromise } from "sitemap";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// ✅ ES 모듈에서 __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 기본 사이트 URL 설정
const BASE_URL = "https://www.yeri-jp.com";

// ✅ 사이트맵에 포함할 페이지 목록 (필요하면 추가/수정)
const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/reviews", changefreq: "weekly", priority: 0.8 },
  { url: "/courses", changefreq: "weekly", priority: 0.8 },
  { url: "/introduction", changefreq: "monthly", priority: 0.6 },
  { url: "/teachers", changefreq: "monthly", priority: 0.6 },
  { url: "/qna", changefreq: "monthly", priority: 0.4 },
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  pages.forEach((page) => sitemap.write(page));
  sitemap.end();

  const sitemapXML = await streamToPromise(sitemap);

  // ✅ public 폴더에 sitemap.xml 저장
  const sitemapPath = path.resolve(__dirname, "public", "sitemap.xml");
  writeFileSync(sitemapPath, sitemapXML);

  console.log("✅ Sitemap 생성 완료:", sitemapPath);
}

// ✅ 실행
generateSitemap();
