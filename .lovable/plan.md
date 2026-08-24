# Komandamız hissəsində Yalçın Talıbovun şəklini yenilə

## Mövcud vəziyyət
Yalçın Talıbov artıq komanda siyahısında CTO olaraq var və `src/assets/yalcin.jpg` şəkli ilə göstərilir. İstifadəçi indi yeni bir şəkil (WhatsApp_Image_2026-07-13_at_14.48.50-2.jpeg) əlavə edib və bunun Yalçın Talıbovun düzgün komanda fotoşəkli olmasını istəyir.

## Plan
1. Yeni yüklənmiş şəkli profil fotoşəklinə uyğun kəsin (headshot crop) - baş və çiyinlər mərkəzdə olacaq şəkildə kvadrat formata gətirilsin.
2. Kəsilmiş şəkli `lovable-assets` ilə CDN-ə yükləyin və mövcud `src/assets/yalcin.jpg.asset.json` pointer-ni yeniləyin (və ya yeni pointer yaradın).
3. `src/pages/About.tsx`-dəki `yalcinAsset` importu düzgün pointer-i göstərməyə davam etsin - About səhifəsi artıq yalcin şəklini render edir, ona toxunulmasın.
4. Başqa heç bir dəyişiklik edilməyəcək.

## Texniki qeyd
- Yalçın Talıbov `mockData.ts`-də `image: "yalcin"` ilə qeyd olunub, About səhifəsi dairəvi formada `object-cover` ilə göstərir. Yalnız şəkil faylı dəyişəcək.
