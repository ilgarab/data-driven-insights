SEO audit və təkmilləşdirmə planı

1. Mövcud SEO vəziyyətini diaqnostika edin
   - Lovable SEO skanerini işə salaraq saytdakı cari problemləri siyahılayın (title, description, canonical, og:*, sitemap, robots.txt, JSON-LD, sürət, mobil uyğunluq).
   - Skan nəticələrini prioritetlərə görə qruplaşdırın: kritik (indeksləməni bloklayan), orta (meta/URL), təkmilləşdirici (məzmun/structured data).

2. Head metadata və sosial preview-ləri yeniləyin
   - index.html-də template `Lovable App` title və `Lovable Generated Project` description real brand metadata ilə əvəz edilsin.
   - Azərbaycan, ingilis və rus dilləri üçün uyğun `<title>` və `<meta name="description">` tərtib edilsin.
   - Open Graph (`og:title`, `og:description`, `og:type`, `og:url`) və Twitter Card teqləri əlavə edilsin.
   - `<link rel="canonical" href="https://metric-insights-forge.lovable.app/...">` düzgün self-referencing URL-lərlə yenilənsin.

3. robots.txt və sitemap.xml qurun / yeniləyin
   - `public/robots.txt` yoxlanılsın; `Disallow: /` varsa düzəldilsin, `Sitemap:` direktivi əlavə edilsin.
   - `public/sitemap.xml` hazırlansın: əsas route-lar (/, /about, /services, /blog, /contact) üçün `<url>` girişləri olsun.

4. Structured data (JSON-LD) əlavə edin
   - index.html-də `Organization` və `WebSite` schema obyektləri əlavə edilsin.
   - Blog yazıları varsa `Article` və `BreadcrumbList` schema-ları nəzərdən keçirilsin.
   - Xidmət səhifələri üçün `Service` və ya `ItemList` schema təklifləri hazırlansın.

5. Məzmun və açar söz təklifləri
   - Metric Analytics üçün biznes analitika, BI dashboard, data əsaslı qərar, fraud detection, AI analitika mövzularında axtarış niyyətini qarşılayan məzmun boşluqları müəyyən edilsin.
   - Hər dil üçün (AZ/EN/RU) səhifə başlıqları, H1/H2 strukturu və meta təsvirlər tərtib edilsin.

6. Təkrar yoxlama
   - Bütün düzəlişlərdən sonra SEO skaneri yenidən işə salınsın və tapılan problemlərin aradan qaldırıldığı təsdiqlənsin.
