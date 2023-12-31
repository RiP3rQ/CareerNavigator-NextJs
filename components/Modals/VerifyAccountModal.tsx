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
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";

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
  const [invalidError, setInvalidError] = useState(false);

  // state for check if last input field is filled
  const [lastInput, setLastInput] = useState(false);

  // fetch verification token from redux that was created in RegisterModal.tsx
  const { token } = useSelector((state: any) => state.auth);

  // redux mutation for activating account
  const [activation, { error, isSuccess }] = useActivationMutation();

  // user wants to go back to register modal
  const handleGoBack = () => {
    verifyModal.onClose();
    registerModal.onOpen();
  };

  // typed values from user input
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  // references to input fields
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // check if last input field is filled
  useEffect(() => {
    if (verifyNumber[3] !== "") {
      setLastInput(true);
      console.log("LAST!");
    } else {
      console.log("last input is not filled");
      setLastInput(false);
    }
  }, [verifyNumber]);

  // if last input field is filled, call verificationHandler function
  useEffect(() => {
    if (lastInput) {
      console.log("Calling verificationHandler");
      verificationHandler();
    }
  }, [lastInput]);

  const verificationHandler = async () => {
    // join all values from verifyNumber object (etc. 1234)
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    // call redux mutation to activate account
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  // allow users to dynamically move between input fields
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

  // based on redux state do different things
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account verified successfully");
      verifyModal.onClose();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

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
