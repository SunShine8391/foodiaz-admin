import UserManagementDesktop from "@/components/views/user-management/userManagementDesktop";
import UserManagementMobile from "@/components/views/user-management/userManagementMobile";

export default function UserManagementPage() {
  return (
    <>
      <div className="hidden sm:block">
        <UserManagementDesktop />
      </div>
      <div className="block sm:hidden">
        <UserManagementMobile />
      </div>
    </>
  );
}
