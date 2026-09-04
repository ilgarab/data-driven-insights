import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoForRoute } from "@/seo/config";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Reusable SEO component: keeps title / description / canonical / OG / Twitter
 * tags in sync with the current route during client-side navigation.
 * The same source of truth (src/seo/config.ts) feeds the static prerender,
 * so the tags are already present in the initial HTML.
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoForRoute(pathname);
    if (!seo) return;

    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", seo.canonical);
    setMeta("property", "og:type", seo.ogType);
    setMeta("property", "og:image", seo.ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", seo.ogImageAlt);
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", seo.ogImage);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = seo.canonical;
  }, [pathname]);

  return null;
}
