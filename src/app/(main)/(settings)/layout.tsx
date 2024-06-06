import { Separator } from "@/components/ui/separator";
import SettingSideGroup from "@/components/layout-components/setting-side-group";
import DashboardTopNavbar from "@/components/layout-components/dashboard-top-bar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTopNavbar variant="SETTING" />
      <div className="flex flex-row w-full flex-1">
        <SettingSideGroup />
        <Separator orientation="vertical" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
