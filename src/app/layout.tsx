import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { ClientLayout } from "@/components/client-layout";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RupeeBee",
  description: "Learn, save & stay safe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        {/* <ClientLayout> */}
        <Header /> {children} <Footer />
        {/* </ClientLayout> */}
      </body>
    </html>
  );
}
