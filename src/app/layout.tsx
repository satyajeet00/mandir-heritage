import type { Metadata } from "next";
import {
  Noto_Serif,
  Plus_Jakarta_Sans,
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/data/site";
import mandirContent from "@/data/mandirContent.json";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const notoSansDeva = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-deva",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

const notoSerifDeva = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-deva",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

const TITLE =
  "प्रतिअयोध्या श्री क्षेत्र राममाळ — सद्‌गुरू यशवंत बाबा तपोभूमी, उंचखडक (बु।।)";
const DESCRIPTION =
  "सत्ययुगातील श्रीराम पदस्पर्श, अगस्ती बंधू महामती मुनींचा आश्रम, शापमुक्तीची ऐतिहासिक महाघंटा आणि सद्‌गुरू यशवंत बाबांची जागृत तपोभूमी — दर्शन व आरती माहिती.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "राममाळ", "Ram-mal", "Unchakhadak", "उंचखडक", "यशवंत बाबा", "Yashwant Baba",
    "प्रतिअयोध्या", "Pratiayodhya", "श्रीराम पादुका", "Sangamner", "Ahilyanagar temple",
  ],
  openGraph: {
    type: "website",
    locale: "mr_IN",
    alternateLocale: ["en_IN"],
    title: TITLE,
    description: DESCRIPTION,
    siteName: "प्रतिअयोध्या श्री क्षेत्र राममाळ",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HinduTemple",
  name: mandirContent.temple.name.en,
  alternateName: mandirContent.temple.name.mr,
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  // omit while the phone is still the all-zero dummy number
  ...(/[1-9]/.test(mandirContent.temple.phone.replace(/^\+91/, ""))
    ? { telephone: mandirContent.temple.phone }
    : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unchakhadak (Bk.), Pravara river bank",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  hasMap: mandirContent.temple.googleMapsUrl,
  isAccessibleForFree: true,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
    ],
    opens: "05:00",
    closes: "21:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={`${notoSerif.variable} ${plusJakarta.variable} ${notoSansDeva.variable} ${notoSerifDeva.variable} scroll-smooth`}>
      <body className="min-h-screen font-sans bg-parchment text-maroon-950 selection:bg-saffron-500 selection:text-white">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
