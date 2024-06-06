import UsageDesktopPage from "@/components/views/dashboard/Usage/usageDesktop";
import UsageMobilePage from "@/components/views/dashboard/Usage/usageMobile";

export default function UsageManagementPage() {
  return (
    <>
      <div className="hidden sm:block">
        <UsageDesktopPage />
      </div>
      <div className="block sm:hidden">
        <UsageMobilePage />
      </div>
    </>
  );
}
