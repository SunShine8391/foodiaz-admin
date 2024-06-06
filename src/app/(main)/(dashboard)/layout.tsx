import { Separator } from "@/components/ui/separator";
import NavSideGroup from "@/components/layout-components/nav-side-group";
import DashboardTopNavbar from "@/components/layout-components/dashboard-top-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTopNavbar variant="DASHBOARD" />
      <div className="flex flex-row h-full flex-1">
        <NavSideGroup />
        <Separator orientation="vertical" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
