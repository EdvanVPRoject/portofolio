import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edvan Nuriana — Sistem Komputer",
  description: "Portofolio Edvan Nuriana Putra Septia, lulusan Sistem Komputer dengan pengalaman proyek di bidang pemrograman, computer vision, IoT, dan aplikasi web.",
  keywords: ["Edvan Nuriana", "Sistem Komputer", "Portofolio", "Computer Vision", "IoT", "Next.js", "WebRTC", "YOLOv8"],
  authors: [{ name: "Edvan Nuriana Putra Septia" }],
  openGraph: {
    title: "Edvan Nuriana — Sistem Komputer",
    description: "Portofolio Edvan Nuriana Putra Septia, lulusan Sistem Komputer UNIKOM.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('portfolio-theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#faf9f6] text-neutral-900 dark:bg-[#0c0c0e] dark:text-neutral-100 min-h-screen selection:bg-blue-600 selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
