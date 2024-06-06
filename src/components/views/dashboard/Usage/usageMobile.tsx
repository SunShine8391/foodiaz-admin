import AcquisitionSourceMobile from "@/components/elements/dashboard/acquisition-source-mobile";
import AvgSessionDurationMobile from "@/components/elements/dashboard/avg-session-duration-mobile";
import DailyActiveUsersMobile from "@/components/elements/dashboard/daily-active-users-mobile";
import MonthlyActiveUsersMobile from "@/components/elements/dashboard/monthly-active-users-mobile";
import PurposeAppUsageMobile from "@/components/elements/dashboard/purpose-app-usage-mobile";
import RageTapsMobile from "@/components/elements/dashboard/rage-taps-mobile";
import UserCountMobile from "@/components/elements/dashboard/user-count-mobile";
import UsersByCountryMobile from "@/components/elements/dashboard/users-by-country-mobile";
import UsersByDeviceMobile from "@/components/elements/dashboard/users-by-device-mobile";
import UsersByGenderMobile from "@/components/elements/dashboard/users-by-gender-mobile";

export default function UsageMobilePage() {
  return (
    <div className="p-5 flex flex-col gap-6 pb-16">
      <UserCountMobile />
      <PurposeAppUsageMobile />
      <AvgSessionDurationMobile />
      <DailyActiveUsersMobile />
      <MonthlyActiveUsersMobile />
      <RageTapsMobile />
      <AcquisitionSourceMobile />
      <UsersByCountryMobile />
      <UsersByGenderMobile />
      <UsersByDeviceMobile />
    </div>
  );
}
