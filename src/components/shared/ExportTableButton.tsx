import { exportTableData } from "@/utils/ExportTableData";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  disabled?: boolean;
}
const ExportTableButton = ({ data, disabled }: Props) => {
  const t = useTranslations();
  return (
    <button
      disabled={disabled}
      onClick={() => exportTableData(data)}
      className="bg-default flex cursor-pointer items-center gap-2 rounded-[8px] px-3.5 py-1.25 text-sm text-white"
    >
      <Download className="h-5 w-5" />
      {t("export")}
    </button>
  );
};

export default ExportTableButton;
