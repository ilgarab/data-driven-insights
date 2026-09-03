import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";
import { blogPosts } from "./data/mockData";
import "./i18n";

export function render(url: string) {
  return renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
}

export { blogPosts };

export const staticRoutes = ["/", "/services", "/data-analitikasi", "/hesabat-sistemi", "/about", "/blog", "/contact"];
export const blogRoutes = blogPosts.map((post) => `/blog/${post.id}`);
