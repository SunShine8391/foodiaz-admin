"use client";

import { Heading } from "@/components/elements/headings";
import AppOpens from "@/components/elements/user/app-opens";
import AppOpensMobile from "@/components/elements/user/app-opens-mobile";
import AvgSessionDuration from "@/components/elements/user/avg-session-duration";
import AvgSessionDurationMobile from "@/components/elements/user/avg-session-duration-mobile";
import Feedback from "@/components/elements/user/feedback";
import FeedbackMobile from "@/components/elements/user/feedback-mobile";
import PopularFeatures from "@/components/elements/user/popular-features";
import PopularFeaturesMobile from "@/components/elements/user/popular-features-mobile";
import { CalendarIcon } from "@/components/icons/calendar";
import { DeviceIcon } from "@/components/icons/device";
import { StarIcon } from "@/components/icons/star";
import { ZipCodeIcon } from "@/components/icons/zip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DeletePopup from "@/components/ui/delete-popup";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  deleteDocument,
  getDocumentDataWithoutSnapshot,
} from "@/lib/firebase/firestore";
import { userIdAtom } from "@/lib/jotai";
import AtomsHydrator from "@/lib/providers/atoms-hydrator";
import { capitalize } from "lodash";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HiIdentification, HiLocationMarker } from "react-icons/hi";
import { HiPhone, HiUser } from "react-icons/hi2";
import { toast } from "sonner";

export default function IndividualUserProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [openDeletePopup, setOpenDeletePopup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);

  const userProfileTabs = ["Info", "App Usage"];

  const handleUserDelete = useCallback(async () => {
    try {
      await deleteDocument("users", id);

      return true;
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
    return false;
  }, [id]);

  useEffect(() => {
    getDocumentDataWithoutSnapshot("users", id, (user) => {
      console.log(user);
      setUserInfo(user);
    });
  }, [id]);

  return (
    <AtomsHydrator atomValues={[[userIdAtom, id]]}>
      <div className="hidden sm:block">
        <div className="p-10 flex flex-col gap-6 h-full">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              <Button
                variant="outline"
                className="border-none"
                size="icon"
                onClick={() => router.push('/')}
              >
                <ChevronLeft className="h-4 w-4" color="#333333" />
              </Button>
              <Heading level={"7"}>User Profile</Heading>
            </div>
          </div>
          <div className="flex flex-1 flex-row flex-wrap gap-6">
            <div className="p-6 bg-[#F9F9F9] rounded-2xl w-[322px] flex flex-col justify-between max-[875px]:w-full">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <Avatar className="w-[72px] h-[72px]">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="user"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Heading level={"13"}>
                      {userInfo?.name ?? "Not Found"}
                    </Heading>
                    <Heading level={"11"} className="text-[#919191]">
                      {userInfo?.email ?? "Not Found"}
                    </Heading>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <HiIdentification size={16} color="#919191" />
                      <Heading level={"11"} className="text-[#919191]">ID</Heading>
                    </div>
                    <Heading level={"11"}>{id}</Heading>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <HiPhone size={16} color="#919191" />
                      <Heading level={"11"} className="text-[#919191]">
                        Phone number
                      </Heading>
                    </div>
                    <Heading level={"11"}>
                      {userInfo?.phone_number ?? "Not Found"}
                    </Heading>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <HiUser size={16} color="#919191" />
                      <Heading level={"11"} className="text-[#919191]">
                        Gender
                      </Heading>
                    </div>
                    <Heading level={"11"}>
                      {userInfo?.gender ?? "Not Found"}
                    </Heading>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <HiLocationMarker size={16} color="#919191" />
                      <Heading level={"11"} className="text-[#919191]">
                        Country
                      </Heading>
                    </div>
                    <Heading level={"11"}>
                      {userInfo?.region ?? "Not Found"}
                    </Heading>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <ZipCodeIcon className="w-4 h-4" />
                      <Heading level={"11"} className="text-[#919191]">
                        Zip Code
                      </Heading>
                    </div>
                    <Heading level={"11"}>
                      {userInfo?.zip_code ?? "Not Found"}
                    </Heading>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <DeviceIcon className="w-4 h-4" />
                      <Heading level={"11"} className="text-[#919191]">
                        Device
                      </Heading>
                    </div>
                    <Heading level={"11"}>
                      {userInfo?.device_type ?? "Not Found"}
                    </Heading>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <CalendarIcon className="w-4 h-4" />
                      <Heading level={"11"} className="text-[#919191]">
                        Date of birth
                      </Heading>
                    </div>
                    <Heading level={"11"}>
                      {userInfo?.birthday ?? "Not Found"}
                    </Heading>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <StarIcon className="w-4 h-4" />
                      <Heading level={"11"} className="text-[#919191]">
                        Subscription
                      </Heading>
                    </div>
                    <Heading level={"11"}>{capitalize(userInfo?.subscription ?? "Free")}</Heading>
                  </div>
                </div>
              </div>
              <Button
                className="h-11 rounded-[10px] px-5 py-4 bg-[#4F4F4F] font-semibold text-base leading-5 uppercase max-[875px]:mt-10"
                onClick={() => setOpenDeletePopup(true)}
              >
                Delete user
              </Button>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <AppOpens userId={id} />
              <PopularFeatures userId={id} />
            </div>
            <div className="flex flex-col gap-8 max-[1222px]:w-full">
              <AvgSessionDuration userId={id} />
              <Feedback userId={id} />
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="p-4 flex flex-col gap-5">
          <div className="rounded-[10px] bg-[#F9F9F9] px-6 py-8 flex flex-col gap-4 items-center">
            <Avatar className="w-[72px] h-[72px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 items-center">
              <Heading level={"13"}>{userInfo?.name ?? "Not Found"}</Heading>
              <Heading level={"11"}>{userInfo?.email ?? "Not Found"}</Heading>
            </div>
          </div>
          <Tabs defaultValue="Info">
            <TabsList className="grid h-11.5 grid-cols-2 items-end gap-2 bg-transparent pb-0">
              {userProfileTabs.map((item, index) => (
                <TabsTrigger
                  className="col-span-1 leading-5 text-base not-italic font-medium rounded-none text-[#919191] border-b-[3px] border-white bg-transparent px-4 py-2.5 data-[state=active]:border-[#333] data-[state=active]:text-[#333] data-[state=active]:shadow-none"
                  value={item}
                  key={index}
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="Info">
              <div className="flex flex-col gap-4 pt-5">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <HiIdentification size={16} color="#919191" />
                    <Heading level={"11"} className="text-[#919191]">
                      ID
                    </Heading>
                  </div>
                  <Heading level={"11"}>{id}</Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <HiPhone size={16} color="#919191" />
                    <Heading level={"11"} className="text-[#919191]">
                      Phone number
                    </Heading>
                  </div>
                  <Heading level={"11"}>
                    {userInfo?.phone_number ?? "Not Found"}
                  </Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <HiUser size={16} color="#919191" />
                    <Heading level={"11"} className="text-[#919191]">
                      Gender
                    </Heading>
                  </div>
                  <Heading level={"11"}>
                    {userInfo?.gender ?? "Not Found"}
                  </Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <HiLocationMarker size={16} color="#919191" />
                    <Heading level={"11"} className="text-[#919191]">
                      Country
                    </Heading>
                  </div>
                  <Heading level={"11"}>
                    {userInfo?.region ?? "Not Found"}
                  </Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <ZipCodeIcon className="w-4 h-4" />
                    <Heading level={"11"} className="text-[#919191]">
                      Zip Code
                    </Heading>
                  </div>
                  <Heading level={"11"}>
                    {userInfo?.zip_code ?? "Not Found"}
                  </Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <DeviceIcon className="w-4 h-4" />
                    <Heading level={"11"} className="text-[#919191]">
                      Device
                    </Heading>
                  </div>
                  <Heading level={"11"}>
                    {userInfo?.device_type ?? "Not Found"}
                  </Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <CalendarIcon className="w-4 h-4" />
                    <Heading level={"11"} className="text-[#919191]">
                      Date of birth
                    </Heading>
                  </div>
                  <Heading level={"11"}>
                    {userInfo?.birthday ?? "Not Found"}
                  </Heading>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <StarIcon className="w-4 h-4" />
                    <Heading level={"11"} className="text-[#919191]">
                      Subscription
                    </Heading>
                  </div>
                  <Heading level={"11"}>{capitalize(userInfo?.subscription ?? "Free")}</Heading>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="App Usage">
              <div className="w-full pt-5 flex flex-col gap-5">
                <AppOpensMobile userId={id} />
                <AvgSessionDurationMobile userId={id} />
                <PopularFeaturesMobile userId={id} />
                <FeedbackMobile userId={id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <DeletePopup
        open={openDeletePopup}
        onClose={() => setOpenDeletePopup(false)}
        onConfirm={handleUserDelete}
      />
    </AtomsHydrator>
  );
}
