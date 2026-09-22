import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/lib/store";
import { AuthGate } from "@/components/AuthGate";
import { Navbar } from "@/components/Navbar";
import { SyntheticDataBanner } from "@/components/ui";

export const metadata: Metadata = {
  title: "PAIMANA — Project Risk & Delay Intelligence",
  description: "Synthetic demo dashboard for infrastructure project risk monitoring.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AppStateProvider>
          <AuthGate>
            <Navbar />
            <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">{children}</main>
          </AuthGate>
          <SyntheticDataBanner />
        </AppStateProvider>
      </body>
    </html>
  );
}
