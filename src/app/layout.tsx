import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import { Providers } from "./providers";
import { Metadata } from "next";

const roboto = Geist({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Sharek Dashboard",
};

export default function MyApp({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main
          className={cn(
            roboto.className,
            "bg-background text-foreground h-full min-h-screen w-screen overflow-x-hidden antialiased",
          )}
        >
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
