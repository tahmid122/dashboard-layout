"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, RefreshCw } from "lucide-react";
import avatar from "@/assets/avatar/avatar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from "@/store/features/user/userApi";
import LoadingSpinner from "./LoadingSpinner";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function AvatarProfile() {
  // language
  const t = useTranslations();
  const router = useRouter();
  const { data, isLoading } = useGetUserInfoQuery();
  if (isLoading) return <LoadingSpinner />;
  const profileInfo = data?.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <Avatar className="h-10 w-10 cursor-pointer">
          <Image
            src={profileInfo?.profile ?? avatar}
            alt="Avatar"
            width={40}
            height={40}
            className="border-foreground rounded-full border"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/change-profile")}>
            <Pencil />
            {t("updateProfile")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/change-profile")}>
            <RefreshCw />
            <LanguageSwitcher />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
