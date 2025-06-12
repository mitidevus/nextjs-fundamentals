import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abstract",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-js">
      <Head>
        <script src="/js/modernizr.js" defer></script>
        <script src="/js/pace.min.js" defer></script>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body id="top">{children}</body>
    </html>
  );
}
