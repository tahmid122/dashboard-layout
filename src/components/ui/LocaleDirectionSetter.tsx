"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LocaleDirectionSetter() {
  useEffect(() => {
    const locale = Cookies.get("NEXT_LOCALE") || "en";
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, []);

  return null;
}
