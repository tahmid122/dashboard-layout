import React from "react";
interface Props {
  children: React.ReactNode;
  classes?: string;
  padding?: string;
}
const ReuseableBackgroundContainer = ({
  children,
  classes = "",
  padding = "p-4 lg:px-6 lg:py-5",
}: Props) => {
  return (
    <div
      className={`brand-shadow bg-backgroundWhite w-full rounded-[16px] ${padding} ${classes} `}
    >
      {children}
    </div>
  );
};

export default ReuseableBackgroundContainer;
