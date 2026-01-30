import LanguageSwitcher from "@/components/functionals/LanguageSwitcher";
import ThemeToggle from "@/components/functionals/ThemeToggle";
import { getMessages } from "next-intl/server";

export default async function Home() {
  const messages = await getMessages();

  return (
    <div className="flex flex-col gap-4">
      <ThemeToggle />
      <LanguageSwitcher />
      <h1>{messages.hello}</h1>
    </div>
  );
}
