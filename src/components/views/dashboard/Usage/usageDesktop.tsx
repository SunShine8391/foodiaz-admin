import AcquisitionSource from "@/components/elements/dashboard/acquisition-source";
import AvgSessionDuration from "@/components/elements/dashboard/avg-session-duration";
import DailyActiveUsers from "@/components/elements/dashboard/daily-active-users";
import MonthlyActiveUsers from "@/components/elements/dashboard/monthly-active-users";
import PurposeAppUsage from "@/components/elements/dashboard/purpose-app-usage";
import RageTaps from "@/components/elements/dashboard/rage-taps";
import UserCount from "@/components/elements/dashboard/user-count";
import UsersByCountry from "@/components/elements/dashboard/users-by-country";
import UsersByDevice from "@/components/elements/dashboard/users-by-device";
import UsersByGender from "@/components/elements/dashboard/users-by-gender";
import { Heading } from "@/components/elements/headings";
import { StyleSwitcher } from "@/components/ui/style-switcher";

export default function UsageDesktopPage() {
  return (
    <div className="p-5 flex flex-col gap-6 pb-16 lg:pb-2">
      <div className="flex flex-row justify-between items-center">
        <Heading level={"15"}>App Usage</Heading>
        {/* <StyleSwitcher label="Last month" /> */}
      </div>
      <div className="flex flex-1 flex-col 2xl:flex-row gap-6 justify-between h-full">
        <div className="flex flex-1 flex-col gap-6 w-full">
          <div className="flex flex-1 flex-col md:flex-row gap-6">
            <UserCount />
            <AvgSessionDuration />
          </div>
          <PurposeAppUsage />
        </div>
        <div className="flex flex-col w-full 2xl:w-[437px] h-full">
          <RageTaps />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col xl:flex-row gap-6">
          <DailyActiveUsers />
          <MonthlyActiveUsers />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <AcquisitionSource />
          <UsersByCountry />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <UsersByGender />
          <UsersByDevice />
        </div>
      </div>
    </div>
  );
}
