"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ModalProvider } from "./providers/ModalsProvider";
import { Toaster } from "sonner";
import { ReduxProvider } from "./providers/ReduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <Toaster />
          <ModalProvider />
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
