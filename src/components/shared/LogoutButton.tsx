"use client";

import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/store/hookts";
import { logout } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";

const LogoutButton = () => {
  // language
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Clear Redux user state
    dispatch(logout());

    // Remove accessToken cookie
    Cookies.remove("accessToken");

    // Optional: redirect to login page
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#F12B01] p-3 font-medium text-[#F12B01] transition hover:bg-red-50"
    >
      <LogOut className="h-5 w-5" />
      <span className="text-base">{t("logout")}</span>
    </button>
  );
};

export default LogoutButton;
