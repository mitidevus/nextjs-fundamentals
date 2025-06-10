import { Geist, Geist_Mono } from "next/font/google";
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
      <head>
        <script src="/js/modernizr.js" defer></script>
        <script src="/js/pace.min.js" defer></script>

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body id="top">
        {children}

        <script src="/js/jquery-2.1.3.min.js" defer></script>
        <script src="/js/plugins.js" defer></script>
        <script src="/js/main.js" defer></script>
      </body>
    </html>
  );
}
