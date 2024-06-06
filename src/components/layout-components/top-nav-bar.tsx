"use client";

import { imagePaths } from "@/config/image-paths";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavLinkGroup from "./nav-link-group";
import UserNavAvatar from "./user-nav-avatar";
import Link from "next/link";
import { routes } from "@/config/routes";
import { Text } from "../elements/typography";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { dashboardPageLinks, settingPageLinks } from "@/config";
import UserFilter from "../views/user-management/filter";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { deleteDocument } from "@/lib/firebase/firestore";
import { toast } from "sonner";
import DeletePopup from "../ui/delete-popup";

export default function TopNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [openDeletePopup, setOpenDeletePopup] = useState<boolean>(false);

  const currentPage = useMemo<string>(() => {
    if (settingPageLinks.findIndex((item) => pathname.includes(item)) !== -1) {
      return "Settings";
    }
    if (
      dashboardPageLinks.findIndex((item) => pathname.includes(item)) !== -1
    ) {
      return "Dashboard";
    }

    if (pathname.split("/")[1].length > 0) {
      return "User Profile";
    }

    return "User Management";
  }, [pathname]);

  const handleUserDelete = useCallback(async () => {
    try {
      const paths = pathname.split("/");
      const id = paths[paths.length - 1];
      await deleteDocument("users", id);

      return true;
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
    return false;
  }, [pathname]);

  return (
    <>
      <nav className="h-16 px-10 py-3.5 flex-row justify-between bg-[#333333] items-center hidden lg:flex">
        <div className="flex flex-row gap-9">
          <Link href={routes.user.management}>
            <Image
              src={imagePaths.user.logo}
              width={115}
              height={32}
              alt="User Management Logo"
            />
          </Link>
          <Separator orientation="vertical" />
          <NavLinkGroup />
        </div>
        <UserNavAvatar />
      </nav>
      <div className="h-[42px] flex lg:hidden justify-center items-center relative py-3">
        {currentPage === "User Profile" && (
          <Button
            variant="link"
            className="absolute left-5"
            size="icon"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" color="#333333" />
          </Button>
        )}
        <Text level={"lg"} className="font-semibold text-[#333]">
          {currentPage.toUpperCase()}
        </Text>
        {currentPage === "User Profile" && (
          <Button
            variant={"link"}
            size={"icon"}
            className="text-black absolute right-5"
            onClick={() => setOpenDeletePopup(true)}
          >
            Delete
          </Button>
        )}
        {currentPage === "User Management" && <UserFilter />}
        <DeletePopup
          open={openDeletePopup}
          onClose={() => setOpenDeletePopup(false)}
          onConfirm={handleUserDelete}
        />
      </div>
    </>
  );
}
