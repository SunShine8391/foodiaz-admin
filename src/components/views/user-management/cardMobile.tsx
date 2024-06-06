import { Separator } from "@/components/ui/separator";
import { Heading } from "../../elements/headings";
import { HiUsers, HiOutlineXCircle } from "react-icons/hi2";
import { MdStars } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  loading: boolean;
  Users: number | false;
  Premium: number | false;
  Free: number | false;
}

export default function Card({ Users, Premium, Free,loading }: Props) {
  return (
    <div
      className="rounded-[10px] w-full p-5 flex flex-row justify-between h-[104px]"
      style={{
        background: "linear-gradient(89deg, #FFA978 -11.37%, #FF5D00 108.57%)",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 items-center">
          <HiUsers size={14} color="white" style={{ opacity: 0.6 }} />
          <Heading level={"14"}>Users</Heading>
        </div>
        <Heading level={"12"} className="leading-9 text-white">
          {loading
            ? <Skeleton className="w-8 h-8 bg-[#ffaf81bd]" />
            : Users
          }
        </Heading>
      </div>
      <Separator
        orientation="vertical"
        className="text-white border border-solid h-full"
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1 items-center">
            <MdStars size={14} color="white" style={{ opacity: 0.6 }} />
            <Heading level={"14"}>Premium</Heading>
          </div>
          <Heading level={"7"} className="text-white">
            {loading
              ? <Skeleton className="w-8 h-8 bg-[#ffaf81bd]" />
              : Premium
            }
          </Heading>
        </div>
        <div className="flex flex-row justify-between w-[170px]">
          <div className="flex flex-row gap-1 items-center">
            <HiOutlineXCircle
              size={14}
              color="white"
              style={{ opacity: 0.5 }}
            />
            <Heading level={"14"}>Free</Heading>
          </div>
          <Heading level={"7"} className="text-white">
            {loading
              ? <Skeleton className="w-8 h-8 bg-[#ffaf81bd]" />
              : Free
            }
          </Heading>
        </div>
      </div>
    </div>
  );
}
