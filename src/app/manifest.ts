import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "प्रतिअयोध्या श्री क्षेत्र राममाळ",
    short_name: "राममाळ",
    description: "सद्‌गुरू यशवंत बाबा तपोभूमी, उंचखडक (बु।।) — दर्शन, आरती व देणगी माहिती",
    start_url: "/",
    display: "standalone",
    background_color: "#FCF8F2",
    theme_color: "#4a0d0d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
