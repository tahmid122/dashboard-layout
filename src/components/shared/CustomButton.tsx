"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
  classes?: string;
  children: React.ReactNode;
  isLink?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: () => void;
  styles?: any;
  disabled?: boolean;
}
const CustomButton = ({
  classes,
  children,
  isLink = false,
  href = "/",
  type = "button",
  handleClick,
  styles,
  disabled,
}: Props) => {
  return (
    <>
      {isLink ? (
        <Link href={href}>
          <button
            style={styles}
            className={`bg-primary cursor-pointer rounded-[12px] text-[16px] font-medium text-white ${classes}`}
          >
            {children}
          </button>
        </Link>
      ) : (
        <button
          disabled={disabled}
          style={styles}
          onClick={handleClick}
          type={type}
          className={`bg-primary cursor-pointer rounded-[12px] text-[16px] font-medium text-white ${classes}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default CustomButton;
