"use client";

import React from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations();

  const current = Cookies.get("NEXT_LOCALE") || "en";

  const toggle = () => {
    const next = current === "en" ? "ar" : "en";
    Cookies.set("NEXT_LOCALE", next, { expires: 365 });
    // reload to apply locale and direction
    window.location.reload();
  };

  return (
    <button onClick={toggle} className="w-full text-left">
      {t("language")}
    </button>
  );
}
