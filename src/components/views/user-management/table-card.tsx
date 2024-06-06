import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "../../elements/headings";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { routes } from "@/config";

interface Props {
  data: {
    id: string;
    userName: string;
    country: string;
    device: string;
    zipCode: string;
  };
}

export default function TableCard({ data }: Props) {
  return (
    <div className="p-5 rounded-[10px] bg-[#F9F9F9]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Heading level={"9"} className="text-start">
              {data.userName}
            </Heading>
          </div>
          <Button
            variant="outline"
            className="border-none bg-[#F9F9F9] rounded-[10px]"
            size="icon"
          >
            <Link href={routes.user.profile(`${data.id}`)}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Separator />
        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-col gap-1 w-full">
            <Heading level={"14"} className="text-[#919191]">
              Country
            </Heading>
            <Heading level={"16"}>{data.country}</Heading>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Heading level={"14"} className="text-[#919191]">
              Device
            </Heading>
            <Heading level={"16"}>{data.device}</Heading>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Heading level={"14"} className="text-[#919191]">
              Zip code
            </Heading>
            <Heading level={"16"}>{data.zipCode}</Heading>
          </div>
        </div>
      </div>
    </div>
  );
}
