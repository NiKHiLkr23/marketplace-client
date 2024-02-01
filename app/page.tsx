import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { cn } from "@/lib/utils";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2 ">
        <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
          Welcome to Sol Marketplace, the ultimate destination{" "}
          <br className="hidden sm:inline" /> for freelancers and businesses
          alike.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Discover opportunities, showcase your skills, and build meaningful
          connections
        </p>
      </div>
      <div className="flex w-full gap-4">
        <div className="">
          <Link
            href="/create-profile?user=employer"
            className={cn(
              buttonVariants(),
              "w-36 md:w-48 h-20 md:h-28 md:text-xl "
            )}
          >
            Hire
          </Link>
        </div>
        <Link
          href="/create-profile?user=employee"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-36 md:w-48 h-20 md:h-28 md:text-xl "
          )}
        >
          Get Hired
        </Link>
      </div>
    </section>
  );
}
