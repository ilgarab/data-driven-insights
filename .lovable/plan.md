# SEO problemləri və həll planı

Skan nəticələri (agent_content, agent_metadata, http, gsc) əsasında 7 problem müəyyən edilib. Aşağıda hər biri və tətbiq ediləcək həll var.

## 1. Hər səhifə eyni başlıq və təsvirdən istifadə edir (orta prioritet)
Hazırda `index.html`-dəki tək title/description bütün route-lara aiddir. Google /services, /about, /blog, /contact səhifələrini fərqləndirə bilmir.

Həll: `react-helmet-async` quraşdırılsın, `main.tsx`-ə provider əlavə edilsin, hər səhifəyə öz title/description/canonical verilsin. Mətnlər i18n-dən gəlsin ki, AZ/EN/RU üçün düzgün olsun.

- `/` - Metric Analytics - Datalar danışır
- `/services` - Xidmətlər | Metric Analytics
- `/about` - Haqqımızda | Metric Analytics
- `/blog` - Bloq | Metric Analytics
- `/blog/:id` - hər yazının öz başlığı və excerpt-i
- `/contact` - Əlaqə | Metric Analytics

## 2. Sosial preview-lər bütün səhifələrdə eynidir (aşağı prioritet)
Həll: hər route üçün `og:title`, `og:description` və self-referencing `og:url` Helmet vasitəsilə verilsin. Bloq yazılarında `og:type` "article" olsun və yazının şəkli `og:image` kimi istifadə edilsin. `index.html`-dəki ümumi og teqləri fallback kimi qalsın.

## 3. Alt səhifələrdə H1 başlıq yoxdur (orta prioritet)
Services, Blog, About və Contact səhifələrində `SectionHeader` h1 yox, kiçik başlıq render edir.

Həll: `SectionHeader`-ə `as="h1"` seçimi əlavə edilsin və hər səhifənin əsas başlığı tək h1 kimi render olunsun. Vizual görünüş dəyişməyəcək.

## 4. Əlçatanlıq (accessibility) çatışmazlıqları (orta prioritet)
- Mobil menyu düyməsində `aria-label` yoxdur.
- Əlaqə formasındakı sahələrin `id` və `htmlFor` bağlantısı yoxdur.

Həll: `Navbar.tsx`-də menyu düyməsinə aria-label, `Contact.tsx`-də hər input/textarea-ya unikal id və label-lərə htmlFor əlavə edilsin.

## 5. Bloq yazılarında Article strukturlu məlumatı yoxdur (aşağı prioritet)
Həll: `BlogPost.tsx`-ə Article JSON-LD (headline, author, datePublished, image) və BreadcrumbList əlavə edilsin. `index.html`-ə Organization + WebSite JSON-LD əlavə edilsin.

## 6. sitemap.xml yoxdur
Həll: `scripts/generate-sitemap.ts` yaradılsın, `predev`/`prebuild` skriptləri ilə bağlansın. Statik route-lar (/, /services, /blog, /about, /contact) və hər bloq yazısı (/blog/:id) daxil edilsin. `robots.txt`-ə `Sitemap:` direktivi əlavə edilsin.

## 7. Əlaqə forması lead çatdırmır (aşağı prioritet, biznes təsiri yüksək)
Forma göndərişi simulyasiya edilir - mesaj heç yerə getmir. Bu SEO problemi deyil, amma trafikin müştəriyə çevrilməsinə mane olur.

Həll variantı seçim tələb edir - aşağıya baxın.

## Əhatə dışı
Google Search Console qoşulması ayrı bir addımdır (icazə tələb edir). SEO düzəlişləri tamamlandıqdan sonra ayrıca təklif ediləcək.

## Texniki qeydlər
- Bu layihə statik Vite SPA-dır: Helmet metadata-nı brauzerdə yeniləyir. Googlebot JS icra etdiyi üçün bunu görür, lakin sosial şəbəkə crawler-ləri (LinkedIn, Facebook) yalnız statik `index.html`-i oxuyur. Səhifə-səhifə dəqiq sosial preview üçün SSR lazımdır - [TanStack Start-a keçidin nə verdiyi burada](https://lovable.dev/blog/building-apps-using-tanstack-start).
- Yeni asılılıq: `react-helmet-async`.
- Toxunulacaq fayllar: `index.html`, `src/main.tsx`, `src/pages/*.tsx`, `src/components/SectionHeader.tsx`, `src/components/Navbar.tsx`, `public/robots.txt`, `scripts/generate-sitemap.ts`, `package.json`, i18n locale faylları.
