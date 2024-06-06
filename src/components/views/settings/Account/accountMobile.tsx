"use client";

import { Heading } from "@/components/elements/headings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";

export default function AccountSettingsMobilePage() {
  return (
    <div className="p-5 flex flex-col gap-5 pb-16">
      <div className="flex p-5 rounded-[10px] bg-[#F9F9F9] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Heading level={"9"} className="text-start">
            General
          </Heading>
          <Heading level={"17"} className="w-full md:w-[250px]">
            General settings allow you to change your profile name
          </Heading>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">
              <Heading level={"11"} className="font-semibold">
                Name
              </Heading>
            </Label>
            <Input
              id="name"
              placeholder="Email"
              className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium"
            />
          </div>
          <Button
            variant={"outline"}
            className="rounded-[10px] py-5 border-[#DEDEDE] border border-solid text-[14px] font-semibold leading-5 text-[#BEBEBE]"
          >
            SAVE CHANGES
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Heading level={"11"} className="font-semibold">
            Email
          </Heading>
          <Heading level={"16"}>admin@foodiaz.com</Heading>
        </div>
        <div className="flex flex-col gap-2">
          <Heading level={"11"} className="font-semibold">
            Role
          </Heading>
          <Heading level={"16"}>Super Admin</Heading>
        </div>
      </div>
      <div className="flex p-5 rounded-[10px] bg-[#F9F9F9] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Heading level={"9"} className="text-start">
            Change Password
          </Heading>
          <Heading level={"17"}>
            You need to type it twice to confirm your new password and not to
            forget it
          </Heading>
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <Label htmlFor="current_password">
            <Heading level={"11"} className="font-semibold">
              Current Password
            </Heading>
          </Label>
          <Input
            id="current_password"
            placeholder="Current Password"
            className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium md:max-w-[322px]"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <Label htmlFor="new_password">
            <Heading level={"11"} className="font-semibold">
              New Password
            </Heading>
          </Label>
          <Input
            id="new_password"
            placeholder="New Password"
            className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <Label htmlFor="confirm_password">
            <Heading level={"11"} className="font-semibold">
              Confirm Password
            </Heading>
          </Label>
          <Input
            id="confirm_password"
            placeholder="Confirm Password"
            className="rounded-[10px] py-3 border border-[#EAEAEA] text-[14px] leading-5 font-medium md:max-w-[322px]"
          />
        </div>
        <Button
          variant={"outline"}
          className="rounded-[10px] px-3 py-5 border border-solid border-[#DEDEDE] font-semibold text-base text-[#BEBEBE]"
        >
          SUBMIT
        </Button>
        <Heading
          level={"16"}
          className="text-[#FF5D00] text-center cursor-pointer"
        >
          Forgot password?
        </Heading>
      </div>
      <div className="flex p-5 rounded-[10px] bg-[#F9F9F9] flex-col gap-5">
        <div className="flex flex-col gap-1 w-full md:w-2/5">
          <Heading level={"9"} className="text-start">
            Two-Factor Authentication
          </Heading>
          <Heading level={"17"}>
            2FA enhances account security. By using an authenticator app along
            with your password, you ensure exclusive access to your account.
            <br />
          </Heading>
        </div>
        <Button
          variant={"outline"}
          className="rounded-[10px] border border-solid px-3 py-5 border-[#FF5D00] w-[322px] text-base font-semibold text-[#FF5D00]"
        >
          ENABLE 2FA
        </Button>
      </div>
      <Button className="my-3 rounded-[10px] px-4 py-5 bg-[#4F4F4F] text-base font-semibold h-[52px]">
        Log out
      </Button>
    </div>
  );
}
