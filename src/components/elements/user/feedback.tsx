"use client";

import { Heading } from "@/components/elements/headings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchData } from "@/lib/utils";
import { TagType } from "@/types/user";
import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

export default function Feedback({
  userId
}: {
  userId: string
}) {
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    fetchData(`${BASE_URL}/UserFeedbacks/UserFeedbacksbyUserId?userId=${userId}`)
      .then(res => {
        if (res.Success) {
          setTags(res.Result.Metrics[0]);
        }
      })
  }, [userId]);

  return (
    <div
      className="p-6 rounded-2xl w-[322px] max-[1222px]:w-full"
      style={{ boxShadow: "0px 2px 8px 0px rgba(51, 51, 51, 0.13)" }}
    >
      <div className="flex flex-row justify-between items-center">
        <Heading level={"9"}>Feedback</Heading>
        <HiArrowsUpDown
          size={20}
          color="#333333"
          className="cursor-pointer"
        />
      </div>
      <ScrollArea
        className="h-72 w-full mt-5"
        style={{ height: "calc(100vh - 520px)" }}
      >
        <div className="flex flex-col gap-4">
          {(tags.length > 0)
            ? tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <div key={index} className="flex flex-col gap-2">
                    <Heading level={"10"} className="text-start">
                      {new Date(tag.CreatedOn).toDateString()}
                    </Heading>
                    <Heading level={"11"}>{tag.Feedback}</Heading>
                  </div>
                  <Separator />
                </React.Fragment>
              ))
            : <div className="text-center p-8">No data available</div>
          }
        </div>
      </ScrollArea>
    </div>
  );
}