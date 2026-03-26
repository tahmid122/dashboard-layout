"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PolicyDetails } from "@/app/(authed)/policy-consultation/add-policy/page";
import { useTranslations } from "next-intl";
interface Props {
  setPolicyDetails: React.Dispatch<React.SetStateAction<PolicyDetails>>;
}
export default function DatePicker({ setPolicyDetails }: Props) {
  const t = useTranslations();
  const [date, setDate] = React.useState<Date>();
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="border-foreground rounded-[8px] py-6 text-base"
      >
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>{t("pickADate")}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value);
            if (value) {
              setPolicyDetails((prev) => ({
                ...prev,
                endDate: value.toISOString(),
              }));
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
