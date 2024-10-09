import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";
import NavBar from "./components/navbar";
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLEvently",
  description: "Build Legendary Events with BLEvently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
