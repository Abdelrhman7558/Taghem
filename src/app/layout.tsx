import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "خيمة قعدة زمان | حجز رمضان",
  description: "أجواء رمضانية ساحرة .. في قلب التاريخ — احجز إفطارك أو سحورك الآن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-cairo antialiased">{children}</body>
    </html>
  );
}
