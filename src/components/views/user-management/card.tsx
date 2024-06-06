import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "../../elements/headings";
import { HiUsers, HiOutlineXCircle } from "react-icons/hi2";
import { MdStars } from "react-icons/md";

interface Props {
  label: string;
  value: number | false;
  loading: boolean;
}

export default function Card({ label, value, loading }: Props) {
  return (
    <div className="rounded-2xl bg-[#F9F9F9] items-center p-6 flex flex-row justify-between w-full">
      <div className="flex flex-row gap-3 items-center">
        <div
          className="rounded-[10px] p-2 h-11 w-11 flex items-center justify-center"
          style={{
            background:
              label === "Users"
                ? "linear-gradient(82deg, #FFA978 -14.75%, #FF5D00 117.29%)"
                : label === "Free"
                ? "linear-gradient(94deg, #F47075 -9.68%, #ED1C24 120.55%)"
                : "linear-gradient(94deg, #75CF9A -9.68%, #0D9A47 120.55%)",
          }}
        >
          {label === "Users" ? (
            <HiUsers size={24} color="white" style={{ opacity: 0.6 }} />
          ) : label === "Free" ? (
            <HiOutlineXCircle
              size={24}
              color="white"
              style={{ opacity: 0.5 }}
            />
          ) : (
            <MdStars size={24} color="white" style={{ opacity: 0.6 }} />
          )}
        </div>
        <Heading level={"8"}>{label}</Heading>
      </div>
      {loading
        ? <Skeleton className="w-12 h-8" />
        : <Heading level={"7"}>{value}</Heading>
      }
    </div>
  );
}
