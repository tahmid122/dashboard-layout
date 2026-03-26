"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import Cookies from "js-cookie";
import { NextIntlClientProvider } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import LocaleDirectionSetter from "@/components/ui/LocaleDirectionSetter";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = React.useState<Record<string, any> | null>(
    null,
  );
  const [locale, setLocale] = React.useState<string>("en");

  React.useEffect(() => {
    const l = Cookies.get("NEXT_LOCALE") || "en";
    setLocale(l);
    import(`../locales/${l}.json`).then((mod) =>
      setMessages(mod.default || mod),
    );
  }, []);

  if (!messages) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Toaster dir="ltr" richColors position="top-center" />
          <LocaleDirectionSetter />
          {children}
        </NextIntlClientProvider>
      </PersistGate>
    </Provider>
  );
}
