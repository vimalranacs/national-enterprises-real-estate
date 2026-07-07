import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nationalenterprises.in"),
  title: {
    default: "National Enterprises Real Estate | Lucknow Property Consultant",
    template: "%s | National Enterprises Real Estate",
  },
  description:
    "National Enterprises Real Estate is a trusted Lucknow-based real estate consultancy founded by Manish Rawat. Find residential, commercial, plots, villas, and investment properties across Lucknow with transparent guidance and personalized service.",
  keywords: [
    "Lucknow Real Estate",
    "Property Dealer Lucknow",
    "Plots in Lucknow",
    "Residential Property Lucknow",
    "Commercial Property Lucknow",
    "Buy Property Lucknow",
    "Apartments in Lucknow",
    "Luxury Villas Lucknow",
    "Land for Sale Lucknow",
    "Property Consultant Lucknow",
    "Affordable Homes Lucknow",
    "Investment Property Lucknow",
    "Real Estate Agency Lucknow",
    "National Enterprises Real Estate",
    "Manish Rawat Real Estate",
    "Gomti Nagar Properties",
    "Hazratganj Properties",
    "Sushant Golf City Properties",
  ],
  authors: [{ name: "National Enterprises Real Estate" }],
  creator: "National Enterprises Real Estate",
  publisher: "National Enterprises Real Estate",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nationalenterprises.in",
    siteName: "National Enterprises Real Estate",
    title: "National Enterprises Real Estate | Building Trust. Creating Value.",
    description:
      "Find premium residential, commercial, and investment properties across Lucknow. Trusted real estate consultancy with transparent dealings.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "National Enterprises Real Estate Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Enterprises Real Estate | Lucknow Property Consultant",
    description:
      "Find premium residential, commercial, and investment properties across Lucknow.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "National Enterprises Real Estate",
  description:
    "Lucknow-based real estate consultancy providing residential, commercial, and investment property solutions.",
  url: "https://nationalenterprises.in",
  logo: "https://nationalenterprises.in/logo.png",
  telephone: "+917705869153",
  email: "info@nationalenterprises.in",
  founder: { "@type": "Person", name: "Manish Rawat" },
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Lucknow" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}

// Tiny floating component reference — WhatsAppButton is already in page.tsx
// This is just a placeholder so the layout compiles cleanly
function WhatsAppFloating() {
  return null;
}