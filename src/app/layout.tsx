import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "प्रतिअयोध्या श्री क्षेत्र राममाळ — सद्गुरु यशवंत बाबा तपोभूमी, उंचखडक (बु।।)",
  description:
    "सत्ययुगातील श्रीराम पदस्पर्श, अगस्ती बंधू महामती मुनींचा आश्रम, शापमुक्तीची ऐतिहासिक महाघंटा आणि सद्गुरु यशवंत बाबांची जागृत तपोभूमी — दर्शन व आरती माहिती.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={`${cinzel.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans bg-parchment text-maroon-950 selection:bg-saffron-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
