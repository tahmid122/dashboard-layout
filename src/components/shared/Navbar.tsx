"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { DialogTitle } from "@radix-ui/react-dialog";
import ReuseableMenuItems from "./ReuseableMenuItems";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { formatFullDate } from "@/utils/formatFullDate";
import { useAppSelector } from "@/store/hookts";
import AvatarProfile from "./AvatarProfile";
export function Navbar() {
  // language

  const { user } = useAppSelector((state) => state.auth);
  const path = usePathname();
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const modifiedPath = path.split("/");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveItem(modifiedPath[1] || "dashboard");
  }, [path]);
  return (
    <header className="px brand-shadow bg-backgroundWhite sticky top-0 z-50 mt-4 rounded-[16px] px-4 py-4 lg:mt-8 lg:px-12">
      <div className="px- py- flex items-center justify-between">
        {/* navbar left side */}
        <div className="flex">
          <div className="flex items-center">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                width={71}
                height={24}
                alt="site_logo"
                className="h-6 w-17.5 object-cover"
              />
            </Link>
            <Separator
              orientation="vertical"
              className="mx-9 hidden lg:block"
            />
          </div>
          {/* Desktop Title and date */}
          <div className="hidden items-center lg:flex">
            <h1 className="text-foreground text-xl font-bold uppercase">
              {activeItem?.includes("-")
                ? activeItem?.split("-").join(" ")
                : activeItem}
            </h1>
            <Separator
              orientation="vertical"
              className="mx-9 hidden lg:block"
            />
            <span className="text-muted-foreground text-base">
              {formatFullDate()}
            </span>
          </div>
        </div>

        {/* Desktop Profile */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-3">
            {/* <Image
              src={avatar}
              alt="Avatar"
              width={40}
              height={40}
              className="border-foreground rounded-full border"
            /> */}
            <AvatarProfile />
            <div className="text-left">
              <p className="text-sm font-medium text-[#424242]">{user?.name}</p>
              <p className="text-muted-foreground text-xs">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <AvatarProfile />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="hover:bg-secondary cursor-pointer rounded p-1">
                <Menu className="text-foreground h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-backgroundWhite w-64 p-0"
              showCloseButton={false}
            >
              <DialogTitle className="hidden"></DialogTitle>
              <div className="flex h-full flex-col">
                {/* Mobile Header */}
                <div className="border-border flex items-center justify-between border-b p-4">
                  {/* logo for mobile */}
                  <Link href={"/"}>
                    <Image
                      src={"/"}
                      width={71}
                      height={24}
                      alt="site_logo"
                      className="h-6 w-17.5 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-secondary cursor-pointer rounded p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Nav Items */}
                <nav className="flex-1 overflow-y-auto px-3 py-6">
                  <div className="space-y-2">
                    <nav className="flex-1 overflow-y-auto">
                      {/* reuseable menuitems */}
                      <ReuseableMenuItems
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                      />
                    </nav>
                  </div>
                </nav>

                {/* Mobile Logout */}
                <div className="border-border border-t p-4">
                  <LogoutButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Navigation items
