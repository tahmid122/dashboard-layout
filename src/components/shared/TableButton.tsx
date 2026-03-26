import React from "react";
interface Props {
  outline?: boolean;
  handleClick?: () => void;
  text: string | React.ReactNode;
  classes?: string;
  disabled?: boolean;
}
const TableButton = ({
  outline = false,
  text,
  handleClick,
  classes = "",
  disabled,
}: Props) => {
  if (outline) {
    return (
      <button
        disabled={disabled}
        onClick={() => {
          handleClick && handleClick();
        }}
        className={`border-default rounded-[8px] border px-3.5 py-1.25 text-sm ${classes}`}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={() => {
        handleClick && handleClick();
      }}
      className={`bg-default cursor-pointer rounded-[8px] px-3.5 py-1.25 text-sm text-white ${classes}`}
    >
      {text}
    </button>
  );
};

export default TableButton;
