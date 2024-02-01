import "@/styles/globals.css";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WalletProvider } from "@/components/providers/wallet-provider";
// import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
require("@solana/wallet-adapter-react-ui/styles.css");
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            {/* <ConvexClientProvider> */}
            <WalletProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                {/* <WalletMultiButton /> */}
                <div className="flex-1">{children}</div>
              </div>
              <Toaster position="top-right" richColors duration={1000} />
              {/* <TailwindIndicator /> */}
            </WalletProvider>
            {/* </ConvexClientProvider> */}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
