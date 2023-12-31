"use client";

import { useLoginModal } from "@/hooks/useLoginModal";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useVerifyModal } from "@/hooks/useVerifyModal";
import { useEffect, useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

type Props = {};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const VerifyAccountModal = (props: Props) => {
  const verifyModal = useVerifyModal();
  const registerModal = useRegisterModal();

  const handleGoBack = () => {
    verifyModal.onClose();
    registerModal.onOpen();
  };

  const [invalidError, setInvalidError] = useState(false);

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    // if (verificationNumber.length !== 4) {
    //   setInvalidError(true);
    //   return;
    // }
    if (verificationNumber.length === 4) {
      setInvalidError(true);
      return;
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <Dialog open={verifyModal.isOpen} onOpenChange={verifyModal.onClose}>
      <DialogContent className="max-w-md p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Verify</DialogTitle>
          <DialogDescription>
            Verify your account and continue your journey.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center">
            <VscWorkspaceTrusted size={40} color="#fff" />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="col-span-4 text-center">
              Verify Code:
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {Object.keys(verifyNumber).map((key, index) => (
              <input
                type="number"
                key={key}
                ref={inputRefs[index]}
                className={`w-16 h-16 bg-transparent border-4 rounded-xl flex items-center justify-center text-center text-black dark:text-white  font-Poppins font-[600] text-[30px] ${
                  invalidError
                    ? " border-red-500 animate-pulse"
                    : "dark:border-white border-gray-500"
                }`}
                placeholder=""
                maxLength={1}
                value={verifyNumber[key as keyof VerifyNumber]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
        <Separator />
        <Button type="submit" variant={"primary"} onClick={verificationHandler}>
          Verify
        </Button>
        <Separator />
        <div className="">
          <p className="text-base text-gray-400">
            Want to go back?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleGoBack}
            >
              Register
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyAccountModal;
