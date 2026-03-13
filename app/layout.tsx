import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { Navbar } from "@/components/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VibeCheck — NLP Mental Health Sentiment Classifier",
  description: "An AI-powered platform for students to detect emotional states and access crisis support resources through a dynamic, responsive UI.",
  keywords: ["mental health", "NLP", "sentiment classifier", "student support", "emotion detection", "VibeCheck"],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} dark`} suppressHydrationWarning>
      <body>
        <ThemeWrapper>
          <Navbar />
          <main className="pt-16">{children}</main>
        </ThemeWrapper>
      </body>
    </html>
  );
}
