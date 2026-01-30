import LanguageSwitcher from "@/components/functionals/LanguageSwitcher";
import ThemeToggle from "@/components/functionals/ThemeToggle";
import { getMessages } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <div className="flex flex-col gap-4">
      <ThemeToggle />
      <LanguageSwitcher />
      <h1>{messages.hello}</h1>
    </div>
  );
}
