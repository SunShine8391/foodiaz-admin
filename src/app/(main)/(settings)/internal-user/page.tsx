import { Heading } from "@/components/elements/headings";
import { Button } from "@/components/ui/button";
import InternalUserMobileTable from "@/components/views/settings/Internal/mobileTable";
import InternalUserTable from "@/components/views/settings/Internal/userTable";

export default function InternalUserPage() {
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="hidden sm:block">
        <div className="flex flex-row justify-between items-center">
          <Heading level={"15"}>Internal Users</Heading>
          <Button className="rounded-[10px] px-2.5 py-5 text-[14px] leading-5 font-medium">
            ADD USER
          </Button>
        </div>
        <InternalUserTable />
      </div>
      <div className="block sm:hidden">
        <InternalUserMobileTable />
      </div>
    </div>
  );
}
