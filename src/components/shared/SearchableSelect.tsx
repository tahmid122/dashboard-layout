"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useGetAllGovernmentEntitiesBySearchQuery } from "@/store/features/government-entities/governmentEntitiesAPI";
import { useDebounce } from "@/hooks/useDebounce";
import { PolicyDetails } from "@/app/(authed)/policy-consultation/add-policy/page";
import { TServiceCenterInput } from "@/types/service-center/serviceCenterType";
import { SelectedMinistry } from "@/app/(authed)/service-centers/add-service-center/page";
import { TServiceInput } from "@/types/service/serviceType";
import { useTranslations } from "next-intl";
interface Props {
  setPolicyDetails?: Dispatch<SetStateAction<PolicyDetails>>;
  setMultipleMinistry?: Dispatch<SetStateAction<TServiceCenterInput>>;
  setSelectedMinistriesName?: Dispatch<SetStateAction<SelectedMinistry[]>>;
  setServiceDetails?: Dispatch<SetStateAction<TServiceInput>>;
  selectedMinistriesName?: SelectedMinistry[];
}
export default function SearchableSelect({
  setPolicyDetails,
  setMultipleMinistry,
  setSelectedMinistriesName,
  setServiceDetails,
  selectedMinistriesName,
}: Props) {
  // lang
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // 🔥 debounce search
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } =
    useGetAllGovernmentEntitiesBySearchQuery(debouncedSearch);

  const entities = data?.data ?? [];

  return (
    <div className="mb-5 lg:mb-10">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="bg-white py-6 text-base">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[300px] justify-between"
          >
            {value
              ? entities.find((item) => item.id === value)?.name
              : t("selectMinistry")}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-[300px] p-0">
          <Command>
            <CommandInput
              placeholder="Search..."
              value={search}
              onValueChange={setSearch}
            />

            <CommandEmpty>
              {isLoading ? "Loading..." : "No result found."}
            </CommandEmpty>

            <CommandGroup>
              {entities.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    setValue(item.id);
                    setOpen(false);
                    if (setPolicyDetails)
                      setPolicyDetails((prev) => ({
                        ...prev,
                        ministryId: item.id,
                      }));
                    if (setMultipleMinistry)
                      setMultipleMinistry((prev) => ({
                        ...prev,
                        govtEntityId: [...prev.govtEntityId, item.id],
                      }));
                    if (setSelectedMinistriesName) {
                      setSelectedMinistriesName((prev) => [
                        ...prev.filter((min) => min.id !== item.id),
                        { id: item.id, name: item.name },
                      ]);
                    }

                    if (setServiceDetails)
                      setServiceDetails((prev) => ({
                        ...prev,
                        govtEntityId: item.id,
                      }));
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
