import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Top-Up SIP Calculator | Estimate Future Value of Growing SIPs",
  description:
    "Calculate the future value of your Systematic Investment Plan (SIP) with annual top-up contributions. Visualize portfolio growth, returns, and track progress against your financial goal.",
  keywords: [
    "SIP calculator",
    "Top-Up SIP",
    "systematic investment plan",
    "mutual fund calculator",
    "investment calculator",
    "future value calculator",
  ],
  openGraph: {
    title: "Top-Up SIP Calculator",
    description: "Estimate future value of increasing SIP investments with interactive charts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
