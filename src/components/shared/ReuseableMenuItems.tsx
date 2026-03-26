import { useMenuItems } from "@/lib/menuItems";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
interface Props {
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
}
const ReuseableMenuItems = ({ activeItem, setActiveItem }: Props) => {
  const menuItems = useMenuItems();
  return (
    <div className="space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        return (
          <Link
            href={`/${item.id === "dashboard" ? "" : item.id}`}
            key={item.id}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-[8px] p-3 transition-all ${
              isActive
                ? "bg-primary font-medium text-white"
                : "hover:bg-secondary text-sidebar-foreground"
            }`}
          >
            <Icon className="fill h-6 w-6 flex-shrink-0" />
            <span className="text-left text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ReuseableMenuItems;
