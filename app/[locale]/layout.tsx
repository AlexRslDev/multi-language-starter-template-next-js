import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Providers } from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL;

  if (!baseUrl) {
    throw new Error("Web Url is missing.");
  }

  return {
    metadataBase: new URL(baseUrl),
    title: t('layout.title'),
    description: t('layout.description'),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
