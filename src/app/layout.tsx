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
  title: "श्री प्राचीन मंदिर — इतिहास, स्थापत्य वारसा आणि दर्शन माहिती",
  description: "स्थानिक प्राचीन मंदिर देवस्थान, १२वे-१३वे शतक यादवकालीन हेमाडपंती स्थापत्य, स्थळ पुराण, आरती संग्रह आणि नित्य दर्शन वेळापत्रक.",
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
