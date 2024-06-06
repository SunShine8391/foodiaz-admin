import AccountSettingsDesktopPage from "@/components/views/settings/Account/accountDesktop";
import AccountSettingsMobilePage from "@/components/views/settings/Account/accountMobile";

export default function SettingPage() {
  return (
    <>
      <div className="hidden sm:block">
        <AccountSettingsDesktopPage />
      </div>
      <div className="block sm:hidden">
        <AccountSettingsMobilePage />
      </div>
    </>
  );
}
