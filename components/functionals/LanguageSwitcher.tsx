"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "es" : "en";

    router.replace(
      // @ts-ignore
      { pathname, params },
      { locale: nextLocale }
    );
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {locale === "en" ? "Español" : "English"}
    </button>
  );
}
