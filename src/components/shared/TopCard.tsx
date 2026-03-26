"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
interface Props {
  text: string | number;
  smallText: string;
  icon: React.ReactNode;
  classes?: string;
  active?: string;
  name: string;
  setActive?: Dispatch<SetStateAction<string>>;
}
const TopCard = ({
  text,
  smallText,
  icon,
  classes,
  active,
  name,
  setActive,
}: Props) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <div
      onClick={() => {
        setActive?.(name);
        if (path === "/e-participation") {
          router.push(`/e-participation?type=${name}`);
        }
      }}
      className={`bg-card flex h-[168px] flex-col items-center justify-center gap-2 rounded-[16px] border-4 ${active === name ? "border-default" : "border-[#D2DBE3]"} p-5 ${classes} `}
    >
      <h1 className="text-foreground text-[32px] lg:text-[40px]">{text}</h1>
      <div className="flex flex-wrap items-end justify-center gap-2 text-center">
        {icon}
        <span className="text-foreground text-base font-medium">
          {smallText}
        </span>
      </div>
    </div>
  );
};

export default TopCard;
