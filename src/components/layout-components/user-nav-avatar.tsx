"use client";

import { useCallback, useMemo } from "react";
import { Text } from "../elements/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { signOut } from "@/lib/firebase";
import { toast } from "sonner";
import { useAuth } from "@/lib/providers/auth-provider";

export default function UserNavAvatar() {
  const { user } = useAuth();

  const userName = useMemo(
    () => user?.displayName ?? user?.email?.split("@")[0] ?? "",
    [user]
  );

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message);
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="hover:bg-transparent !shadow-none !ring-transparent ring-offset-transparent gap-2"
        >
          <div className="flex flex-col items-start">
            <Text level={"md"} className="text-white font-semibold">
              {userName}
            </Text>
            <Text level={"sm"} className="text-white font-normal text-left">
              {userName}
            </Text>
          </div>
          <ChevronDown className="text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer flex flex-row gap-2"
          onClick={handleLogout}
        >
          <HiOutlineArrowRightOnRectangle className="rotate-180 w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
