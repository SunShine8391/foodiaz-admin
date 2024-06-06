"use client";

import { Heading } from "@/components/elements/headings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword, updateEmailAddress } from "@/lib/firebase";
import { useAuth } from "@/lib/providers/auth-provider";
import { Separator } from "@radix-ui/react-separator";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PasswordFormValue {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AccountSettingsDesktopPage() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<PasswordFormValue>();

  const [newEmail, setNewEmail] = useState<string>("");

  const handleChangePassword = useCallback(
    async ({
      confirmPassword,
      currentPassword,
      newPassword,
    }: PasswordFormValue) => {
      if (confirmPassword.length > 8 && newPassword.length > 8) {
        try {
          await changePassword(user?.email ?? "", currentPassword, newPassword);

          toast.success("Your password has changed successfully!");
        } catch (err) {
          console.log(err);
          toast.error(err as string);
        }
      } else {
        toast.error("Password length should be more than 8 characters.");
      }
    },
    [user?.email]
  );

  const handleChangeEmailAddress = useCallback(async () => {
    if (newEmail.length > 0 && user) {
      await updateEmailAddress(user, newEmail);

      toast.success("Your email has changed successfully!")
    } else {
      toast.error("Please input correct email address.");
    }
  }, [newEmail, user]);

  return (
    <div className="p-5 flex flex-col gap-6">
      <Heading level={"15"}>Account Settings</Heading>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-0">
          <div className="flex flex-col gap-1 w-full md:w-2/5">
            <Heading level={"9"} className="text-start">
              General
            </Heading>
            <Heading level={"17"} className="w-full md:w-[250px]">
              General settings allow you to change your profile name
            </Heading>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-row gap-4 items-end">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">
                  <Heading level={"11"} className="font-semibold">
                    Name
                  </Heading>
                </Label>
                <Input
                  id="name"
                  placeholder="Email"
                  type="email"
                  className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium"
                />
              </div>
              <Button
                variant={"outline"}
                className="rounded-[10px] py-5 border-[#FF5D00] border border-solid text-[14px] hover:text-[#FF5D00] font-semibold leading-5 text-[#FF5D00]"
                onClick={handleChangeEmailAddress}
              >
                SAVE CHANGES
              </Button>
            </div>
            <div className="flex flex-col gap-1">
              <Heading level={"11"} className="font-semibold">
                Email
              </Heading>
              <Heading level={"16"}>{user?.email}</Heading>
            </div>
            <div className="flex flex-col gap-1">
              <Heading level={"11"} className="font-semibold">
                Role
              </Heading>
              <Heading level={"16"}>Super Admin</Heading>
            </div>
          </div>
        </div>
        <Separator className="border border-solid border-[#EAEAEA]" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-0">
          <div className="flex flex-col gap-1 w-full md:w-2/5">
            <Heading level={"9"} className="text-start">
              Change Password
            </Heading>
            <Heading level={"17"} className="w-full md:w-[250px]">
              You need to type it twice to confirm your new password and not to
              forget it
            </Heading>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-row gap-4 items-end w-full">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="current_password">
                  <Heading level={"11"} className="font-semibold">
                    Current Password
                  </Heading>
                </Label>
                <div className="flex flex-row gap-4 w-full">
                  <Input
                    id="current_password"
                    placeholder="Current Password"
                    type="password"
                    className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium md:max-w-[322px]"
                    {...register("currentPassword")}
                  />
                </div>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="new_password">
                <Heading level={"11"} className="font-semibold">
                  New Password
                </Heading>
              </Label>
              <Input
                id="new_password"
                placeholder="New Password"
                type="password"
                className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium md:max-w-[322px]"
                {...register("newPassword", { min: 8 })}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="confirm_password">
                <Heading level={"11"} className="font-semibold">
                  Confirm Password
                </Heading>
              </Label>
              <Input
                id="confirm_password"
                placeholder="Confirm Password"
                type="password"
                className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium md:max-w-[322px]"
                {...register("confirmPassword", { min: 8 })}
              />
            </div>
            <Button
              variant={"outline"}
              className="rounded-[10px] border border-solid px-3 py-5 border-[#FF5D00] hover:text-[#FF5D00] w-[322px] text-base font-semibold text-[#FF5D00]"
              onClick={handleSubmit(handleChangePassword)}
            >
              SUBMIT
            </Button>
          </div>
        </div>
        <Separator className="border border-solid border-[#EAEAEA]" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-0">
          <div className="flex flex-col gap-1 w-full md:w-2/5">
            <Heading level={"9"} className="text-start">
              Two-Factor Authentication
            </Heading>
            <Heading level={"17"} className="w-full md:w-[250px]">
              2FA enhances account security. By using an authenticator app along
              with your password, you ensure exclusive access to your account.
              <br />
            </Heading>
          </div>
          <div className="flex flex-1">
            <Button
              variant={"outline"}
              className="rounded-[10px] border border-solid px-3 py-5 border-[#FF5D00] hover:text-[#FF5D00] w-[322px] text-base font-semibold text-[#FF5D00]"
            >
              ENABLE 2FA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
