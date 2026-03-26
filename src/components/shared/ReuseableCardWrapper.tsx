import React from "react";

const ReuseableCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="brand-shadow bg-backgroundWhite rounded-[16px] p-4 lg:px-12 lg:py-6">
      {children}
    </div>
  );
};

export default ReuseableCardWrapper;
