"use client";

import { Dialog, DialogContent } from "./dialog";
import { Text } from "../elements/typography";
import { Button } from "./button";
import { HiTrash } from "react-icons/hi2";
import { useCallback, useState } from "react";

export default function DeletePopup({
  open: isOpen,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<boolean>;
}) {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

  const handleConfirm = useCallback(async () => {
    const result = await onConfirm();

    if (result) {
      onClose();
      setOpenSuccess(true);
    }
  }, [onClose, onConfirm]);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="flex flex-col gap-10 p-10 w-[390px] rounded-lg"
          removeCloseIcon={true}
        >
          <div className="flex flex-col w-full gap-6">
            <Text level={"mdTitle"} className="font-semibold text-center">
              Are you sure you want <br /> to delete the user?
            </Text>
            <Text level={"md"} className="text-center">
              Once a user has been deleted, <br />
              it cannot be restored.
            </Text>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button
              className="w-full h-[52px] text-base font-semibold"
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button
              variant={"link"}
              className="text-black font-semibold text-base"
              size={"lg"}
              onClick={handleConfirm}
            >
              YES, DELETE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <DeleteSuccessPopup
        onClose={() => setOpenSuccess(false)}
        open={openSuccess}
      />
    </>
  );
}

export function DeleteSuccessPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="flex flex-col gap-10 p-10 w-[390px] items-center rounded-lg"
        removeCloseIcon={true}
      >
        <HiTrash className="text-[#AFAFAF] w-[48px] h-[53px]" />
        <Text level={"smTitle"} className="font-semibold">
          You have deleted the user
        </Text>
      </DialogContent>
    </Dialog>
  );
}
