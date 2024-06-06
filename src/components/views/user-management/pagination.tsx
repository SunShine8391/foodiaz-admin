import { Button } from "@/components/ui/button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function TablePagination({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex self-end overflow-x-auto overflow-y-hidden w-full sm:w-max mt-4">
      <Button variant={"ghost"} className="py-2 px-3" onClick={onPrev}>
        <HiChevronLeft className="w-4 h-4" />
      </Button>
      <Button variant={"ghost"} className="py-2 px-3" onClick={onNext}>
        <HiChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
