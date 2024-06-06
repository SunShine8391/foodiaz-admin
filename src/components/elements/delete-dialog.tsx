import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Text } from "@/components/elements/typography";

import { imagePaths } from "@/config/image-paths";

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className="flex max-w-120 flex-1 flex-col items-center justify-center gap-8 p-12">
        <div className="flex flex-col items-center gap-2">
          <Text level={"smTitle"} className="font-semibold">
            Are you sure want to delete this?
          </Text>
          <Text level={"sm"} className="text-tetiary-foreground md:text-md">
            Double check that you are actually will delete it.
          </Text>
        </div>
        <div className="flex flex-row gap-4">
          <Button
            onClick={onConfirm}
            size={"lg"}
            className="w-33 border-solid border-red-400 bg-red-400 text-background hover:border-red-300 hover:bg-red-300"
          >
            Delete
          </Button>
          <Button
            variant={"outline"}
            onClick={onClose}
            size={"lg"}
            className="w-33 border border-muted-foreground text-muted-foreground"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
