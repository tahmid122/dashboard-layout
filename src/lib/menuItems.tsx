import {
  Users,
  LayoutGrid,
  Clock,
  CheckCircle,
  MapPin,
  Star,
  Building2,
  MessageSquareText,
  Bell,
  Settings,
  FileText,
  FolderTree,
  Bug,
  Ticket,
  HelpCircle,
  Newspaper,
  BookAlert,
  BetweenHorizontalEnd,
  Contact,
  ChartNoAxesCombined,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const useMenuItems = () => {
  const t = useTranslations();

  return [
    { id: "dashboard", label: t("dashboard"), icon: LayoutGrid },
    { id: "total-user", label: t("totalUser"), icon: Users },
    {
      id: "government-entities",
      label: t("governmentEntities"),
      icon: Building2,
    },

    { id: "categories", label: t("serviceCategories"), icon: FolderTree },
    { id: "service-catalog", label: t("service"), icon: FileText },
    { id: "service-centers", label: t("serviceCenters"), icon: MapPin },
    {
      id: "slot-management",
      label: t("slotManagement"),
      icon: BetweenHorizontalEnd,
    },
    {
      id: "contact-management",
      label: t("contactManagement"),
      icon: Contact,
    },
    {
      id: "popular-topics",
      label: t("popularTopics"),
      icon: ChartNoAxesCombined,
    },
    { id: "e-participation", label: t("eParticipation"), icon: Clock },
    {
      id: "policy-consultation",
      label: t("policyConsultation"),
      icon: CheckCircle,
    },
    { id: "satisfaction-index", label: t("satisfactionIndex"), icon: Star },
    {
      id: "feedback-tracker",
      label: t("feedbackTracker"),
      icon: MessageSquareText,
    },
    { id: "notifications", label: t("notifications"), icon: Bell },
    { id: "issue-reports", label: t("issueReports"), icon: Bug },
    { id: "support-ticket", label: t("supportTicket"), icon: Ticket },
    { id: "faqs", label: t("faqs"), icon: HelpCircle },
    { id: "news-announcement", label: t("newsAnnouncement"), icon: Newspaper },
    {
      id: "site-information",
      label: t("siteInformation"),
      icon: BookAlert,
    },
    { id: "settings", label: t("settings"), icon: Settings },
  ];
};
