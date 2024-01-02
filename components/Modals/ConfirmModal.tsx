import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { Button } from "../ui/button";

type Props = {};

const ConfirmModal = (props: Props) => {
  const ConfirmModal = useConfirmModal();
  return (
    <Dialog open={ConfirmModal.isOpen} onOpenChange={ConfirmModal.onClose}>
      <DialogContent className="max-w-md p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle>{ConfirmModal.data.title}</DialogTitle>
          <DialogDescription>{ConfirmModal.data.description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-6 space-x-2">
          <Button
            onClick={() => {
              ConfirmModal.onClose();
            }}
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              ConfirmModal.onClose();
              ConfirmModal.action();
            }}
            variant={"primary"}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
