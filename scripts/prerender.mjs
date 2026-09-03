/**
 * Static prerender: renders every public route to real HTML at build time so
 * title / description / canonical / JSON-LD / H1 / body copy are present in the
 * initial HTML without JavaScript.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;

const SITE = "https://metric-insights-forge.lovable.app";

const { render, staticRoutes, blogRoutes, blogPosts } = await import(ssrEntry);

const meta = {
  "/": {
    title: "Metric Analytics - Biznes analitikası və BI həlləri",
    description:
      "Metric Analytics biznesinizi data əsaslı idarə etməyə kömək edir: BI dashboard, analitik hesabatlar, smart bildirişlər, AI və fraud həlləri.",
  },
  "/services": {
    title: "Xidmətlərimiz - Metric BI, Alert, AI və Fraud | Metric Analytics",
    description:
      "Metric BI dashboard, Metric Alert smart bildirişlər, Metric AI proqnozlaşdırma və Metric Fraud aşkarlama həlləri ilə biznesinizi gücləndirin.",
  },
  "/data-analitikasi": {
    title: "Data analitikası və biznes analitikası xidmətləri | Metric Analytics",
    description:
      "Bakıda analitika şirkəti: data analitikası, biznes analitikası, BI dashboard, hesabatların yaradılması, AI proqnoz və fraud aşkarlama xidmətləri.",
  },
  "/hesabat-sistemi": {
    title: "Hesabat sisteminin qurulması və reporting avtomatlaşdırılması | Metric",
    description:
      "Hesabatların yaradılması və reporting sisteminin qurulması: data mənbələrinin birləşdirilməsi, BI dashboard, avtomatik hesabat və bildirişlər.",
  },
  "/about": {
    title: "Haqqımızda - Metric Analytics komandası və missiyamız",
    description:
      "Metric Analytics - Bakıda yerləşən data analitika şirkəti. Missiyamız, vizyonumuz, komandamız və 10+ illik təcrübəmiz ilə tanış olun.",
  },
  "/blog": {
    title: "Bloq - Data analitika və BI üzrə məqalələr | Metric Analytics",
    description:
      "Biznes analitikası, BI dashboard, data idarəetməsi və AI mövzularında Metric Analytics ekspertlərinin məqalələri.",
  },
  "/contact": {
    title: "Əlaqə - Metric Analytics ilə əlaqə saxlayın",
    description:
      "Metric Analytics ilə əlaqə: Əcəmi Naxçıvani, Bakı. Demo, konsultasiya və əməkdaşlıq üçün bizə yazın.",
  },
};

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const breadcrumb = (route, name) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana səhifə", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE}${route}` },
  ],
});

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function buildHtml({ route, title, description, appHtml, noindex = false, extraJsonLd = [] }) {
  const canonical = `${SITE}${route === "/" ? "/" : route}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?" \/>/,
    `<meta property="og:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[\s\S]*?" \/>/,
    `<meta property="og:description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[\s\S]*?" \/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[\s\S]*?" \/>/,
    `<meta name="twitter:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[\s\S]*?" \/>/,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  );

  if (noindex) {
    html = html.replace(
      /<meta name="robots" content="[\s\S]*?" \/>/,
      `<meta name="robots" content="noindex, follow" />`,
    );
  }

  const jsonLd = extraJsonLd
    .map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`)
    .join("\n    ");
  if (jsonLd) html = html.replace("</head>", `  ${jsonLd}\n  </head>`);

  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

function write(route, html) {
  const target =
    route === "/" ? path.join(dist, "index.html") : path.join(dist, route.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  return path.relative(dist, target);
}

const service = (name, description, route) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: name,
  areaServed: { "@type": "Country", name: "Azerbaijan" },
  provider: {
    "@type": "Organization",
    name: "Metric Analytics",
    url: `${SITE}/`,
  },
  url: `${SITE}${route}`,
});

const serviceSchema = {
  "/data-analitikasi": service(
    "Data analitikası və biznes analitikası",
    "Data analitikası, biznes analitikası, BI dashboard qurulması, KPI izləmə, AI proqnozlaşdırma və fraud aşkarlama xidmətləri.",
    "/data-analitikasi",
  ),
  "/hesabat-sistemi": service(
    "Hesabat sisteminin qurulması",
    "Reporting sisteminin qurulması, hesabatların yaradılması və avtomatlaşdırılması, data mənbələrinin inteqrasiyası.",
    "/hesabat-sistemi",
  ),
  "/services": service(
    "Metric BI, Alert, AI və Fraud həlləri",
    "Biznes analitikası platforması: BI dashboard, smart bildirişlər, AI proqnoz və fraud aşkarlama.",
    "/services",
  ),
};

const results = [];

for (const route of staticRoutes) {
  const routeMeta = meta[route];
  const appHtml = render(route);
  const extra =
    route === "/"
      ? []
      : [breadcrumb(route, routeMeta.title.split(" - ")[0].split(" | ")[0])];
  if (serviceSchema[route]) extra.push(serviceSchema[route]);
  results.push(write(route, buildHtml({ route, ...routeMeta, appHtml, extraJsonLd: extra })));
}

for (const route of blogRoutes) {
  const id = route.split("/").pop();
  const post = blogPosts.find((p) => p.id === id);
  const title = `${post?.title ?? "Bloq"} | Metric Analytics`;
  const description = (post?.excerpt ?? "Metric Analytics bloqu").slice(0, 155);
  const appHtml = render(route);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title ?? "Bloq",
    description,
    author: { "@type": "Organization", name: post?.author ?? "Metric Analytics" },
    publisher: { "@type": "Organization", name: "Metric Analytics" },
    mainEntityOfPage: `${SITE}${route}`,
  };
  results.push(
    write(route, buildHtml({ route, title, description, appHtml, extraJsonLd: [article, breadcrumb(route, post?.title ?? "Bloq")] })),
  );
}

// Real 404 document for unknown URLs (host serves it with HTTP 404).
const notFoundHtml = buildHtml({
  route: "/404",
  title: "Səhifə tapılmadı (404) | Metric Analytics",
  description: "Axtardığınız səhifə mövcud deyil. Ana səhifəyə qayıdın və ya xidmətlərimizlə tanış olun.",
  appHtml: render("/__not_found__"),
  noindex: true,
});
fs.writeFileSync(path.join(dist, "404.html"), notFoundHtml);
results.push("404.html");

// Sitemap regenerated from the prerendered route list.
const urls = [...staticRoutes, ...blogRoutes]
  .map(
    (route) =>
      `  <url>\n    <loc>${SITE}${route === "/" ? "/" : route}</loc>\n    <changefreq>${route === "/" || route.startsWith("/blog") ? "weekly" : "monthly"}</changefreq>\n    <priority>${route === "/" ? "1.0" : route.startsWith("/blog/") ? "0.6" : "0.8"}</priority>\n  </url>`,
  )
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
results.push("sitemap.xml");

console.log(`Prerendered ${results.length} files:\n- ${results.join("\n- ")}`);
