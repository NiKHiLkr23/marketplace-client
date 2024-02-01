"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useMobileSidebar } from "@/lib/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SiteHeader } from "./site-header";
import { MainNav } from "./main-nav";
import { siteConfig } from "@/config/site";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden "
        variant="ghost"
        size="sm"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="p-2 pt-10">
          <MainNav items={siteConfig.mainNav} type="mobile" />
        </SheetContent>
      </Sheet>
    </>
  );
};
