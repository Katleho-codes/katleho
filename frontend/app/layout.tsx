import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";


const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: 'Katleho Mabala',
  description: 'The personal portfolio for the software developer Katleho Mabala',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetBrainsMono.variable} ${inter.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">{children}<Toaster /></body>

    </html>
  );
}
