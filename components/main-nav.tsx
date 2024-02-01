"use client";

import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { createCookies } from "@/actions/cookies/create-cookies";
import { deleteCookies } from "@/actions/cookies/delete-cookies";
import { NavItem } from "@/types/nav";
interface MainNavProps {
  items?: NavItem[];
  type: "mobile" | "desktop";
}

export function MainNav({ items, type }: MainNavProps) {
  const { wallet } = useWallet();

  React.useEffect(() => {
    if (wallet) {
      console.log("wallet connected");
      createCookies("wallet");
    } else {
      console.log("wallet disconnected");
      deleteCookies("wallet");
    }
  }, [wallet]);

  return (
    <div
      className={cn(
        "flex gap-6 md:gap-10 ",
        type === "mobile" ? "flex-col p-5 space-y-4" : "items-center space-x-4"
      )}
    >
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/solanaLogoMark.svg"
          width={100}
          height={100}
          alt="Logo"
          className="w-5 h-5"
        />
        <span className="inline-block font-bold ">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav
          className={cn(
            "gap-6",
            type === "mobile"
              ? "flex-col items-center space-y-4"
              : "hidden md:flex  items-center space-x-4"
          )}
        >
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
          <WalletMultiButton />
        </nav>
      ) : null}
    </div>
  );
}
